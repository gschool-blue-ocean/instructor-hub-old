-- Clean the slate
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS coding_groups CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learn CASCADE;
DROP TABLE IF EXISTS project_grades CASCADE;
DROP TABLE IF EXISTS learn_grades CASCADE;
DROP TABLE IF EXISTS assigned_student_groupings CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP FUNCTION IF EXISTS calc_projavg() CASCADE;
DROP TRIGGER IF EXISTS project CASCADE;
DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;

--technical skills int 1-4
--teamwork skills int 1-4


-- Create tables and relations
CREATE TABLE cohorts (
  cohort_id SERIAL PRIMARY KEY,
  cohort TEXT,
  begin_date DATE,
  end_date DATE,
  instructor TEXT,
  cohort_avg INT,
  cohort_min INT,
  cohort_max INT
);

-- Fake Data
INSERT INTO cohorts (
    cohort_id,
    cohort,
    begin_date,
    end_date,
    instructor
  )
VALUES (
    '1',
    'MCSP13',
    '01/01/2022',
    '04/04/2022',
    'Egg'
  );

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name_first TEXT,
  name_last TEXT,
  learn_avg INT,
  server_side_test TEXT,
  client_side_test TEXT,
  team_skills TEXT, --rename to teamwork
  cohort TEXT,
  ETS_date DATE,
  github TEXT
);
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (20) UNIQUE, --should this be longer
  password TEXT NOT NULL,
  default_cohort TEXT,
  asana_access_token TEXT
);
CREATE TABLE cohorts (
  cohort_id SERIAL PRIMARY KEY,
  cohort TEXT,
  begin_date DATE,
  end_date DATE,
  instructor TEXT  --this may need to be foreign key
  --cohort_avg score
  --cohort min score
  --cohort max score
);
--THIS ENABLES TRACKING OF STUDENT CODING PAIR/GROUP ASSIGNMENTS
CREATE TABLE coding_groups (
  group_id SERIAL PRIMARY KEY, --got rid of group names
  cohort_id INT,
  ETS_date DATE,
  github TEXT,
  FOREIGN KEY (cohort_id) REFERENCES cohorts(cohort_id) ON DELETE CASCADE
  );

CREATE TABLE assigned_student_groupings (
  group_assignment_id SERIAL PRIMARY KEY,
  student_id INT,
  group_id INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES coding_groups(group_id) ON DELETE CASCADE
);
CREATE TABLE notes (
  student_id INT,
  name_first TEXT,
  name_last TEXT,
  instructor_notes TEXT,
  SEIR_notes TEXT,
  note_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);


--THIS ALLOWS TRACKIJNG STUDENTS' PROJECT RATINGS/SCORES
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT
);
CREATE TABLE project_grades (
  student_id INT,
  project_id INT,
  project_passed BOOLEAN,
  notes TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);
CREATE TABLE learn (
  assessment_id SERIAL PRIMARY KEY,
  assessment_name TEXT
);
CREATE TABLE learn_grades (
  student_id INT,
  assessment_id INT,
  assessment_grade INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (assessment_id) REFERENCES learn(assessment_id) ON DELETE CASCADE
);

CREATE TABLE student_tech_skills (
  student_id INT,
  score INT,
  record_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (score) REFERENCES proficiency_rates(skill_id) ON DELETE CASCADE
);

CREATE TABLE student_teamwork_skills (
  student_id INT,
  score INT,
  record_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (score) REFERENCES proficiency_rates(skill_id) ON DELETE CASCADE
);

CREATE TABLE proficiency_rates (
  skill_id INT UNIQUE,
  skill_descr TEXT NOT NULL
);

-- Fake Data for testing
INSERT INTO students (
    name_first,
    name_last,
    server_side_test,
    client_side_test,
    tech_skills,
    soft_skills,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'John',
    'Testor',
    'pass',
    'pass',
    '3',
    '2',
    'MCSP13',
    '1',
    '12/31/2022',
    'bronzedog'
  );

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (20) UNIQUE,
  password TEXT NOT NULL,
  default_cohort TEXT,
  asana_access_token TEXT
);

--THIS ENABLES TRACKING OF STUDENT CODING PAIR/GROUP ASSIGNMENTS
CREATE TABLE coding_groups (
  group_id SERIAL PRIMARY KEY,
  group_name TEXT,
  cohort_id INT,
  FOREIGN KEY (cohort_id) REFERENCES cohorts(cohort_id) ON DELETE CASCADE
);

CREATE TABLE assigned_student_groupings (
  group_assignment_id SERIAL PRIMARY KEY,
  student_id INT,
  group_id INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES coding_groups(group_id) ON DELETE CASCADE
);

CREATE TABLE notes (
  student_id INT,
  name_first TEXT,
  name_last TEXT,
  instructor_notes TEXT,
  SEIR_notes TEXT,
  note_date TIMESTAMPTZ,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- Fake Data
INSERT INTO notes (student_id, note_date)
VALUES ('1', NOW());

--THIS ALLOWS TRACKIJNG STUDENTS' PROJECT RATINGS/SCORES
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT
);

