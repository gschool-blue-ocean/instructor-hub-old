import {verify} from "jsonwebtoken";

const authenticated = (handler) => {
    return async (req, res) => {
      return new Promise ((resolve, reject) => {
        //do token/cookie checks here
        // console.log("learn.js - touched the cookie checkre")
        verify(req.cookies.authCookie, process.env.COOKIE_SECRET_KEY, function(err, decoded) {
          if(!err && decoded) {
        return res.status(200);
        } else {
          // console.log('student.js');
          // console.log('error', err);
          // console.log('decoded', decoded);
          return res.status(401).json({message: 'NO Token!!'});
          //return res.status(401).redirect('/');
        }
        
      })
        
        resolve();
      });
    }
     
  };


  export default authenticated(/*not sure if another function is needed in here*/);