const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/reminder", (req, res) => {
  console.log("📩 Reminder received:", req.body);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});