-- Fake Data
INSERT INTO projects (project_name)
VALUES ('Twiddler');
INSERT INTO projects (project_name)
VALUES ('PixelArtMaker');
INSERT INTO projects (project_name)
VALUES ('ReactMVP');
INSERT INTO learn (assessment_name)
VALUES('Functions');
INSERT INTO learn (assessment_name)
VALUES ('Objects');
INSERT INTO learn (assessment_name)
VALUES ('Arrays');
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '1', 'TRUE', 'Great job. They are so smart');
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '2', 'TRUE', );
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '3', 'FALSE');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '1', '99');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '2', '90');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '3', '60');

INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES(1, 'Needs improvement');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES(2, 'Approaching standard');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES(3, 'Meets standard');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES(4, 'Exceeds standard');


--Populate student ID in other tables when new student created
CREATE OR REPLACE FUNCTION student_copy() RETURNS TRIGGER AS $BODY$ BEGIN
INSERT INTO learn_grades(student_id)
VALUES(new.student_id);
INSERT INTO project_grades(student_id)
VALUES(new.student_id);
INSERT INTO notes(student_id)
VALUES(new.student_id);
RETURN new;
END;
$BODY$ language plpgsql;
CREATE TRIGGER trig_copy
AFTER
INSERT ON students FOR EACH ROW EXECUTE PROCEDURE student_copy();

-- Populate cohort ID in tables when a new cohort is created
CREATE OR REPLACE FUNCTION cohort_copy() RETURNS TRIGGER AS $BODY$ BEGIN
INSERT INTO coding_groups(cohort_id) 
VALUES(new.cohort_id)
ON CONFLICT DO NOTHING;
INSERT INTO students(cohort_id)
VALUES(new.cohort_id)
ON CONFLICT DO NOTHING;
RETURN new;
END;
$BODY$ language plpgsql;


CREATE TRIGGER trig_copy
AFTER
INSERT
  OR
UPDATE ON cohorts FOR EACH ROW EXECUTE PROCEDURE cohort_copy();

--CALCULATE STUDENT'S LEARN AVERAGE
WITH grades AS (
  SELECT AVG(learn_grades.assessment_grade) as avg
  FROM learn_grades
  WHERE student_id = 1
)
UPDATE students
SET learn_avg = grades.avg
FROM grades;


---UPDATE LEARN AVG WHEN NEW GRADE IS ADDED OR UPDATED TO LEARN. 
--FUNCTION: UPDATE STUDENT'S LEARN AVG SCORE
CREATE OR REPLACE FUNCTION calc_learnavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT AVG(learn_grades.assessment_grade) as avg
    FROM learn_grades
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET learn_avg = grades.avg
FROM grades;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

--TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER learn
AFTER
INSERT
  OR
UPDATE ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_learnavg();

-- Update cohort stats (min, max, avg

CREATE OR REPLACE FUNCTION calc_cohortavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT AVG(students.learn_avg) as avg
    FROM students
    WHERE cohort_id = 1
  )
UPDATE cohorts
SET cohort_avg = grades.avg
FROM grades;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

--TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER cohortstatavg
AFTER
INSERT
  OR
UPDATE ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_cohortavg();

-- Test for student_id population across tables in the db when new student created
INSERT INTO students (
    name_first,
    name_last,
    server_side_test,
    client_side_test,
    tech_skills,
    soft_skills,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'Bob',
    'Builder',
    'pass',
    'pass',
    '4',
    '2',
    'MCSP13',
    '1',
    '12/31/2022',
    'platypus66'
  );

-- Test for cohort_id population into coding groups when cohort created
INSERT INTO cohorts (
    cohort_id,
    cohort,
    begin_date,
    end_date,
    instructor
  )
VALUES (
    '2',
    'MCSP15',
    '01/01/2022',
    '04/04/2022',
    'Patsiukovich'
  );

-- Test for triggers to recalc average on update
INSERT INTO projects (project_name)
VALUES ('FoodTruck');
INSERT INTO learn (assessment_name)
VALUES('DOM_API');
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '4', '1');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '4', '100');

-- Test of users password MD5 hash
INSERT INTO users (
    username,
    password,
    default_cohort,
    asana_access_token
  )
VALUES (
    'testuser',
    crypt('12345', gen_salt('bf')),
    'MCSP13',
    'here_goes_an_asana_access_token'
  );

-- Test of date update for notes
UPDATE notes
SET SEIR_notes = 'this is a test of the change date on note update feature'
WHERE student_id = '1';
UPDATE notes
SET note_date = NOW()
WHERE student_id = '2';

-- Test of cohort avergage, to make sure only one coohort is averaged
INSERT INTO students (
    name_first,
    name_last,
    server_side_test,
    client_side_test,
    tech_skills,
    soft_skills,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'Anna',
    'Cortana',
    'pass',
    'pass',
    '4',
    '2',
    'MCSP15',
    '1',
    '12/31/2022',
    'catman57'
  );

INSERT INTO projects (project_name)
VALUES ('Hackathon');
INSERT INTO learn (assessment_name)
VALUES('JQUERY');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '4', '60');

-- Database statistics collector:
-- SELECT * FROM pg_stat_activity
-- add to cohort?
--select avg(learn_avg) from students;
--select min(learn_avg) as min from students;
--select max(learn_avg) as max from students;
-- by cohort:
-- learn avg
-- learn max
-- learn min
-- - trigger: change to student learn_avg
-- - function: recalculate average of learn average, where cohort_id = ?
