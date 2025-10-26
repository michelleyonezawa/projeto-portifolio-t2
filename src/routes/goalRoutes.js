const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middleware/auth');

router.post('/', auth, goalController.setGoal);
router.get('/', auth, goalController.getGoal);

module.exports = router;
