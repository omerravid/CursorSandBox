# Notes App

A full-stack notes application built with Node.js, Vue.js, and MongoDB. Create, view, edit, and delete your notes with a beautiful and modern interface.

## Features

- ✅ Create new notes with title and content
- ✅ View all notes in a responsive grid layout
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Beautiful and modern UI with animations
- ✅ Responsive design for mobile and desktop
- ✅ Real-time date formatting
- ✅ Error handling and loading states

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Font Awesome** - Icons
- **CSS3** - Modern styling with gradients and animations

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) (running locally or MongoDB Atlas)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd notes-app
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (already included):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
```

**Note:** Make sure MongoDB is running on your system. If you're using MongoDB Atlas, replace the connection string with your Atlas URI.

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Ubuntu/Debian
sudo systemctl start mongod

# For Windows, start MongoDB as a service or run:
mongod
```

### 2. Start the Backend Server
In the backend directory:
```bash
cd backend
npm start
# or for development with auto-restart:
npm run dev
```

The backend will start on `http://localhost:3000`

### 3. Start the Frontend Development Server
In a new terminal, navigate to the frontend directory:
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:8080`

### 4. Access the Application
Open your web browser and navigate to `http://localhost:8080`

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a specific note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |
| GET | `/api/health` | Health check |

## Project Structure

```
notes-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # MongoDB note schema
│   ├── routes/
│   │   └── notes.js         # Notes API routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server setup
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── notesService.js  # API service layer
│   │   ├── App.vue          # Main Vue component
│   │   ├── main.js          # Vue app entry point
│   │   └── style.css        # Global styles
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                # This file
```

## Usage

1. **Creating a Note**: Click the "Add New Note" card to open the creation modal
2. **Viewing Notes**: All notes are displayed in a responsive grid layout
3. **Editing a Note**: Click the "Edit" button on any note card
4. **Deleting a Note**: Click the "Delete" button and confirm the action

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot-reload
```

### Building for Production
```bash
cd frontend
npm run build
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify MongoDB is accessible on the specified port

2. **CORS Errors**
   - The backend includes CORS middleware
   - Ensure frontend is running on port 8080 or update the proxy in `vite.config.js`

3. **API Connection Issues**
   - Verify backend is running on port 3000
   - Check the API_BASE_URL in `notesService.js`

4. **Port Already in Use**
   - Change the port in backend `.env` file
   - Change the frontend port in `vite.config.js`

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request