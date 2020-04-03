const loginRoutes = require('./login');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });


    loginRoutes(app, fs);
    
};

module.exports = appRouter;