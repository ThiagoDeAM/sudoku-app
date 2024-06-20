require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = require('./src/app');
const userRoutes = require('./src/routes/userRoutes');
const gameRoutes = require('./src/routes/gameRoutes');

const corsOptions = {
  origin: '*',
  //origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Sudoku Server!');
});

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});