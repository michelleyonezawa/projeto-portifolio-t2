const goalService = require('../services/goalService');

exports.setGoal = (req, res) => {
    try {
        const goal = goalService.setGoal({ ...req.body, userId: req.user.id });
        res.status(201).json(goal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGoal = (req, res) => {
    const { month, year } = req.query;
    const goal = goalService.getGoal(req.user.id, parseInt(month), parseInt(year));
    if (!goal) return res.status(404).json({ error: 'Meta não encontrada' });
    res.json(goal);
};
