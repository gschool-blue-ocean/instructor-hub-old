
import postgres from "postgres";
import authenticated from '../middleware/authenticated';


// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
      ssl: { rejectUnauthorized: false },
      idle_timeout: 20,
      max_lifetime: 60 * 30
      }
    : {idle_timeout: 20,
      max_lifetime: 60 * 30}
);

export default authenticated(async function cohortsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const cohorts = await sql`
      SELECT * FROM cohorts`;
      res.status(200).send(cohorts);
      return;
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Messed up on our end" });
      return
    }
  } else if (req.method === "POST") {
    try {
      const {
        name,
        begin_date,
        end_date,
        instructor,
        cohort_avg,
        cohort_min,
        cohort_max,
        gid,
      } = req.body;

      const createCohort = await sql`
               INSERT INTO cohorts ( 
                name,
                begin_date,
                end_date,
                instructor,
                cohort_avg,
                cohort_min,
                cohort_max,
                gid
                )
               VALUES (${name}, ${begin_date}, ${end_date}, ${instructor}, ${cohort_avg}, ${cohort_min}, ${cohort_max}, ${gid}) 
               RETURNING *`;
      res.status(200).send(createCohort);
      return;
    } catch (error) {
      console.error("Bad news in index api: ", error);
      res.status(500).send({ msg: "Messed up on our end" });
      return;
    }
  } else if (req.method === "PUT") {
    try {
      const {
        name,
        gid,
      } = req.body;

      const createCohort = await sql`
               INSERT INTO cohorts ( 
                name,
                gid
                )
               VALUES (${name}, ${gid}) 
               RETURNING *`;
      res.status(200).send(createCohort);
      return;
    } catch (error) {
      console.error("Bad news in index api: ", error);
      res.status(500).send({ msg: "Messed up on our end" });
      return;
    }
  } else {
    res.status(400).send({ msg: "You messed up" });
    return;
  }
});
