const Axios = require('axios');
const config =  require('../config.json');
const currencyController = require('./currencyController')
const fs = require('fs');

const currencies = config.currencies;

exports.callEtsy = async (curr, limit, offset) => {
    return callEtsyApi().then(data => {
        const paginatedData = paginate(data, limit, offset);
        if(paginatedData instanceof Error){
            return paginatedData;
        }else{
            const parsedResult = paginatedData.map(item => {
                return {
                    title: item.title,
                    currency: curr in currencies ? curr : item.currency_code,
                    price: convertCurrency(item.currency_code, curr, item.price),
                }   
            });
            return parsedResult
        }        
    })
}

const paginate = (data, limit, offset) => {
    if(limit > data.length || offset > data.length){
        return new Error("Invalid Limit/Offset Value");
    }else{
        return data.slice(offset, limit);
    }
}

const convertCurrency = (base, target, value) => {
    if(base === target || target === "" || !(target in currencies)) return value;
    if(fs.existsSync(config.ratesFile)){
        let rates = readJsonFromFile(config.ratesFile);
        if(Date.now() - rates.timestamp > config.currencyRateRefreshInterval){
            //file exisits, but timestamp older than specified refresh interval.
            currencyController.updateCurrenciesFromFxApi().then(() => {
                rates = readJsonFromFile(config.ratesFile);
            });
        }
        return (value * rates.rates[base][target]).toFixed(2);
    }else{
        //create file and populate with rates.
        currencyController.updateCurrenciesFromFxApi().then(() => {
            rates = readJsonFromFile(config.ratesFile);
        });
        return (value * rates.rates[base][target]).toFixed(2);
    }
}

const readJsonFromFile = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8')); 
}

const callEtsyApi = async (limit, offset) => {
    const resp = await Axios.get(`${config.etsyURL}?api_key=${config.etsyApiKey}`)
    return resp.data.results;
}


