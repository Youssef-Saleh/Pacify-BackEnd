//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const tokenhandler = require ('../controller/auth');
let mongoose = require("mongoose");
let User = require('../Database Seeds/models/user');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
//var assert = require('assert');
//const signupController = require('../controller/signup')

chai.use(chaiHttp);
let token, tokenEmail;

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
  jwt.sign({user: user}, 'EmailSecret', { expiresIn: '50m' }, (err, token) => {
    tokenEmail=token;   
  });
//Our parent block
describe('Users', () => {
	/*beforeEach((done) => { //Before each test we empty the database
		
		user.save((err, user) => {
			done();
		});
  });*/
	afterEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  
  * Test the /POST route
  */
  describe('/POST signup', () => {
	  it('it should not post a user without an email field', (done) => {
	  	let user = {
			//email: req.body.email,
            password: "testetsttet",
            nickname: 'user1',
            gender: "Male",
            birthdate: "1990-5-11"            
	  	}
			chai.request(server)
		    .post('/signup')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(400);
		      done();
		    });
	  });
	  
	  it('it should POST a user ', (done) => {
		let user = {
			email: "mohamed@gmail.com",
            password: "testetsttet",
            nickname: 'user1',
            gender: "Male",
            birthdate: "1990-5-11"            
	  	}
			chai.request(server)
		    .post('/signup')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(201);
		      done();
		    });
	  });
  });

  describe('/Get confirmationemail', () => {
	it('it should confirm an existing email', (done) => {
		   token= tokenEmail;
		   chai.request(server)
		  .get('/emailconfirmation')
		  .set({Authorization: "Bearer "+token+" "})
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not confirm a non-existing email (no or invalid token)', (done) => {
		token= tokenEmail;
		chai.request(server)
	   .get('/emailconfirmation')
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

 
});
  