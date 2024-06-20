const express = require('express');
const router = express.Router();
const { completeGame, getRanking, getUserGames } = require('../controllers/gameController');
const authenticate = require('../middleware/authMiddleware');

router.post('/complete', authenticate, completeGame);
router.get('/ranking', getRanking);
router.get('/user-games', authenticate, getUserGames);

module.exports = router;