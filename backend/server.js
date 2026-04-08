const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/triproutes");
const tripDetailsRoutes = require("./routes/tripDetailsRoutes"); // ✅ FIXED


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trip-details", tripDetailsRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});