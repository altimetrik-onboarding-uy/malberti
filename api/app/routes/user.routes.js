module.exports = (app) => {
    
    const user = require('../controllers/user.controller');

    // Retrieve a single saving with userId
    app.get('/users/:user', user.findOne);
}