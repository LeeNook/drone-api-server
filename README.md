# Drone API Server (Assignment #1)

This project is an API server created with Node.js and Express.js for managing drone configurations and logs.

## How to Run

1.  **Clone the repository:**
    `git clone <your-repo-url>`

2.  **Install dependencies:**
    `npm install`

3.  **Create a `.env` file** in the root directory and add the following variables:
    ```
    CONFIG_URL=...
    LOG_URL=...
    LOG_API_TOKEN=...
    ```

4.  **Start the server:**
    `node index.js`

The server will be running on `http://localhost:3000`.
ทดสอบ GET /configs/{droneId} `http://localhost:3000/configs/3001`.
ทดสอบ GET /status/{droneId} `http://localhost:3000/status/3001`.
ทดสอบ GET /logs/{droneId} `http://localhost:3000/logs/3001`.

powershell.exe -ExecutionPolicy Bypass -Command "npm install"
powershell.exe -ExecutionPolicy Bypass -Command "npm start"