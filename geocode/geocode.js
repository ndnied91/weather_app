
const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedURL = encodeURIComponent(address);
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyBYcBB8pYc0uaaVpSpjVCyrl_nYtapuWVU`

request({ url: url,
          json:true
 } , (error,response, body )=>{

if(error){
 callback('Unable to connect to google servers' );
}
else if(body.status === "ZERO_RESULTS"){
    callback("Unable to find that address")
}
  else if(body.status ==="OK"){
    callback(undefined , {
      address: body.results[0].formatted_address,
      latitude: body.results[0].geometry.location.lat,
      longitutde: body.results[0].geometry.location.lng
        });
    // console.log(`Address is` , body.results[0].formatted_address);
    // console.log(`Latitude is` , body.results[0].geometry.location.lat);
    // console.log(`Longitutde is` , body.results[0].geometry.location.lng);
  }
   })
 }
module.exports = {
geocodeAddress
};
