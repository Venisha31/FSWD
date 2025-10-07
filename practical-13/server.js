const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as template engine
app.set("view engine", "ejs");

// GET form page
app.get("/", (req, res) => {
  res.render("index", { error: null });
});

// POST form handler
app.post("/calculate", (req, res) => {
  const { income1, income2 } = req.body;

  // Validation
  if (!income1 || !income2 || isNaN(income1) || isNaN(income2)) {
    return res.render("index", { error: "Please enter valid numbers for both incomes." });
  }

  const total = parseFloat(income1) + parseFloat(income2);

  res.render("result", { income1, income2, total });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
