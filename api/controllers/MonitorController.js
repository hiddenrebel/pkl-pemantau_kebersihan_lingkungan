/**
 * MonitorController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.view('monitoring')
    },
    subscribe: function (req, res) {
        if( ! req.isSocket) {
            return res.badRequest();
        }

        sails.sockets.join(req.socket, 'feed');

        return res.ok();
    }
};
