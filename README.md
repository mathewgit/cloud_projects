# MERN Docker Beginner Project

A beginner-friendly tutorial project that shows how to run a simple full-stack MERN application with Docker Compose.

The app includes:

- A React frontend served by Nginx
- A Node.js and Express backend API
- A MongoDB database

Users can enter a name and email address, submit the form, save the data in MongoDB, and see the saved users listed in the browser.

## Project Overview

| Part | Technology | Purpose |
| --- | --- | --- |
| Frontend | React + Vite + Nginx | Displays the user interface |
| Backend | Node.js + Express | Handles API requests |
| Database | MongoDB | Stores user records |

## Simple Architecture

```text
Browser
  -> React frontend container
  -> Node/Express backend container
  -> MongoDB database container
```

In simple words:

```text
Frontend = face of the app
Backend  = brain of the app
Database = memory of the app
Docker   = box that carries each part
Compose  = manager that starts all boxes together
```

## Tools Used

- macOS
- VS Code
- Docker Desktop
- Docker Compose
- Node.js inside Docker
- MongoDB inside Docker
- Nginx inside Docker

## Final Project Structure

```text
06MERN_DOCKER_BEGINNER
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   └── src
│       ├── main.jsx
│       └── styles.css
├── server
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       └── index.js
└── docker-compose.yml
```

## Step-by-Step Tutorial

### 1. Create the Project Folder

```bash
mkdir -p 06MERN_DOCKER_BEGINNER
cd 06MERN_DOCKER_BEGINNER
```

Explanation:

```text
mkdir -p = create the folder if it does not already exist
cd       = move into that folder
```

### 2. Open the Folder in VS Code

```bash
code .
```

If the `code` command is not available, install it from VS Code using:

```text
Command Palette -> Shell Command: Install 'code' command in PATH
```

### 3. Create Frontend and Backend Folders

```bash
mkdir -p client/src server/src
```

Meaning:

```text
client = frontend website
server = backend API
src    = source code folder
```

### 4. Create docker-compose.yml

This file starts three containers:

- `mongodb` for the database
- `server` for the backend API
- `client` for the frontend

Important port mappings:

- `8080:80` opens the frontend at `http://localhost:8080`
- `5001:5000` exposes the backend at `http://localhost:5001`
- `27017:27017` exposes MongoDB

Important note:

```text
The backend runs inside Docker on port 5000.
It is exposed on the host as port 5001 to avoid a local port conflict.
```

### 5. Backend Setup

The backend uses:

- `express` to create the API
- `mongoose` to connect to MongoDB
- `cors` to allow frontend and backend communication

The API provides three endpoints:

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/health` | GET | Checks whether the backend is running |
| `/api/users` | GET | Returns saved users |
| `/api/users` | POST | Saves a new user |

Simple flow:

```text
Frontend sends name and email
        -> Backend receives it
        -> Backend saves it in MongoDB
        -> Backend sends users back to frontend
```

### 6. Backend Dockerfile

The backend Dockerfile does this:

```text
Use Node.js
Install backend packages
Copy backend code
Start the backend server
```

### 7. Frontend Setup

The frontend uses:

- `react` for the UI
- `react-dom` to render the app
- `vite` to build the frontend
- `@vitejs/plugin-react` for React support in Vite

The frontend application:

1. Shows a form with name and email fields.
2. Sends data to `POST /api/users`.
3. Loads saved users from `GET /api/users`.

Simple flow:

```text
User types name and email
        -> User clicks Add user
        -> React sends data to backend
        -> Backend saves it in MongoDB
        -> React displays the saved user
```

### 8. Nginx Configuration

Nginx handles two kinds of traffic:

| Request | Action |
| --- | --- |
| `/` | Serves the React frontend |
| `/api/` | Proxies requests to the backend |

Simple meaning:

```text
Show the website.
If the request starts with /api, send it to the backend.
```

### 9. Frontend Dockerfile

This is a multi-stage Dockerfile:

- Stage 1 builds the React app with Node.js
- Stage 2 serves the built files with Nginx

Simple explanation:

```text
Node builds the website.
Nginx serves the finished frontend.
```

## Running the Project

From the project root:

```bash
docker compose up --build
```

To run it in the background:

```bash
docker compose up -d --build
```

This starts:

- MongoDB
- The Express backend
- The React frontend

## Open the App

- Frontend: `http://localhost:8080`
- Backend health check: `http://localhost:5001/api/health`

Expected backend response:

```json
{"message":"Backend is working"}
```

## Test the App

1. Open `http://localhost:8080`.
2. Enter a name.
3. Enter an email.
4. Click `Add user`.
5. Confirm the saved user appears in the list.

## Stop the App

```bash
docker compose down
```

Important learning:

```text
docker compose up   = switch ON the app
docker compose down = switch OFF the app
```

When the containers stop, the webpage also stops responding. That is expected because the frontend container is no longer running.

## Issue Faced: Port 5000 Already in Use

At first, port `5000` on the host was already being used by another process.

Instead of exposing the backend as `5000:5000`, this project uses:

```yaml
ports:
  - "5001:5000"
```

This means:

```text
Host port:      5001
Container port: 5000
```

The backend still runs on port `5000` inside Docker, but it is accessed from the host on port `5001`.

## Useful Docker Commands

```bash
docker compose up --build
docker compose up -d --build
docker compose down
docker compose ps
docker compose logs
docker compose logs server
docker compose logs client
docker compose logs mongodb
docker compose build --no-cache
docker compose up
```

## What I Learned

- How to build a simple MERN-style full-stack app
- How frontend, backend, and database work together
- How Docker packages each part into containers
- How Docker Compose starts multiple containers together
- How React calls a backend API
- How Express connects to MongoDB
- How Nginx serves a frontend and proxies API requests
- How to troubleshoot a port conflict

## Docker Learning Summary

| Concept | Simple Meaning |
| --- | --- |
| Dockerfile | Recipe for building a container image |
| Image | Blueprint for a container |
| Container | Running copy of an image |
| Docker Compose | Tool to run many containers together |
| Port | Door number used to access an app |
| Volume | Storage that survives container restarts |
| Nginx | Web server used to serve the frontend |
| MongoDB | Database used to save data |

## Upload This Project to GitHub

### 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial MERN Docker beginner project"
```

### 2. Create a GitHub Repository

Suggested repository name:

```text
mern-docker-beginner-project
```

Create an empty repository on GitHub without adding a README, license, or `.gitignore`, because those are already included locally.

### 3. Connect the Remote

Replace the example URL with your own repository URL:

```bash
git remote add origin https://github.com/YOUR-USERNAME/mern-docker-beginner-project.git
git branch -M main
git push -u origin main
```

## Future Improvements

- Add a screenshot of the running app
- Add a delete user button
- Add client-side form validation
- Move configuration into environment variables
- Add GitHub Actions for CI
- Deploy the containers to a cloud platform
- Use a managed database such as MongoDB Atlas

## Final Summary

This project demonstrates how to run a full-stack MERN application with Docker Compose.

It includes:

- React frontend
- Node/Express backend
- MongoDB database
- Nginx web server
- Docker Compose orchestration

The app starts with:

```bash
docker compose up -d --build
```

The app opens at:

```text
http://localhost:8080
```

The app stops with:

```bash
docker compose down
```

Simple memory:

```text
up   = app alive
down = app stopped
```