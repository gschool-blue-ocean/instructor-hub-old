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
DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;

-- Create tables and relations
CREATE TABLE cohorts (
  cohort_id SERIAL PRIMARY KEY,
  cohort TEXT,
  begin_date DATE,
  end_date DATE,
  instructor TEXT,
  cohort_avg INT,
  cohort_min INT,
  cohort_max INT,
  ASANA_GID TEXT
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
  project_avg INT,
  server_side_test TEXT,
  client_side_test TEXT,
  tech_skills INT,
  soft_skills TEXT,
  cohort TEXT,
  cohort_id INT,
  ETS_date DATE,
  github TEXT,
  ASANA_GID TEXT,
  FOREIGN KEY (cohort_id) REFERENCES cohorts(cohort_id) ON DELETE CASCADE
);

-- Fake Data
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
INSERT INTO notes (student_id, note_date, SEIR_notes)
VALUES ('1', NOW(), 'Ой у лузі червона калина похилилася,
Чогось наша славна Україна зажурилася.
А ми тую червону калину підіймемо,
А ми нашу славну Україну, гей-гей, розвеселимо!
А ми тую червону калину підіймемо,
А ми нашу славну Україну, гей-гей, розвеселимо!');

--THIS ALLOWS TRACKIJNG STUDENTS' PROJECT RATINGS/SCORES
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT,
  ASANA_GID TEXT
);

-- Fake Data
INSERT INTO projects (project_name)
VALUES ('Twiddler');
INSERT INTO projects (project_name)
VALUES ('PixelArtMaker');
INSERT INTO projects (project_name)
VALUES ('ReactMVP');

CREATE TABLE project_grades (
  student_id INT,
  project_id INT,
  project_grade INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

--Fake Data
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '1', '4');
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '2', '4');
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '3', '2');

CREATE TABLE learn (
  assessment_id SERIAL PRIMARY KEY,
  assessment_name TEXT
);

-- Fake Data
INSERT INTO learn (assessment_name)
VALUES('Functions');
INSERT INTO learn (assessment_name)
VALUES ('Objects');
INSERT INTO learn (assessment_name)
VALUES ('Arrays');

CREATE TABLE learn_grades (
  student_id INT,
  assessment_id INT,
  assessment_grade INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (assessment_id) REFERENCES learn(assessment_id) ON DELETE CASCADE
);
-- Fake Data
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '1', '99');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '2', '90');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '3', '60');

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
INSERT OR UPDATE OF name_first ON students FOR EACH ROW EXECUTE PROCEDURE student_copy();

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
UPDATE OF cohort ON cohorts FOR EACH ROW EXECUTE PROCEDURE cohort_copy();

--CALCULATE STUDENT'S AVERAGE PROJECT SCROE/RATING
-- WITH grades AS (
--   SELECT AVG(project_grades.project_grade) as avg
--   FROM project_grades
--   WHERE student_id = 1
-- )
-- UPDATE students
-- SET project_avg = grades.avg
-- FROM grades;

--CALCULATE STUDENT'S LEARN AVERAGE
-- WITH grades AS (
--   SELECT AVG(learn_grades.assessment_grade) as avg
--   FROM learn_grades
--   WHERE student_id = 1
-- )
-- UPDATE students
-- SET learn_avg = grades.avg
-- FROM grades;

---UPDATE PROJECTS AVG WHEN NEW GRADE IS ADDED OR UPDATED TO PROJECTS. 
--FUNCTION: UPDATE STUDENT'S PROJECT AVG SCORE
CREATE OR REPLACE FUNCTION calc_projavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT AVG(project_grades.project_grade) as avg
    FROM project_grades
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET project_avg = grades.avg
FROM grades
WHERE student_id = NEW.student_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

--TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER project
AFTER
INSERT
  OR
UPDATE OF project_grade ON project_grades FOR EACH ROW EXECUTE PROCEDURE calc_projavg();

---UPDATE LEARN AVG WHEN NEW GRADE IS ADDED OR UPDATED TO LEARN. 
--FUNCTION: UPDATE STUDENT'S LEARN AVG SCORE
CREATE OR REPLACE FUNCTION calc_learnavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT AVG(learn_grades.assessment_grade) as avg
    FROM learn_grades
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET learn_avg = grades.avg
FROM grades
WHERE student_id = NEW.student_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

--TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER learn
AFTER
INSERT
  OR
UPDATE OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_learnavg();

-- Update cohort min

CREATE OR REPLACE FUNCTION calc_cohortmin() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT MIN(students.learn_avg) as min
    FROM students
    WHERE cohort_id = new.cohort_id
  )
UPDATE cohorts
SET cohort_min = grades.min
FROM grades
WHERE cohort_id = new.cohort_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER cohortmin
AFTER
INSERT
  OR
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortmin();

-- Update cohort max

CREATE OR REPLACE FUNCTION calc_cohortmax() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT MAX(students.learn_avg) as max
    FROM students
    WHERE cohort_id = new.cohort_id
  )
UPDATE cohorts
SET cohort_max = grades.max
FROM grades
WHERE cohort_id = new.cohort_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER cohortmax
AFTER
INSERT
  OR
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortmax();

-- Update cohort avg

CREATE OR REPLACE FUNCTION calc_cohortavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT MAX(students.learn_avg) as avg
    FROM students
    WHERE cohort_id = new.cohort_id
  )
UPDATE cohorts
SET cohort_avg = grades.avg
FROM grades
WHERE cohort_id = new.cohort_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER cohortavg
AFTER
INSERT
  OR
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortavg();

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

  -- Fake Data
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('2', '1', '55');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('2', '2', '95');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('2', '3', '87');

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
    '2',
    '12/31/2022',
    'catman57'
  );

INSERT INTO projects (project_name)
VALUES ('Hackathon');
INSERT INTO learn (assessment_name)
VALUES('JQUERY');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '4', '40');

-- Fake Data
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '1', '88');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '2', '97');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '3', '89');

-- Database statistics collector:
-- SELECT * FROM pg_stat_activity
