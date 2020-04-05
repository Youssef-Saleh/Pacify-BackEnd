const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/testpacify');


module.exports = {
    login: (req, res, next) => {
      var userCredintials;
      var token;
      var enteredData = req.body;
      mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({'email' : enteredData.email, 'password' : enteredData.password})
        .toArray((err, docs) => {
          if(docs.length == 0){
            console.log(err);
            res.send("Wrong password or email");
          } else {
            var user = docs[0];
            token = jwt.sign({user: user}, 'secretkey', { expiresIn: '2h' }, (err, token) => {
            console.log(token);
            res.json({token: token});
            });
          }
        });
      });
    },
    verifyToken: (req, res, next) => {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
          // Split at the space
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
        } else {
          // Forbidden
          res.sendStatus(403);
        }
      
      }
};