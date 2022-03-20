const getUser = (req, res) => {
  const user = req.currentUser;
  res.json({ user });
};

module.exports = { getUser };
