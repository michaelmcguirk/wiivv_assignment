const productController = require('../controllers/productController')
const { check, validationResult } = require('express-validator');
const config = require('../config.json')

module.exports = (app) => {

    app.get('/products', [
        check('currency').isIn(Object.keys(config.currencies)).optional(),
        check('limit').isInt().optional(),
        check('offset').isInt().optional()
    ], (req, res) => {

        const errors = validationResult(req);  
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let currency = req.query.currency;
        let limit = (typeof(req.query.limit) == "undefined") ? 10 : req.query.limit;
        let offset = (typeof(req.query.offset) == "undefined") ? 0 : req.query.offset;

        productController.callEtsy(currency, limit, offset).then(data =>{
            if(data instanceof Error){
                res.status(422).json(data.message);
            }else{
                res.status(200).json(data)
            }
                
        });
    });
}