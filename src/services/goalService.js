const goals = require('../models/Goal');

function setGoal({ userId, value, month, year }) {
    const goal = { id: goals.length + 1, userId, value, month, year };
    goals.push(goal);
    return goal;
}

function getGoal(userId, month, year) {
    return goals.find(g => g.userId === userId && g.month === month && g.year === year);
}

function getGoalProgress(userId, month, year, sum) {
    const goal = getGoal(userId, month, year);
    if (!goal) return null;
    return { goal: goal.value, received: sum, remaining: Math.max(goal.value - sum, 0) };
}

module.exports = { setGoal, getGoal, getGoalProgress };
