const shifts = require('../models/Shift');

function addShift({ userId, date, value, location, startTime, endTime }) {
    const shift = {
        id: shifts.length + 1,
        userId,
        date,
        value,
        location,
        startTime,
        endTime
    };
    shifts.push(shift);
    return shift;
}

function getShiftsByUser(userId) {
    return shifts.filter(s => s.userId === userId);
}

function getSumByPeriod(userId, period, year) {
    const now = new Date();
    let months = [];
    if (period === 'monthly') months = [now.getMonth() + 1];
    if (period === 'quarterly') months = [1,2,3,4,5,6,7,8,9,10,11,12].filter(m => Math.ceil(m/3) === Math.ceil((now.getMonth()+1)/3));
    if (period === 'semiannual') months = [1,2,3,4,5,6,7,8,9,10,11,12].filter(m => Math.ceil(m/6) === Math.ceil((now.getMonth()+1)/6));
    if (period === 'annual') months = [1,2,3,4,5,6,7,8,9,10,11,12];
    return shifts.filter(s => s.userId === userId && months.includes(new Date(s.date).getMonth() + 1) && new Date(s.date).getFullYear() === year)
        .reduce((acc, s) => acc + s.value, 0);
}

module.exports = { addShift, getShiftsByUser, getSumByPeriod };
