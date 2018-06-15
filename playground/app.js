const request = require ('request');

var promiseWrapper = () => {

    return new Promise((resolve, reject) => {

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=02115&key=AIzaSyD9AHuMaNFxhMnHR3V76WOW186Wsr7Wo9c`,
            json: true
        }, (error, response, body)=>{
            if (error)
            {
                reject(error);
            }
            resolve(body);
        });
    }
    ).then((res) => {
        console.log(`SUCCESS: ${JSON.stringify(res, undefined, 1)}`);
    })
    .catch((err) => {
        console.log(`ERROR: ${JSON.stringify(err, undefined, 1)}`);
    })
}

promiseWrapper();