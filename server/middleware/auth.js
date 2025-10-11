const requireAuth = (req, res, next) => {
  req.user = req.user || { id: 'local-user', email: 'user@example.com' };
  next();
};

module.exports = { requireAuth };
