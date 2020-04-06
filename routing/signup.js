// const express = require ('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const controller = require ('../controller/signup');
// const tokenhandler = require ('../controller/auth');
// const mongoose = require ('mongoose');

// mongoose.connect('mongodb://localhost:27017/testpacify');

// router.post ('/' , controller.insertuser);  // calling the controller function

// router.get('/emailconfirmation', tokenhandler.verifyToken, (req, res) => {  
//     jwt.verify(req.token, 'EmailSecret', (err, authData) => {
//       if(err) {
//         //An error page to be rendered
//         res.sendStatus(403);
//       } else {
//         mongoose.connection.db.collection('users', function (err, collection) {
//           console.log(authData.result.email);
//           collection.updateOne({email: authData.result.email}, {$set: {activated: true}})
//           if(err){
//               res.send(err);
//           }
//           else{
//             res.json("Email confirmed!");
//           }
//         });   
//       }
//     })
// });

// module.exports = router;