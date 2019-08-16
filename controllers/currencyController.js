const Axios = require('axios');
const config =  require('../config.json');
const fs = require('fs');

const currencies = config.currencies;

exports.updateCurrenciesFromFxApi = async () => {
    const rates = { 
        timestamp : Date.now(),
        rates : {}
     }
    for(let source in currencies){
        let symbols = currencies[source].join();
        rates.rates[source] = {}
        await callFxApi(source, symbols).then((data) => {
            rates.rates[source] = data;
        }).catch((error) => {
            let errMsg = "Error calling FX API: " + error;
            return new Error(errMsg);
        });
    }
    const json = JSON.stringify(rates);
    fs.writeFileSync('./rates.json', json, 'utf8', (err) => {
        if(err != null){
            let errMsg = "Error writing currency rates to file: " + err
            return new Error(errMsg);
        }
    });
    return json;
}

const callFxApi = async (source, symbols) => {
    const url = `${config.fxApiURL}?base=${source}&symbols=${symbols}`;
    const resp =  await Axios.get(url);
    return resp.data.rates;
}