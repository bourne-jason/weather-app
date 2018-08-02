const request = require('request');

//8e20d22031acbd2a7f2af5170319d595
var getLocationInfo = (address, callback) => {
    request({
        url : address,
        json :true
    }, (error, response, body) => {
        if(error)
            callback('Cant reach google maps..', undefined);
        else if(body.status !== 'OK'){
            callback('Sorry No results found..', undefined);
        }
        else{
            var weather = {
                address : body.results[0].formatted_address,
                latitude : body.results[0].geometry.bounds.northeast.lat,
                longitude : body.results[0].geometry.bounds.northeast.lng       
            };
            callback(undefined, weather);
        }
    });
};

var getWeatherInfo = (address, callback) => {
    request({
        url : address,
        json :true
    }, (error, response, body) => {
        if(error)
            callback('Cant reach google maps..', undefined);
        else{
            var weather = {
                summary : body.daily.summary,
                max_temp : body.daily.data[0].temperatureHigh,
                min_temp : body.daily.data[0].temperatureLow,
                humidity : body.daily.data[0].humidity,
                pressure : body.daily.data[0].pressure,
                windSpeed: body.daily.data[0].windSpeed      
            };
            callback(undefined, weather);
        }
    });
};

module.exports = {
    getLocationInfo,
    getWeatherInfo
};