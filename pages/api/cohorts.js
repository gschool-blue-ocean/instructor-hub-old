
import postgres from "postgres";
import { resolve } from "styled-jsx/css";



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

export default async function cohortsHandler(req, res) {
  return new Promise ((resolve, reject) => {
  if (req.method === "GET") {
    sql`
      SELECT * FROM cohorts`
      .then(cohorts => {
        res.status(200).send(cohorts)
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ msg: "Messed up on our end" }).end();
    })
    resolve();
  } else if (req.method === "POST") {
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

      sql`
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
          RETURNING *`
          .then(createCohort => {
          res.status(200).json(createCohort);
          })
          .catch(error => {
          console.error("Bad news in index api: ", error);
          res.status(500).send({ msg: "Messed up on our end" });
      })
      resolve();

  } else if (req.method === "PUT") {
    const {
      name,
      gid,
    } = req.body;

    sql`
        INSERT INTO cohorts ( 
        name,
        gid
        )
        VALUES (${name}, ${gid}) 
        RETURNING *`
        .then(createCohort => {
        res.status(200).send(createCohort);
        })
        .catch(error => {
          console.error("Bad news in index api: ", error);
          res.status(500).send({ msg: "Messed up on our end" });
        });
    resolve();
    } else {
        res.status(400).send({ msg: "You messed up" });
        resolve();
    }
  resolve();
  })
};
