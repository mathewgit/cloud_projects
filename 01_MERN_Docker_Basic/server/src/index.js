const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.get("/api/users", async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const user = await User.create({ name, email });
  res.status(201).json(user);
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
