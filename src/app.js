const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const goalRoutes = require('./routes/goalRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/docs', swaggerRoutes);

// Swagger UI
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/swagger.json')));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('API Plantões - Projeto Portfólio');
});

module.exports = app;
