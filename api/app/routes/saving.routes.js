module.exports = (app) => {
    
    const savings = require('../controllers/saving.controller');

    // Create a new saving
    app.post('/savings', savings.create);

    // Retrieve all savings
    app.get('/savings', savings.findAll);

    // Retrieve a single saving with userId
    app.get('/savings/:userId', savings.findOne);

    // Update a saving with userId
    app.put('/savings/:userId', savings.update);
}