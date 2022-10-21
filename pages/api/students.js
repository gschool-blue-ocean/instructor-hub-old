// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postgres from "postgres";


const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
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



export default async function studentsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const students = await sql`
      SELECT * FROM students`;
      res.status(200).json({ students });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        name,
        learn_avg,
        tech_avg,
        teamwork_avg,
        server_side_test,
        client_side_test,
        cohort,
        cohort_id,
        ets_date,
        github,
        gid
      } = req.body;
      const createStudent = await sql`
               INSERT INTO students ( name, learn_avg, tech_avg, teamwork_avg, server_side_test, client_side_test, cohort, cohort_id, ets_date, github,
                gid )
               VALUES ( ${name}, ${learn_avg}, ${tech_avg}, ${teamwork_avg}, ${server_side_test}, ${client_side_test}, ${cohort}, ${cohort_id}, ${ets_date}, ${github},
                ${gid}) 
               RETURNING *`;
      res.status(200).json(req.body);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "PUT") {
    try {
      const {
        name,
        cohort,
        gid,
      } = req.body;

      const putStudent = await sql`
               INSERT INTO students ( 
                name,
                cohort,
                gid
                )
               VALUES (${name}, ${cohort}, ${gid}) 
               RETURNING *`;
      res.status(200).json(putStudent);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
};
