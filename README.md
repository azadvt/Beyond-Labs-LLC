# Task Manager

A simple task manager built with React and Node.js. You can add tasks, see all your tasks, and mark them done.

## Stack

- React.js (frontend)
- Node.js + Express (backend)
- MongoDB with Mongoose (database)

## How to Run

Make sure you have Node.js and MongoDB installed.

### Backend

```bash
cd backend
npm install
npm start
```

Runs on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on http://localhost:3000

### MongoDB

MongoDB should be running locally on port 27017. If you installed it as a Windows service, it starts automatically. Otherwise run `mongod` manually.

## API Routes

- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - create a task (send `{ "title": "your task" }`)
- `PUT /api/tasks/:id` - mark a task as completed

## Project Structure

```
backend/
  server.js        - express server, connects to mongo
  models/Task.js   - task schema (title, status, timestamps)
  routes/tasks.js  - route handlers for CRUD

frontend/
  src/App.js       - main component with all the task logic
  src/App.css      - styling
```

## Notes

- No auth needed
- No external state management or form libraries used
- Used React hooks (useState, useEffect) and controlled inputs
- Tasks are sorted newest first
- Completed tasks hide the "Mark Complete" button
- MongoDB runs on default port 27017
