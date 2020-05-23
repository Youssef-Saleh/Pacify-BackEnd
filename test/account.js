const jwt = require('jsonwebtoken');
const tokenhandler = require ('../controller/auth');


let mongoose = require("mongoose");
let User = require('../Database Seeds/models/user');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let token;

chai.use(chaiHttp);
let user = {
    email: "mohamed@gmail.com",
    password: "testetsttet",
    nickname: 'user1',
    gender: "Male",
    birthdate: "1990-5-11"            
  };
  jwt.sign({user}, 'secretkey', { expiresIn: '50m' }, (err, tokenuse) => {
    token=tokenuse;
  });
 
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		
          user.save((err, user) => {
              done();
          });
          
         
    });
    afterEach((done) => {
        User.remove({}, (err) => { 
            done();		   
         });
    })      	
    
});

describe('/Get account overview', () => {
	it('it should get user details', (done) => {
		   chai.request(server)
		  .get('/account/overview')
		  .set({Authorization: "Bearer "+token+" "})
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should get user details(no or invalid token)', (done) => {
		chai.request(server)
	   .get('/account/overview')
	   .end((err, res) => {
			 res.should.have.status(403);
			 //res.body.should.be.a('object');
			 //res.body.should.have.property('errors');
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
});

describe('/Get account profile', () => {
	it('it should get user details', (done) => {
		   chai.request(server)
		  .get('/account/profile')
		  .set({Authorization: "Bearer "+token+" "})
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not get user profile (no or invalid token)', (done) => {
		chai.request(server)
	   .get('/account/profile')
	   .end((err, res) => {
			 res.should.have.status(403);
			 //res.body.should.be.a('object');
			 //res.body.should.have.property('errors');
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
});

describe('/PUT account profile', () => {
	it('it should change user details', (done) => {
        let phone= "012584866";
        let country= "EG";
        let password= "1254845152152";
        let email= "osos@gmail.com";
        let gender= "Male";
		   chai.request(server)
		  .put('/account/profile')
          .set({Authorization: "Bearer "+token+" "})
          .send(phone, country, email, gender,password)
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not change user details (invalid token)', (done) => {
        let phone= "012584866";
        let country= "EG";
        let password= "1254845152152";
        let email= "osos@gmail.com";
        let gender= "Male";
		   chai.request(server)
		  .put('/account/profile')
          .send({phone, country, email, gender,password})
		  .end((err, res) => {
				res.should.have.status(403);
			done();
		  });
	});
});