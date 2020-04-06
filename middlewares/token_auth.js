const jwt = require('jsonwebtoken');
const authVar = require('../env_variables/env_vars.json').KEY

module.exports = (req, res, next) => {
    const token_header = req.headers.authorization.split(" ")[1];
    //console.log(token_header)

    if(typeof token_header !== 'undefined') {
        try{
        token = jwt.verify(token_header, authVar);
        req.userId = jwt.decode(token_header)._id; 
        next();
        }catch(error){
            return res.sendStatus(403).json({
                msg: 'Unauthorized acces'
            })
        }
    } else {
        res.sendStatus(403).json({
            msg: 'Unauthorized acces'
        })
    }
      
}
