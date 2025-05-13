const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Sudoku Server!');
});

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

module.exports = app;
