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

let apikey;
if (argv.apikey)
{
    apikey=argv.apikey;
}

let address = argv.address;





weatherUtils.getWeather(address, apikey, (error, weatherObj)=> {
    if (error)
    {

        console.log(error);
    }
    else
    {


        console.log(`Address: ${weatherObj.addrObj.formatted_address}`);
        console.log(`Temperatur: ${weatherObj.temperature}`);
        console.log(`Feels Like: ${weatherObj.feelslike}`);
    }
})