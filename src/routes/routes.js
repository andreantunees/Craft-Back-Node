const routes = require('express').Router();
const PostCodeController = require('../controllers/PostCodeController');

//PostCode
routes.get('/postcode/:code', PostCodeController.findByCode);
routes.get('/postcode', PostCodeController.getRecentSearch);

//Testing Api
routes.get('/', (req, res) => res.json({ StatusApi: "Online" }));

module.exports = routes;