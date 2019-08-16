let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Products',  () => {
    describe('/GET Products', () => {
        it('should get the first 10 products', (done) => {
            chai.request(server)
            .get('/products')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.above(0);
                done();
            });
        });
        it('should return an error when offset/limit are invalid', (done) => {
            chai.request(server)
            .get('/products?offset=50')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
        });
    })
});