const express = require("express");
const path = require("path");
const { detect } = require("detect-port"); // Import detect-port
const cors = require("cors");


const app = express();

// Enable CORS - ensure that your frontend React app and backend Express server can communicate securely and without issues.
app.use(cors());

const DEFAULT_PORT = process.env.PORT || 5001;

let server;


// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// API routes (if needed)
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

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
