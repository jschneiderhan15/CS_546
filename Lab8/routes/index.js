const showRoutes = require('./shows');

const constructorMethod = (app) => {
    app.use('/', showRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    });
};

module.exports = constructorMethod;