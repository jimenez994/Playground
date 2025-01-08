import express from "express";
import path from "path";
import { fileURLToPath } from 'url';  // Import the fileURLToPath function
import { detect } from "detect-port"; // Import detect-port
import cors from "cors";

import taskController from "./controllers/Task.js"

import connectDB from "./config/db.js"
const app = express();
// Middleware to parse request body on api req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to the server
connectDB()

// Enable CORS - ensure that your frontend React app and backend Express server can communicate securely and without issues.
app.use(cors());

const DEFAULT_PORT = process.env.PORT || 5001;

let server;

// Workaround to get __dirname in an ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/tasks/', taskController)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



// Detect available port and start the server
detect(DEFAULT_PORT).then((availablePort) => {
  if (availablePort !== DEFAULT_PORT) {
    console.log(
      `Port ${DEFAULT_PORT} is in use. Switching to available port ${availablePort}.`
    );
  }

  server = app.listen(availablePort, () => {
    console.log(`Server is running on port ${availablePort}`);
  });
}).catch((err) => {
  console.error("Error detecting port:", err);
  process.exit(1); // Exit the process if there's an issue
});


// Handle shutdown signals (e.g., Ctrl+C or process termination)
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  if (server) {
    server.close(() => {
      console.log("Server stopped. Port is now free.");
      process.exit(0);
    });
  }
});
