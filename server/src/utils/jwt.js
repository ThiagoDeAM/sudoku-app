const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync("keys/private.key", "utf8");
const publicKey = fs.readFileSync("keys/public.key", "utf8");

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return decoded;
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};