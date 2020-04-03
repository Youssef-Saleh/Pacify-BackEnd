const loginRoutes = require('./login');
const browseRoutes = require('./browse');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });


    loginRoutes(app, fs);
    browseRoutes(app, fs);
    
};

module.exports = appRouter;