/**
 * DetailsController
 *
 * @description :: Server-side logic for managing details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveDetails: function (req, res) {
		var params = req.params.all()
		console.log('request:',params);
		// Location details
		var loc = params.location
		var time = params.timestamp
		var latitude = loc[0].latitude
		var longitude = loc[1].longitude
		Location.create({timestamp:time,
						latitude:latitude,
						longitude:longitude}).exec(function createCB(err,created){});
		// Sensor details
		var arr = params.sensors
		var len=arr.length;
		for(var i=0; i<len; i++) {
			var sensorInfo = arr[i]
			var msg = sensorInfo.sensor
			console.log('storing ',msg,' levels...');
			switch(sensorInfo.sensor) {
				case "HD":
					Humidity.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
						break;
				case "TR":
					Temperature.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
						break;
				case "CO":
					Colevel.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
					break;
				case "AQ":
					Airquality.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
			}
			console.log(msg,' levels stored');
		}
		return res.json('200',{message:sensorInfo.sensor+' info collected and stored'});
	},

	getLatestLocations: function(req, res) {
		var timestamp = Math.round(+new Date()/1000); console.log('timestamp:',timestamp);
		var time_last = timestamp-(2*60);
		Location.find({ where: { timestamp:{'>=':time_last} }, limit: 5 }); console.log('Location:',Location);
		//for(var i=0; i<len; i++) {
		//	console.log('locations:',len.longitude);
		//	console.log('locations:',len.latitude);
		//}
		return res.json('200',{timestamp});
	}
};

