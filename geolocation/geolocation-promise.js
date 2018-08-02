const request = require('request');

//8e20d22031acbd2a7f2af5170319d595
var getLocationInfo = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url : address,
            json :true
        }, (error, response, body) => {
            if(error)
                reject('Cant reach google maps..');
            else if(body.status !== 'OK'){
                reject('Sorry No results found..');
            }
            else{
                var weather = {
                    address : body.results[0].formatted_address,
                    latitude : body.results[0].geometry.bounds.northeast.lat,
                    longitude : body.results[0].geometry.bounds.northeast.lng       
                };
                resolve(weather);
            }
        });    
    }); 
};

var getWeatherInfo = (address) => {
    request({
        url : address,
        json :true
    }, (error, response, body) => {
        if(error)
            return new Promise('Cant reach google maps..', undefined);
        else{
            var weather = {
                summary : body.daily.summary,
                max_temp : body.daily.data[0].temperatureHigh,
                min_temp : body.daily.data[0].temperatureLow,
                humidity : body.daily.data[0].humidity,
                pressure : body.daily.data[0].pressure,
                windSpeed: body.daily.data[0].windSpeed      
            };
            return new Promise(undefined, weather);
        }
    });
};

module.exports = {
    getLocationInfo,
    getWeatherInfo
};