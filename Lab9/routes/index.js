const primesRoutes = require('./primes');

const constructorMethod = (app) => {
    app.use('/', primesRoutes);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;