const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "http://localhost:4000", // local dev
  "http://localhost:5173", // local
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // enable if you use cookies or auth headers
  })
);

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.get("/health", (req, res) => res.json({ message: "ok" }));

module.exports = app;
