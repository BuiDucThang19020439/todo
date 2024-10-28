const searchRouter = require('./search');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    //   });
      
    //   app.get('/search', (req, res) => {
    //     console.log(req.query.q);
    //     res.render('search');
    //   });
      
    //   app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('search-post');
    //   });
    app.use('/search', searchRouter);
}

module.exports = route;