//env variable is set to test
process.env.NODE_ENV = 'test';

//Require the chai
var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiThings = require('chai-things');

//Require the server and db
var server = require('../server');
var LinechartDb      =require('../app/models/model');

//Defining should
var should = chai.should();
//Defining Chai to use chaiHTTP & chaiThings
chai.use(chaiHttp);
chai.use(chaiThings);

//Starting test block
describe('Linechart API Testing', function() {


          //Before each test,insert the data into the db
          beforeEach(function(done){
                        var newLinechartDb = new LinechartDb({
                                        status :'ok',
                                        name:'USD Market Price',
                                        unit:'usd',
                                        period:'day',
                                        values: [{ x: 10, y: 15},{ x: 1, y: 5},{ x: 2, y: 8}]
                       });
                       newLinechartDb.save(function(err) {
                                done();
                      });
        });


        //After each test,empty the db.
       afterEach(function(done){
                      LinechartDb.collection.drop();
                      done();
       });


       //Test the /GET route
       it('should list ALL Market Price on /linechart GET', function(done) {
                  chai.request(server)
                           .get('/api/linechart')
                           .end(function(err, res){
                                              res.should.have.status(200);
                                              res.should.be.json;
                                              res.body.should.be.a('object');
                                              res.body.should.have.property('_id');
                                              res.body.should.have.property('status');
                                              res.body.should.have.property('name');
                                              res.body.should.have.property('unit');
                                              res.body.should.have.property('period');
                                              res.body.should.have.property('values');
                                              res.body.status.should.equal('ok');
                                              res.body.name.should.equal('USD Market Price');
                                              res.body.unit.should.equal('usd');
                                              res.body.period.should.equal('day');
                                              res.body.values.should.all.have.a.property("x");
                                              res.body.values.should.all.have.a.property("y");
                                              res.body.values.should.contain.an.item.with.property("x", 10);
                                              res.body.values.should.contain.an.item.with.property("y", 15);
                                              res.body.values.should.contain.an.item.with.property("x", 1);
                                              res.body.values.should.contain.an.item.with.property("y", 5);
                                              res.body.values.should.contain.an.item.with.property("x", 2);
                                              res.body.values.should.contain.an.item.with.property("y", 8);
                                              done();
                          });
      });


});
