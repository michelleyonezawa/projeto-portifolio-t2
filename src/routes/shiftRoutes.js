const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const auth = require('../middleware/auth');

router.post('/', auth, shiftController.addShift);
router.get('/', auth, shiftController.getShifts);
router.get('/sum', auth, shiftController.getSumByPeriod);
router.get('/goal-progress', auth, shiftController.getGoalProgress);

module.exports = router;
