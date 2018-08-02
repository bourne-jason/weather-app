const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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

var addr = encodeURIComponent(argv.address)
const url_maps = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;
console.log(addr);
console.log('Map URL :: ', url_maps);

const url_darksky = 'https://api.darksky.net/forecast/8e20d22031acbd2a7f2af5170319d595';

axios.get(url_maps).then((response)=> {
    //console.log(JSON.stringify(response.data, undefined, 2));
    if(response.data.status !== 'OK'){
        throw new Error('No results..');
    }
    console.log(response.data.results[0].formatted_address);
    console.log(response.data.results[0].geometry.location.lat);
    console.log(response.data.results[0].geometry.location.lng);

    var temp_req = `${url_darksky}/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`;

    console.log(temp_req);

    axios.get(temp_req).then((response) => {
        console.log(response.data);
        var summary = response.data.daily.summary;
        var h_temp = response.data.daily.data[0].temperatureHigh;
        var l_temp = response.data.daily.data[0].temperatureLow;
        var humidity = response.data.daily.data[0].humidity;
        var pressure = response.data.daily.data[0].pressure;
        var windSpeed = response.data.daily.data[0].windSpeed;  

        console.log(summary);
        console.log(h_temp);
        console.log(l_temp);
        console.log(humidity);
        console.log(pressure);
        console.log(windSpeed);
    }).catch((e) => {
        console.log(e.message);
    });
}).catch((e) => {
    console.log(e.message);
})