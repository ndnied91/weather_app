const request = require('request');


var getWeather = (lat, lng, callback) => {

  var url = `https://api.darksky.net/forecast/0b19d937643934a78b05a3ce35b744d8/${lat},${lng}`

  request({
    url: url,
    json:true
  }, (error, response, body) => {
      if(!error && response.statusCode ===200){
        callback(undefined, {temperature: body.currently.temperature ,
                              apparentTemperature: body.currently.apparentTemperature});
      } else{
        callback("Unable to fetch weather")
      }
  });


}

module.exports = {
  getWeather
}
