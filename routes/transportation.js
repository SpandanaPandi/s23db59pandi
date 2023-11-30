var express = require('express');
var passport = require('passport');
const transportation_controller= require('../controllers/transportation');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/* GET home page. */
router.get('/',secured,transportation_controller.transportation_view_all_Page);
router.get('/detail', secured,transportation_controller.transportation_view_one_Page);
/* GET create costume page */
router.get('/create',secured, transportation_controller.transportation_create_Page);
/* GET create update page */
router.get('/update', secured, transportation_controller.transportation_update_Page);
/* GET delete costume page */
router.get('/delete',secured, transportation_controller.transportation_delete_Page);
router.post('/login',secured, passport.authenticate('local'), function(req, res) {
    res.redirect('/');
    });
module.exports = router; 