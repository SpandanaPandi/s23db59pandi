var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('transportation', { title: 'Search results of transportation' });
});
 
module.exports = router;