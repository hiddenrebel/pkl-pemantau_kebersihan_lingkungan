/**
 * Temperature.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  	sensor	: { type: 'string' },
		value	: { type: 'string' },
		satuan	: { type: 'string' }
  },
    afterCreate: function(entry, cb) {
        sails.sockets.broadcast('feed', 'temperature', entry);
        cb();
    }
};

