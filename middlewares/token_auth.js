const jwt = require('jsonwebtoken');
const authVar = require('../env_variables/env_vars.json').KEY

module.exports = (req, res, next) => {
    try{
        const token_header = req.headers.authorization.split(" ")[1];
        //console.log(token_header)

        if(typeof token_header !== 'undefined') {
            
            token = jwt.verify(token_header, authVar);
            req.userId = jwt.decode(token_header)._id; 
            next();
            
        } else {
            res.sendStatus(403).json({
                msg: 'Unauthorized access'
            })
        }
    } catch(error){
        return res.sendStatus(403).json({
            msg: 'Unauthorized access'
        })
    }
      
}
