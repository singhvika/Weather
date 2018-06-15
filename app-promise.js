const axios = require('axios');
const yargs = require('yargs');
var weatherUtils = require('./geocode/utils');

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

weatherUtils.getWeatherWithPromise(argv.address, argv.apikey);

