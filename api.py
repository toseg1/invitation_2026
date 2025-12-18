from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import psycopg2
import psycopg2.extras
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Use PostgreSQL connection from environment variable
DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
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
    conn.commit()
    cursor.close()
    conn.close()

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

    cursor.execute('''
        INSERT INTO rsvp (name, email, lunch_count, dinner_count)
        VALUES (?, ?, ?, ?)
    ''', (name, email, lunch_count, dinner_count))

    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': 'RSVP submitted successfully'})

@app.route('/api/rsvp', methods=['GET'])
def get_rsvps():
    conn = get_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
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

@app.route('/api/rsvp/<int:rsvp_id>', methods=['DELETE'])
def delete_rsvp(rsvp_id):
    conn = get_db()
    cursor = conn.cursor()

    # Check if the RSVP exists
    cursor.execute('SELECT * FROM rsvp WHERE id = %s', (rsvp_id,))
    rsvp = cursor.fetchone()

    if not rsvp:
        cursor.close()
        conn.close()
        return jsonify({'success': False, 'message': 'RSVP not found'}), 404

    # Delete the RSVP
    cursor.execute('DELETE FROM rsvp WHERE id = %s', (rsvp_id,))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'success': True, 'message': 'RSVP deleted successfully'})

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
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
