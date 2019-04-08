module.exports = function(app) {
    app.post("/api/workorders", function(req, res) {

        //define our array
        var workOrders = req.body['data[]'];
        
        //do our logic to turn the work orders into macro code
        var text = "macro text here"

        //return the instructions to the frontend
        res.send(text)
    })
}