from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DATABASE = 'rsvp.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS rsvp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            lunch_count INTEGER DEFAULT 0,
            dinner_count INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/api/rsvp', methods=['POST'])
def submit_rsvp():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO rsvp (name, email, lunch_count, dinner_count)
        VALUES (?, ?, ?, ?)
    ''', (
        data.get('name', 'Anonymous'),
        data.get('email', ''),
        data.get('lunch_count', 0),
        data.get('dinner_count', 0)
    ))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'RSVP submitted successfully'})

@app.route('/api/rsvp', methods=['GET'])
def get_rsvps():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM rsvp ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    
    rsvps = []
    for row in rows:
        rsvps.append({
            'id': row['id'],
            'name': row['name'],
            'email': row['email'],
            'lunch_count': row['lunch_count'],
            'dinner_count': row['dinner_count'],
            'timestamp': row['timestamp']
        })
    
    return jsonify(rsvps)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(lunch_count) as total_lunch, SUM(dinner_count) as total_dinner, COUNT(*) as total_responses FROM rsvp')
    row = cursor.fetchone()
    conn.close()

    return jsonify({
        'total_lunch': row['total_lunch'] or 0,
        'total_dinner': row['total_dinner'] or 0,
        'total_responses': row['total_responses'] or 0
    })

@app.route('/')
def index():
    return send_file('public/admin.html')

@app.route('/admin')
def admin():
    return send_file('public/admin.html')

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5002, debug=True)
