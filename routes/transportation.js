var express = require('express');
const transportation_controller= require('../controllers/transportation');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('transportation', { title: 'Search results of transportation' });
});
router.get('/detail', transportation_controller.transportation_view_one_Page);
 
module.exports = router;