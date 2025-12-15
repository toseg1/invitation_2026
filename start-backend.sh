#!/bin/bash

echo "Starting BASH 2025 Backend Server..."
echo "Installing Python dependencies..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -q flask flask-cors

# Start the Flask server
echo "Starting Flask API on port 5001..."
python3 api.py
