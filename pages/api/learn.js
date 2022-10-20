import postgres from "postgres";
import {verify} from 'jsonwebtoken';

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


const authenticated = (handler) => {
    return async (req, res) => {
      return new Promise ((resolve, reject) => {
        //do token/cookie checks here
        console.log("learn.js - touched the cookie checkre")
        verify(req.headers.authorization, process.env.COOKIE_SECRET_KEY, function(err, decoded) {
          if(err && decoded) {
        return handler(req, res);
        }
        res.redirect('/');
      })
        
        resolve();
      });
    }
     
  };

export default authenticated(async function learnHandler(req, res) {
  if (req.method === "GET") {
    try {
      const learn = await sql`
      SELECT * FROM learn`;
      res.status(200).json({ learn });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { assessment_name } = req.body;
      console.log(req.body);
      const createAssessment = await sql`
               INSERT INTO learn ( assessment_name ) VALUES (${assessment_name}) RETURNING *`;
      return res.status(200).json(createAssessment[0]);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    return res.status(400).json({ msg: "You messed up" });
  }
});
