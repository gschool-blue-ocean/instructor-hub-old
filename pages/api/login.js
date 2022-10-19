import { COMPILER_NAMES } from "next/dist/shared/lib/constants";
import postgres from "postgres";
import cookie from 'cookie'; 
import {sign} from 'jsonwebtoken';  
import {compare} from 'bcrypt';


// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
    process.env.DB_CONNECTION_URL,
    process.env.NODE_ENV === "production"
      ? {
          ssl: { rejectUnauthorized: false },
          idle_timeout: 20,
          max_lifetime: 60 * 30
          // max_lifetime: 60 * 30,
        }
      : {idle_timeout: 20,
        max_lifetime: 60 * 30}
  );
  
  export default async function login(req, res) {
    if (req.method === "POST") {
        console.log("login.js - received a post request");
        try {
            const person = await sql`SELECT * FROM users where username = ${req.body.username}`;
            console.log(`login.js - Login Request`);
            console.log(req.body);
            console.log(`login.js - sql result`);
            console.log(person[0]);
            const user_query = person[0];
            compare(req.body.password, user_query.password).then((result) => {
                console.log(`login.js - compare result ${result}`);
                if (result) {
                    console.log('login.js - passwords matched!');
                    
                    const user = {
                        sub: user_query.user_id, 
                        default_cohort: user_query.default_cohort, 
                        asana_access_token: user_query.asana_access_token, 
                        gid: user_query.gid
                    };
    
                    const authToken = sign(
                        user, 
                        //"0eb9b871-55be-470e-bd1b-80280585cd9a", 
                        process.env.COOKIE_SECRET_KEY,
                        {expiresIn: '24hr'}
                    );
                    res.setHeader('Set-Cookie', cookie.serialize('authCookie', authToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 86400,
                        path: '/'
                    }))
                    res.send({message : {
                        asana_access_token: user_query.asana_access_token,
                        default_cohort: user_query.default_cohort,
                        gid: user_query.gid,
                        user_id: user_query.user_id,
                        username: user_query.username
                    }});
                    return;
                } else {
                res.status(500).send({ msg: "Username or Password is wrong" });
                return;
                }
            });
        } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: "Messed up on our end" });
      }
    } else {
      return res.status(400).send({ msg: "You messed up" });
    }
  };