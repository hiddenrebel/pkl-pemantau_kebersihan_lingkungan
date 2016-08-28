/**
 * MonitorController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        var timestamp = Math.round(+new Date()/1000); 
        var time_last = timestamp-(10*60); console.log('timestamp:',time_last);
        Location.find({where: {timestamp: {'<':time_last} }, limit: 5 }).exec(function (err, latestLocations){
            if (err) {
                return res.serverError(err);
            }
            return res.view('monitoring',latestLocations)
        });
    },
    subscribe: function (req, res) {
        if( ! req.isSocket) {
            return res.badRequest();
        }

        sails.sockets.join(req.socket, 'feed');

        return res.ok();
    }
};
