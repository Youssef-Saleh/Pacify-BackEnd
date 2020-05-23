const jwt = require('jsonwebtoken');
const tokenhandler = require ('../controller/auth');


let mongoose = require("mongoose");
let User = require('../Database Seeds/models/user');
let Property = require("../Database Seeds/models/property");

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
 
  var properties = [
    //////////////////////////////////////////////////
    ///genres
    new Property({
        name: "Arabic",
        type: "Genre"

    })];
  var artists= [
    new User({
        email: "A.diab@artist.pacify",
        password: "null",
        nickname: "Amr Diab",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://pbs.twimg.com/profile_images/1227958901515182080/i18Ow4Zj_400x400.jpg"
    })]
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		
          user.save((err, user) => {
          });
          properties[0].save((err,properties)=>{
              
          })
          artists[0].save((err,properties)=>{
            done();
        })
         
    });
    afterEach((done) => {
        User.remove({}, (err) => { 
            done();		   
         });
    })      	
    
});

describe('/Get select artists', () => {
	it('it should get artists to choose', (done) => {
		   chai.request(server)
		  .get('/select/artists')
		  .set({Authorization: "Bearer "+token+" "})
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not get artists to choose (no or invalid token)', (done) => {
		chai.request(server)
	   .get('/select/artists')
	   .end((err, res) => {
             res.should.have.status(403);
             //console.log(res);
			 //res.body.Artists.nickname.should.be("Amr Diab")
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
    
});

describe('/PUT select artists', () => {
	it('it should get artists to choose', (done) => {
        let Artists= {"_id": "5e87f3b5746e924d5c930416"};
		   chai.request(server)
		  .put('/select/artists')
          .set({Authorization: "Bearer "+token+" "})
          .send(Artists)
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not get artists to choose (no or invalid token)', (done) => {
		chai.request(server)
	   .get('/select/artists')
	   .end((err, res) => {
             res.should.have.status(403);
             //console.log(res);
			 //res.body.Artists.nickname.should.be("Amr Diab")
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
    
});

describe('/Get select genres', () => {
	it('it should get genres to choose', (done) => {

		   chai.request(server)
		  .get('/select/genres')
          .set({Authorization: "Bearer "+token+" "})
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not get genres to choose (no or invalid token)', (done) => {
		chai.request(server)
	   .get('/select/genres')
	   .end((err, res) => {
             res.should.have.status(403);
             //console.log(res);
			 //res.body.Artists.nickname.should.be("Amr Diab")
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
    
});

describe('/PUT select genres', () => {
	it('it should choose genres', (done) => {
        let Genres= {"_id": "5e87f3b5746e924d5c930416"};
		   chai.request(server)
		  .put('/select/genres')
          .set({Authorization: "Bearer "+token+" "})
          .send(Genres)
		  .end((err, res) => {
				res.should.have.status(200);
			done();
		  });
	});
	it('it should not choose genres (no or invalid token)', (done) => {
		chai.request(server)
	   .put('/select/genres')
	   .end((err, res) => {
             res.should.have.status(403);
             //console.log(res);
			 //res.body.Artists.nickname.should.be("Amr Diab")
			 //res.body.errors.should.have.property('pages');
			 //res.body.errors.pages.should.have.property('kind').eql('required');
		 done();
	   });
 });
    
});