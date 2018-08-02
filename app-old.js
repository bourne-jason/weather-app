const   request = require('request');
const   yargs = require('yargs');
const   geocode = require('./geolocation/geolocation.js')

var argv = yargs
.options({
    address : {
        string: true,
        describe : 'Address from where you want to fetch data...',
        alias : 'a',
        demand : true
    }
})
.help()
.alias('help', 'h')
.argv;

var address = encodeURIComponent(argv.address)
const url_maps = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
console.log('Map URL :: ', url_maps);

const url_darksky = 'https://api.darksky.net/forecast/8e20d22031acbd2a7f2af5170319d595';

geocode.getLocationInfo(url_maps, (error, response) => {
    if(error)
        console.log(error);
    else{
        console.log('Location details of :: ', argv.address);
        console.log(JSON.stringify(response, undefined, 2));
        const url_weather = `${url_darksky}/${response.latitude},${response.longitude}`;

        console.log('Weather URL :: ', url_weather);
        geocode.getWeatherInfo(url_weather, (error, response) => {
            if(error)
                console.log(error);
            else{
                console.log('Weather Today will be...');
                console.log(JSON.stringify(response, undefined, 2));
            }
        });
    }
});