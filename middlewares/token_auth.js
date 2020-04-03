const jwt = require('jsonwebtoken');
const authVar = require('../env_variables/env_vars.json')

module.exports = (req, res, next) => {
    const token_header = req.headers.authorization.split(" ")[1];
    console.log(token_header)

    if(typeof token_header !== 'undefined') {
        try{
        token = jwt.verify(token_header, authVar.KEY);
        req.userId = token._id; 

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
