/**
 * AirqualityController
 *
 * @description :: Server-side logic for managing airqualities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribe: function (req, res) {
        if( ! req.isSocket) {
            return res.badRequest();
        }

        sails.sockets.join(req.socket, 'feed');

        return res.ok();
    }
};

