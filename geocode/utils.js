const request =  require('request');
const axios = require('axios');



var getAddressAndCoords = (address, apikey, callback) =>{
    let encodedAddress = encodeURIComponent(address);
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    if (!apikey)
    {
        console.log('request will be made without apikey. Not guaranteed to work');
        request({
            url: url,
            json: true
        }, (error, response, body) => {

            if (error){
                callback(JSON.stringify(error), undefined)
                return;
            }
            if (body.status!=='OK')
            {
                callback('no such addressfonud', undefined); 
                return;
            }
            callback(undefined, {
                formatted_address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
            })
            

        } );

    }
    else{
        console.log('request will be made with the provided api key');
        url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apikey}`;
        request({
            url: url,
            json: true
        }, (error, response, body) => {

            if (error){
                callback(JSON.stringify(error), undefined)
                return;
            }
            if (body.status!=='OK')
            {
                callback('no such addressfonud', undefined); 
                return;
            }
            callback(undefined, {
                formatted_address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
            })
            

        } );
    }

    


}


const getWeather = (address, apikey, weatherCallback) => {


getAddressAndCoords(address, apikey, (error, addressObj) => {
    if(error)
    {
        weatherCallback(error);
    }
    else{

        request({
            url: `https://api.darksky.net/forecast/6057f5be41d3ec636e0dd7472761a85e/${addressObj.lat},${addressObj.lng}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode===200)
            {
                weatherCallback(undefined, {
                    addrObj : {
                        formatted_address: addressObj.formatted_address,
                        lng: addressObj.lng,
                        lat: addressObj.lat
                    },
                    temperature: body.currently.temperature,
                    feelslike: body.currently.apparentTemperature
                })    
            }
            else
            {
                weatherCallback(JSON.stringify(error, undefined, 1));
            }
        })

        
    }

})
}



const getWeatherWithPromise = (address, apikey) => {

    
    const encodedAddress = encodeURIComponent(address);
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

if (apikey){
    console.log(`request will be made with the provided google api key`);
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apikey}`;
    
}
else{
    console.log(`request will be made without google api-key. not guaranteed to work`);
}

axios.get(url)
    .then((response)=> {

    if (response.data.status === 'OK')
    {   console.log(`Address: ${response.data.results[0].geometry.location.lat}`);
         let lat= response.data.results[0].geometry.location.lat;
         let lng= response.data.results[0].geometry.location.lat;
         return axios.get(`https://api.darksky.net/forecast/6057f5be41d3ec636e0dd7472761a85e/${lat},${lng}`);
        
    }
    else
    {
        throw new Error(`Cannot connect to Google API for address information`)
    }
    
})
.then(
    (forecast)=> {
    console.log(`Temperature: ${forecast.data.currently.temperature}`);
    console.log(`Feels Like: ${forecast.data.currently.apparentTemperature}`);
},
    (error) => {
        throw new Error(error);
    })
.catch((err) => {
    console.log(`ERROR: ${err}`);
})
}
    



module.exports = {
    getAddressAndCoords,
    getWeather,
    getWeatherWithPromise
}