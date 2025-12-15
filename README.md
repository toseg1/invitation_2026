# Event Invitation Bash Design

A tearable poster event invitation with RSVP functionality for BASH 2025. The original project is available at https://www.figma.com/design/y5FtBZL4GQsL8fTEGFhS5a/Event-Invitation-Bash-Design.

## Features

- **Interactive Tearing Effect**: Click through layers to reveal the final invitation
- **RSVP System**: Collect attendee names, emails, and lunch/dinner counts
- **Admin Dashboard**: View all RSVPs and statistics
- **Database**: SQLite database for storing RSVP data

## Running the Application

### Frontend (React + Vite)

```bash
npm install
npm run dev
```

The frontend will be available at http://localhost:3001/

### Backend (Flask API)

In a separate terminal:

```bash
./start-backend.sh
```

Or manually:

```bash
# Create virtual environment (first time only)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors

# Run the server
python3 api.py
```

The API will be available at http://localhost:5001/

## Accessing the Admin Dashboard

Once both servers are running, visit:

http://localhost:5001/admin

Or open the file directly in your browser:

```bash
open public/admin.html
```

The admin dashboard shows:
- Total number of RSVP responses
- Total lunch guests
- Total dinner guests
- Detailed list of all RSVPs with names, emails, and counts

## How It Works

1. **Tear through layers**: Click anywhere on the poster to tear through layers
   - Layer 0 (Top): Code & Triathlon Nerd Layer
   - Layer 1 (Middle): Crypto/Stonks/Meme Layer
   - Layer 2 (Bottom): Event Details with RSVP

2. **Submit RSVP**: Click "CONFIRM TRANSACTION" button and fill out the form
   - Name (required)
   - Email (required)
   - Number of people for lunch
   - Number of people for dinner

3. **View RSVPs**: Access the admin dashboard to see all submissions

## Database Schema

The SQLite database (`rsvp.db`) contains a single table:

```sql
CREATE TABLE rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    lunch_count INTEGER DEFAULT 0,
    dinner_count INTEGER DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

- `POST /api/rsvp` - Submit an RSVP
- `GET /api/rsvp` - Get all RSVPs
- `GET /api/stats` - Get summary statistics
- `GET /` - Serve the main invitation
- `GET /admin` - Serve the admin dashboard

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Python 3
- Flask
- Flask-CORS
- SQLite

## Project Structure

```
Event Invitation Bash Design/
├── api.py                      # Flask backend
├── public/
│   └── admin.html             # Admin dashboard
├── src/
│   ├── App.tsx                # Main app component
│   ├── components/
│   │   ├── TearablePoster.tsx # Tearing effect component
│   │   └── EventDetails.tsx   # Event details + RSVP form
│   └── styles/
├── rsvp.db                    # SQLite database (created automatically)
├── requirements.txt           # Python dependencies
└── start-backend.sh          # Backend startup script
```

## Tips

- Make sure both the frontend and backend are running for the RSVP to work
- The database is created automatically when you first run the backend
- RSVPs are stored locally in `rsvp.db`
- The admin dashboard auto-refreshes every 30 seconds
