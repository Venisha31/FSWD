const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Path to your log file (change as needed)
const logFilePath = path.join(__dirname, "error.log");

app.get("/", (req, res) => {
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err.message);
      return res
        .status(500)
        .send(`<h1>Error</h1><p>Log file is missing or cannot be read.</p>`);
    }

    // Display logs inside a <pre> tag to preserve formatting
    res.send(`
      <html>
        <head>
          <title>Server Logs</title>
          <style>
            body { font-family: monospace; background: #1e1e1e; color: #dcdcdc; padding: 20px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <h1>Server Error Logs</h1>
          <pre>${data}</pre>
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
