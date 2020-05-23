const jwt = require('jsonwebtoken');
const tokenhandler = require ('../controller/auth');


let mongoose = require("mongoose");
let User = require('../Database Seeds/models/user');


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let token, tokenEmail;

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
  jwt.sign({user: user}, 'passwordKey', { expiresIn: '50m' }, (err, token) => {
    tokenEmail=token;   
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

describe('/POST password-reset', () => {
    
    it('it should search for an existing user ', (done) => {
          let emailUsername = "mohamed@gmail.com";
          chai.request(server)
          .post('/password-reset')
          .send(emailUsername)
          .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                //res.body.should.have.property('message').eql('Book successfully added!');
                //res.body.book.should.have.property('title');
                //res.body.book.should.have.property('author');
                //res.body.book.should.have.property('pages');
                //res.body.book.should.have.property('year');
            done();
          });
    });
    
});

describe('/GET password-reset/change', () => {
    
    it('it should load change password form ', (done) => {
          //console.log(tokenEmail);
          chai.request(server)
          .get('/password-reset/change')
          .set({Authorization: "Bearer "+token+" "})
          .end((err, res) => {
                //console.log(err);
                res.should.have.status(200);
                //res.body.should.be.a('object');
                //res.body.should.have.property('message').eql('Book successfully added!');
                //res.body.book.should.have.property('title');
                //res.body.book.should.have.property('author');
                //res.body.book.should.have.property('pages');
                //res.body.book.should.have.property('year');
            done();
          });
    });
    
    it('it should not load change password form(no or invalid token) ', (done) => {
        //console.log(tokenEmail);
        chai.request(server)
        .get('/password-reset/change')
        .set({Authorization: "Bearer "})
        .end((err, res) => {
              //console.log(err);
              res.should.have.status(403);
              //res.body.should.be.a('object');
              //res.body.should.have.property('message').eql('Book successfully added!');
              //res.body.book.should.have.property('title');
              //res.body.book.should.have.property('author');
              //res.body.book.should.have.property('pages');
              //res.body.book.should.have.property('year');
          done();
        });
  });
});

describe('/PUT password-reset/change', () => {
    
    it('it should change user password ', (done) => {
          let newPassword = "123456789";
          token= tokenEmail;
          //console.log(tokenEmail);
          chai.request(server)
          .put('/password-reset/change')
          .set({Authorization: "Bearer "+token+" "})
          .send(newPassword)
          .end((err, res) => {
                //console.log(err);
                res.should.have.status(200);
                //res.body.should.be.a('object');
                //res.body.should.have.property('message').eql('Book successfully added!');
                //res.body.book.should.have.property('title');
                //res.body.book.should.have.property('author');
                //res.body.book.should.have.property('pages');
                //res.body.book.should.have.property('year');
            done();
          });
    });
    
});