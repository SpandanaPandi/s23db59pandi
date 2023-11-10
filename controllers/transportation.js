var Transportation = require('../models/transportation');
// List of all Transportations

exports.transportation_list = async function (req, res) {
    try {
        theTransportations = await Transportation.find();
        res.send(theTransportations);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.transportation_view_all_Page = async function (req, res) {
    try {
        theTransportations = await Transportation.find();
        res.render('transportation', { title: 'Transportation Search Results', results: theTransportations });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Costume.
exports.transportation_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Transportation detail: ' + req.params.id);
};
// Handle Costume create on POST.
//Handle Costume create on POST.
exports.transportation_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Transportation();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.TransportationType = req.body.TransportationType;
    
    document.Destination = req.body.Destination;
    document.Price = req.body.Price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Costume delete form on DELETE.
exports.transportation_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Transportation delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.transportation_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Transportation update PUT' + req.params.id);
};