const getRoot = (req, res) => {
  res.json({ success: true, data: { message: 'hello world' }, error: null });
};

const getHealth = (req, res) => {
  res.json({ success: true, data: { message: 'ok' }, error: null });
};

module.exports = {
  getRoot,
  getHealth,
};
