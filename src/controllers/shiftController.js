const shiftService = require('../services/shiftService');
const goalService = require('../services/goalService');

exports.addShift = (req, res) => {
    try {
        const shift = shiftService.addShift({ ...req.body, userId: req.user.id });
        res.status(201).json(shift);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getShifts = (req, res) => {
    const shifts = shiftService.getShiftsByUser(req.user.id);
    res.json(shifts);
};

exports.getSumByPeriod = (req, res) => {
    const { period, year } = req.query;
    const sum = shiftService.getSumByPeriod(req.user.id, period, parseInt(year));
    res.json({ sum });
};

exports.getGoalProgress = (req, res) => {
    const { month, year } = req.query;
    const sum = shiftService.getSumByPeriod(req.user.id, 'monthly', parseInt(year));
    const progress = goalService.getGoalProgress(req.user.id, parseInt(month), parseInt(year), sum);
    if (!progress) return res.status(404).json({ error: 'Meta não encontrada' });
    res.json(progress);
};
