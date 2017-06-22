var Keep = require('../models/keep').Keep;
exports.post = function (req, res) {
    //console.log(req.body);
    var k =0;
    for(var i in req.body) {
        if (!k){
            var numId = i;
            Keep.findById(numId, function (err, keep) {
                if (err) return next(err);
                // console.log(keep);
                keep.visible = 0;
                keep.save(function (err) {
                    if (err) return next(err);
                    // .. 200 OK ghивязка посетителя к текущей сессии
                })
            });
            console.log(res);

        }
        k++;
    }
    res.send({});
};