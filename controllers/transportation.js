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
exports.transportation_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
       result = await Transportation.findById( req.params.id)
       res.send(result)
       } catch (error) {
       res.status(500)
       res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
exports.transportation_delete = async function (req, res) {
    // Handle Costume delete on DELETE.
    //exports.costume_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Transportation.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
    //res.send('NOT IMPLEMENTED: Transportation delete DELETE ' + req.params.id);

// Handle Costume update form on PUT.
exports.transportation_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
  try {
    let toUpdate = await Transportation.findById( req.params.id)
 // Do updates of properties
    if(req.body.TransportationType)
           toUpdate.TransportationType = req.body.TransportationType;
    if(req.body.Destination) toUpdate.Destination = req.body.Destination;
    if(req.body.Price) toUpdate.Price = req.body.Price;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } 
    catch (err) {
       res.status(500)
       res.send(`{"error": ${err}: Update for id ${req.params.id}
       failed`);
    }

};
exports.transportation_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Transportation.findById( req.query.id)
    res.render('transportationdetail',
    { title: 'Transportation Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };