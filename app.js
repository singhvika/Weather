const request = require('request');
const yargs = require('yargs');
const weatherUtils = require('./geocode/utils');

yargs.
options({
    apikey: {
        describe: 'google geocoding api key',
        demand: false,
        alias: 'k',
        string: true
    },
    address: {
        describe: 'address',
        demand: true,
        alias: 'a',
        string: true
    }
})
.help()
.alias('help','h');

var argv = yargs.argv;
// const address = encodeURIComponent(argv.address);

// let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

// const addressDetails = (error, response, body) =>{
//     if (error){
//         console.log(JSON.stringify(error));
//         return;
//     }
//     if (body.status!=='OK')
//     {
        
//         console.log('no such address found');    
//         return;
//     }
    
//     console.log(`Address: ${body.results[0].formatted_address}`);

    

// }

// if (!argv.apikey){
//     console.log('no api key provided, making request without key');
    
//     request({
//         url: url,
//         json: true
//     }, addressDetails);
// }
// else{
//     console.log('request will be made with the provided api key');
//     url =  `${url}&key=${argv.apikey}`;
    
//     request({
//         url: url,
//         json: true
//     }, addressDetails
// )
// }

let apikey;
if (argv.apikey)
{
    apikey=argv.apikey;
}

let address = argv.address;

weatherUtils.getAddressAndCoords(address, apikey, (error, addrObj) => {
    if (error)
    {
        console.log(error);
        return;
    }
    console.log(`Address: ${addrObj.formatted_address}`);
    console.log(`Longitude: ${addrObj.lng}`);
    console.log(`Latitude: ${addrObj.lat}`);

});