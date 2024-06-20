const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password
    });
    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: "Email or username already exists" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};