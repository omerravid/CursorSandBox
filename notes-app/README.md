# 📝 Notes App

A full-stack note-taking application built with Node.js, Vue.js, and MongoDB. Create, view, edit, and delete your notes with a beautiful and responsive interface.

## ✨ Features

- **Create Notes**: Add new notes with title and content
- **View Notes**: Read your notes in a clean, organized layout
- **Edit Notes**: Update existing notes easily
- **Delete Notes**: Remove notes you no longer need
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Changes are reflected immediately
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **Modern CSS** - Custom styling with gradients and animations

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone or Extract the Project

If you have this as a folder, navigate to it:
```bash
cd notes-app
```

### 2. Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists) and configure your MongoDB connection
# The .env file should contain:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/notes-app

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:3000`

### 3. Set Up the Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory (from the root notes-app folder)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:8080`

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**For local MongoDB:**
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

**For MongoDB Atlas:**
Update the `MONGODB_URI` in `backend/.env` with your Atlas connection string.

## 🎯 Usage

1. **Access the Application**: Open your browser and go to `http://localhost:8080`

2. **Create a Note**: Click the "+ New Note" button to create your first note

3. **View Notes**: Click on any note card to view its full content

4. **Edit Notes**: Click the edit (✏️) icon on a note card or use the edit button in the note viewer

5. **Delete Notes**: Click the delete (🗑️) icon on a note card and confirm the deletion

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # MongoDB note schema
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js           # Express server and API routes
├── frontend/
│   ├── src/
│   │   ├── components/     # Vue components (if any)
│   │   ├── App.vue         # Main Vue component
│   │   ├── main.js         # Vue application entry point
│   │   └── style.css       # Application styles
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/health` - Health check endpoint

## 🎨 Customization

### Backend Configuration

You can modify the following in `backend/.env`:
- `PORT` - Change the backend port (default: 3000)
- `MONGODB_URI` - Update MongoDB connection string

### Frontend Configuration

You can modify `frontend/vite.config.js` to:
- Change the development port (default: 8080)
- Update proxy settings
- Add additional build configurations

### Styling

The application uses custom CSS with:
- CSS Grid for responsive layouts
- CSS Flexbox for component alignment
- CSS Gradients for beautiful backgrounds
- CSS Transitions for smooth animations

Modify `frontend/src/style.css` to customize the appearance.

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Make sure MongoDB is running
   - Check if port 3000 is available
   - Verify all dependencies are installed with `npm install`

2. **Frontend won't start**:
   - Check if port 8080 is available
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and run `npm install` again

3. **Can't connect to database**:
   - Verify MongoDB is running
   - Check the `MONGODB_URI` in your `.env` file
   - For MongoDB Atlas, ensure your IP is whitelisted

4. **API calls fail**:
   - Make sure the backend is running on port 3000
   - Check the Vite proxy configuration in `vite.config.js`
   - Verify CORS is properly configured

### Development Tips

- Use `npm run dev` in both backend and frontend for hot reloading
- Check browser console for frontend errors
- Check terminal console for backend errors
- Use MongoDB Compass to inspect your database

## 📦 Production Deployment

### Backend Deployment

1. Set environment variables on your server
2. Use `npm start` instead of `npm run dev`
3. Consider using PM2 for process management

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Serve the `dist` folder with a web server
3. Update API endpoints to point to your production backend

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or have questions, please check the troubleshooting section above or create an issue in the project repository.