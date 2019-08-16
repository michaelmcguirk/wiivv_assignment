const currencyController = require('../controllers/currencyController')

module.exports = (app) => {
    app.route('/updateCurrency').get((req,res) => {
        currencyController.updateCurrenciesFromFxApi().then((result) => {
            if(result instanceof Error){
                res.status(422).json(result.message);
            }else{
                res.status(200).json(JSON.parse(result));
            }
        });
    }); 
}
