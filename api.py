from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
import threading

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

# Use PostgreSQL in production, SQLite locally
DATABASE_URL = os.environ.get('DATABASE_URL')
USE_POSTGRES = DATABASE_URL is not None

if USE_POSTGRES:
    import psycopg
    from psycopg.rows import dict_row
else:
    import sqlite3

def get_db():
    if USE_POSTGRES:
        conn = psycopg.connect(DATABASE_URL)
    else:
        conn = sqlite3.connect('rsvp.db')
        conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    if USE_POSTGRES:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS rsvp (
                id SERIAL PRIMARY KEY,
                name TEXT,
                email TEXT,
                lunch_count INTEGER DEFAULT 0,
                dinner_count INTEGER DEFAULT 0,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
    else:
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS rsvp (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                lunch_count INTEGER DEFAULT 0,
                dinner_count INTEGER DEFAULT 0,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

    conn.commit()
    cursor.close()
    conn.close()

def send_confirmation_email(name, email, lunch_count, dinner_count):
    """Send confirmation email to the RSVP submitter"""

    # Email configuration from environment variables
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    sender_email = os.environ.get('SENDER_EMAIL')
    sender_password = os.environ.get('SENDER_PASSWORD')

    # Skip if email credentials are not configured
    if not sender_email or not sender_password:
        return False

    # Skip if recipient email is empty
    if not email:
        return False

    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = "Confirmation - Je Quitte La France - 4 Juillet 2026"
        message["From"] = sender_email
        message["To"] = email
        message["Date"] = formatdate(localtime=True)

        # Create email body
        lunch_text = f"{lunch_count} personne{'s' if lunch_count > 1 else ''}" if lunch_count > 0 else "aucune personne"
        dinner_text = f"{dinner_count} personne{'s' if dinner_count > 1 else ''}" if dinner_count > 0 else "aucune personne"

        text_content = f"""
Bonjour {name},

Merci d'avoir répondu à mon invitation.

Je te confirme que j'ai bien noté ta présence avec:
- {lunch_text} le midi; et
- {dinner_text} le soir.

Date: 4 juillet 2026
Lieu: 10 rue d'Echevanne, 70100 Velesmes

Possibilité de loger en tente/gîte selon disponibilité.

Pour toutes questions, n'hésite pas à me contacter au 0770706027 ou directement en répondant à cet email.

Hâte de te voir, je te tiens au courant!

Théo
        """

        html_content = f"""
<html>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #00ff00;">Bonjour {name},</h2>

        <p>Merci d'avoir répondu à mon invitation.</p>

        <p>Je te confirme que j'ai bien noté ta présence avec:</p>
        <ul>
            <li><strong>{lunch_text}</strong> le midi; et</li>
            <li><strong>{dinner_text}</strong> le soir.</li>
        </ul>

        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #00ff00; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> 4 juillet 2026</p>
            <p style="margin: 5px 0;"><strong>Lieu:</strong> 10 rue d'Echevanne, 70100 Velesmes</p>
        </div>

        <p>Possibilité de loger en tente/gîte selon disponibilité.</p>

        <p>Pour toutes questions, n'hésite pas à me contacter au <strong>0770706027</strong> ou directement en répondant à cet email.</p>

        <p>Hâte de te voir, je te tiens au courant!</p>

        <p style="margin-top: 30px;">Théo</p>
    </div>
</body>
</html>
        """

        # Attach both text and HTML versions
        part1 = MIMEText(text_content, "plain")
        part2 = MIMEText(html_content, "html")
        message.attach(part1)
        message.attach(part2)

        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())

        return True

    except Exception as e:
        # Log email failures for debugging
        print(f"Failed to send email: {e}", flush=True)
        return False

@app.route('/api/rsvp', methods=['POST'])
def submit_rsvp():
    data = request.json

    # Validate input
    if not data:
        return jsonify({'success': False, 'message': 'No data provided'}), 400

    name = data.get('name', 'Anonymous').strip()
    email = data.get('email', '').strip()

    # Validate lunch and dinner counts
    try:
        lunch_count = int(data.get('lunch_count', 0))
        dinner_count = int(data.get('dinner_count', 0))

        if lunch_count < 0 or dinner_count < 0:
            return jsonify({'success': False, 'message': 'Counts cannot be negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'success': False, 'message': 'Invalid count values'}), 400

    conn = get_db()
    cursor = conn.cursor()

    if USE_POSTGRES:
        cursor.execute('''
            INSERT INTO rsvp (name, email, lunch_count, dinner_count)
            VALUES (%s, %s, %s, %s)
        ''', (name, email, lunch_count, dinner_count))
    else:
        cursor.execute('''
            INSERT INTO rsvp (name, email, lunch_count, dinner_count)
            VALUES (?, ?, ?, ?)
        ''', (name, email, lunch_count, dinner_count))

    conn.commit()
    conn.close()

    # Send confirmation email in background thread to avoid blocking the response
    threading.Thread(
        target=send_confirmation_email,
        args=(name, email, lunch_count, dinner_count),
        daemon=True
    ).start()

    return jsonify({'success': True, 'message': 'RSVP submitted successfully'})

@app.route('/api/rsvp', methods=['GET'])
def get_rsvps():
    conn = get_db()

    if USE_POSTGRES:
        cursor = conn.cursor(row_factory=dict_row)
    else:
        cursor = conn.cursor()

    cursor.execute('SELECT * FROM rsvp ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    rsvps = []
    for row in rows:
        rsvps.append({
            'id': row['id'],
            'name': row['name'],
            'email': row['email'],
            'lunch_count': row['lunch_count'],
            'dinner_count': row['dinner_count'],
            'timestamp': str(row['timestamp'])
        })

    return jsonify(rsvps)

@app.route('/api/rsvp/<int:rsvp_id>', methods=['PUT'])
def update_rsvp(rsvp_id):
    data = request.json

    # Validate input
    if not data:
        return jsonify({'success': False, 'message': 'No data provided'}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()

    # Validate lunch and dinner counts
    try:
        lunch_count = int(data.get('lunch_count', 0))
        dinner_count = int(data.get('dinner_count', 0))

        if lunch_count < 0 or dinner_count < 0:
            return jsonify({'success': False, 'message': 'Counts cannot be negative'}), 400
    except (ValueError, TypeError):
        return jsonify({'success': False, 'message': 'Invalid count values'}), 400

    conn = get_db()
    cursor = conn.cursor()

    placeholder = '%s' if USE_POSTGRES else '?'

    # Check if the RSVP exists
    cursor.execute(f'SELECT * FROM rsvp WHERE id = {placeholder}', (rsvp_id,))
    rsvp = cursor.fetchone()

    if not rsvp:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': 'RSVP not found'}), 404

    # Update the RSVP
    if USE_POSTGRES:
        cursor.execute('''
            UPDATE rsvp
            SET name = %s, email = %s, lunch_count = %s, dinner_count = %s
            WHERE id = %s
        ''', (name, email, lunch_count, dinner_count, rsvp_id))
    else:
        cursor.execute('''
            UPDATE rsvp
            SET name = ?, email = ?, lunch_count = ?, dinner_count = ?
            WHERE id = ?
        ''', (name, email, lunch_count, dinner_count, rsvp_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'success': True, 'message': 'RSVP updated successfully'})

@app.route('/api/rsvp/<int:rsvp_id>', methods=['DELETE'])
def delete_rsvp(rsvp_id):
    conn = get_db()
    cursor = conn.cursor()

    placeholder = '%s' if USE_POSTGRES else '?'

    # Check if the RSVP exists
    cursor.execute(f'SELECT * FROM rsvp WHERE id = {placeholder}', (rsvp_id,))
    rsvp = cursor.fetchone()

    if not rsvp:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': 'RSVP not found'}), 404

    # Delete the RSVP
    cursor.execute(f'DELETE FROM rsvp WHERE id = {placeholder}', (rsvp_id,))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'success': True, 'message': 'RSVP deleted successfully'})

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()

    if USE_POSTGRES:
        cursor = conn.cursor(row_factory=dict_row)
    else:
        cursor = conn.cursor()

    cursor.execute('SELECT SUM(lunch_count) as total_lunch, SUM(dinner_count) as total_dinner, COUNT(*) as total_responses FROM rsvp')
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    return jsonify({
        'total_lunch': int(row['total_lunch']) if row['total_lunch'] else 0,
        'total_dinner': int(row['total_dinner']) if row['total_dinner'] else 0,
        'total_responses': int(row['total_responses']) if row['total_responses'] else 0
    })

@app.route('/')
def index():
    return send_file('public/admin.html')

@app.route('/admin')
def admin():
    return send_file('public/admin.html')

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5002))
    app.run(host='0.0.0.0', port=port, debug=True)

# Initialize DB on startup (for production)
init_db()
