var express = require('express');
const transportation_controller= require('../controllers/transportation');
var router = express.Router();
 
/* GET home page. */
router.get('/',transportation_controller.transportation_view_all_Page);
router.get('/detail', transportation_controller.transportation_view_one_Page);
/* GET create costume page */
router.get('/create', transportation_controller.transportation_create_Page);
/* GET create update page */
router.get('/update', transportation_controller.transportation_update_Page);
/* GET delete costume page */
router.get('/delete', transportation_controller.transportation_delete_Page);

module.exports = router;