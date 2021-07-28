// Verify Token
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./../config/DB');	
module.exports =(req, res, next) => {
 
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token,JWT_KEY,(err,data)=>{
        if(err)
        {
          res.json({data:err})
        }
        else
        {
          next();
        }
      })
     
    } else {
      res.send({ result: "Token not provided" });
    }
  
  };
  