let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Currency',  () => {
    describe('/GET UpdateCurrency', () => {
        it('should update and get the currency rates', (done) => {
            chai.request(server)
            .get('/updatecurrency')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    })
});