const { Game, User } = require('../models');

exports.completeGame = async (req, res) => {
    const { completionTime } = req.body;
    const userId = req.user.id;
    try {
        const game = await Game.create({
            userId,
            completionTime
        });
        res.status(201).json({ message: 'Game completed successfully', game });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRanking = async (req, res) => {
    try {
        const ranking = await Game.findAll({
            include: [{ model: User, as: 'user' }],
            order: [['completionTime', 'ASC']],
            limit: 10
        });
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserGames = async (req, res) => {
    const userId = req.user.id;
    try {
        const games = await Game.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
