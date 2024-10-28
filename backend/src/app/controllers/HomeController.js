class HomeController {
    //[GET]
    index(req,res) {
        res.render('search');
    }

    //[SHOW]
    show(req, res) {
        res.send('xin chao');
    }
}

module.exports = new HomeController;