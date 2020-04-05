const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');
const User = require ('../models/user');
const tokenhandler = require ('../controller/auth');
const controller = require ('../controller/passwordReset');

mongoose.connect('mongodb://localhost:27017/testpacify');

//router.get ('/' , controller.render); //loading the page

router.post ('/' , controller.resetPass);  // calling the controller function

//router.post('/change', );
router.get('/change/', tokenhandler.verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        //An error page to be rendered
        res.sendStatus(403);
      } else {
        res.json("success");
      }
    });
});

router.put('/change', tokenhandler.verifyToken, (req, res) => {  
    jwt.verify(req.token, 'passowrdKey', (err, authData) => {
        if(err) {
          //An error page to be rendered
          res.sendStatus(403);
        } else {
          mongoose.connection.db.collection('users', function (err, collection) {
            collection.updateOne({email: authData.user.email}, {$set: {password: req.body.newPassword}})
            if(err){
                res.send(err);
            }
            else{
                res.send('Success');
            }
            
          });
        }
      });
});

module.exports = router;