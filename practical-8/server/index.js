const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const filePath = "data.json";

// Load count
const getCount = () => {
  if (!fs.existsSync(filePath)) return 0;
  const data = fs.readFileSync(filePath);
  return JSON.parse(data).count || 0;
};

// Save count
const saveCount = (count) => {
  fs.writeFileSync(filePath, JSON.stringify({ count }));
};

app.get("/count", (req, res) => {
  res.json({ count: getCount() });
});

app.post("/count", (req, res) => {
  const { count } = req.body;
  saveCount(count);
  res.json({ status: "updated", count });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
