const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a: { demand:true, alias: 'address', describe:'Address to fetch weather for' , string: 'true'}
})
.help()
.alias('help' , 'h')
.argv;

var encodedURL = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyBYcBB8pYc0uaaVpSpjVCyrl_nYtapuWVU`

axios.get(geocodeURL).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address')
  }

var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;

console.log(response.data.results[0].formatted_address);
var weatherURL = `https://api.darksky.net/forecast/0b19d937643934a78b05a3ce35b744d8/${lat},${lng}`
return axios.get(weatherURL)

}).then((response)=>{
    var temp = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Its currently `, temp , `outside. It feels like `, apparentTemperature)

}).catch((e)=>{
  if(e.code === 'ENOTFOUND'){
    console.log("Unable to connect to API servers")
  } else{
    console.log(e.message);
  }
})
