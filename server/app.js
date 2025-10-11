const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

app.use('/', healthRoutes);
app.use('/', profileRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, data: null, error: err.message });
});

module.exports = app;
