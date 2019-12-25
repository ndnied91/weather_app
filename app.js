const yargs = require('yargs');

const geocode = require("./geocode/geocode.js")

const weather = require("./weather/weather.js");

const argv = yargs
.options({
  a: { demand:true, alias: 'address', describe:'Address to fetch weather for' , string: 'true'}
})
.help()
.alias('help' , 'h')
.argv;

geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage)
  } else{
    var lat = results.latitude
    var lng = results.longitutde

    weather.getWeather(lat, lng , (errorMessage, weatherResults)=> {
     if(errorMessage){
       console.log(errorMessage)
     } else {
      console.log(`Its currently ${weatherResults.temperature} in ${results.address}, it feels like ${weatherResults.apparentTemperature}`)
     }
    });

  }
});
