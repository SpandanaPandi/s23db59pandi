var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var transportation_controller = require('../controllers/transportation');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/transportation', transportation_controller.transportation_create_post);
// DELETE request to delete Costume.
router.delete('/transportation/:id', transportation_controller.transportation_delete);
// PUT request to update Costume.
router.put('/transportation/:id', transportation_controller.transportation_update_put);
// GET request for one Costume.
router.get('/transportation/:id', transportation_controller.transportation_detail);
// GET request for list of all Costume items.
router.get('/transportation', transportation_controller.transportation_list);
module.exports = router;