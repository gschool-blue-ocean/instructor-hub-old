import postgres from "postgres";
import cookie from 'cookie'; 
import {sign} from 'jsonwebtoken';  
import {compare} from 'bcrypt';


// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
    process.env.DB_CONNECTION_URL,
    { max: 20 },
    process.env.NODE_ENV === "production"
      ? {
          ssl: { rejectUnauthorized: false },
          // max_lifetime: 60 * 30,
        }
      : {}
  );
  
  export default async function logout(req, res) {
    return new Promise ((resolve, reject) => {
   
        if (req.method === "PATCH") {
            
                const user = {
                    sub: 'logout'
                }
                const authToken = sign(
                    user,
                    //"0eb9b871-55be-470e-bd1b-80280585cd9a", 
                    process.env.COOKIE_SECRET_KEY,
                    //{expiresIn: '24hr'}
                    {expiresIn: '-1'}
                );
    
                res.setHeader('Set-Cookie', cookie.serialize('authCookie', authToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: '-1',
                    path: '/'
                }))
                return res.status(200).json({message: 'LOGGED OUT'});


                
            }
    
    
            resolve();
        });

    }
    
