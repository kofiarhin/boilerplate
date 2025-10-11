const getProfile = (req, res) => {
  res.json({ success: true, data: { user: req.user }, error: null });
};

module.exports = {
  getProfile,
};
