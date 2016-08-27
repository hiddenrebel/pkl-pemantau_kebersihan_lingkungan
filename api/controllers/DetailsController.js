/**
 * DetailsController
 *
 * @description :: Server-side logic for managing details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveDetails: function (req, res) {
		var params = req.params.all()
		
		// Location details
		var loc = params.location
		Location.create({time:loc.time,
						latitude:loc.latitude,
						longitude:loc.longitude,
						speed:loc.speed}).exec(function createCB(err,created){});
		// Sensor details
		var arr = params.sensor
		var len=arr.length;
		for(var i=0; i<len; i++) {
			var sensorInfo = arr[i]
			switch(sensorInfo.sensor) {
				case "humidity":
					Humidity.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
						break;
				case "temperature":
					Temperature.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
						break;
				case "Colevel":
					Colevel.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
					break;
				case "airquality":
					Airquality.create({
						sensor:sensorInfo.sensor,
						value:sensorInfo.value,
						satuan:sensorInfo.satuan}).exec(function createCB(err,created){});
			}
		}
		return res.json('200',{message:sensorInfo.sensor+' info collected and stored '});
	}
};

