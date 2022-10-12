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
DROP TABLE IF EXISTS proficiency_rates CASCADE;
DROP TABLE IF EXISTS student_teamwork_skills CASCADE;
DROP TABLE IF EXISTS student_tech_skills CASCADE;
DROP FUNCTION IF EXISTS calc_projavg() CASCADE;
DROP TRIGGER IF EXISTS project ON project_grades CASCADE;
DROP TRIGGER IF EXISTS cohortavg ON students CASCADE;
DROP TRIGGER IF EXISTS trig_student_copy on students CASCADE;
DROP TRIGGER IF EXISTS trig_cohort_copy ON cohorts CASCADE;

DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;
--questions for mike-c or the group:
--1) notes table: can we drop fname and lname from notes table?
--2) notes table: do we need instructor AND seir notes? is that how front end is designed?
--3) MJ - confirm if any cascading deletions are unwanted or create a problem (e.g. deleting an assessment deletes the record of student's grades and averages)
--4) Asana GIDs should they be unique?

--TABLE OF CONTENTS--
--SECTION 1: TABLES AND RELATIONS
------ (1) users
------ (2) cohorts
------ (3) students
------ (4) coding_groups
------ (5) assigned_student_groupings
------ (6) notes
------ (7) proficiency_rates
------ (8) student_tech_skills
------ (9) student_teamwork_skills 
------ (10) projects
------ (11) project_grades
------ (12) learn
------ (13) learn_grades  
--SECTION 2: FUNCTIONS AND TRIGGERS
------ (1) calc_techavg()
------ (2) calc_teamwrkavg()
------ (3) calc_learnavg()
------ (4) calc_cohortmin()
------ (5) calc_cohortmax()
------ (6) calc_cohortavg()
---SECTION 3: SEED DATA
------ (1) proficiency_table (scores)
---SECTION 4: TESTING(FAKE) DATA


/* ============================================================
-- SECTION 1: Create tables and relations
============================================================== */
  CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE,
  password TEXT NOT NULL,
  default_cohort TEXT,
  asana_access_token TEXT,  
  gid TEXT
);

CREATE TABLE cohorts (
  cohort_id SERIAL PRIMARY KEY,
  name TEXT,
  begin_date DATE,
  end_date DATE,
  instructor TEXT,
  cohort_avg INT,
  cohort_min INT,
  cohort_max INT,
  gid TEXT
);

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name TEXT,
  learn_avg INT,
  tech_avg INT,
  teamwork_avg INT,
  server_side_test TEXT,
  client_side_test TEXT,
  cohort TEXT,
  cohort_id INT,
  ETS_date DATE,
  github TEXT,
  gid TEXT,
  FOREIGN KEY (cohort_id) REFERENCES cohorts(cohort_id) ON DELETE CASCADE
  );

--THIS ENABLES TRACKING OF STUDENT CODING PAIR/GROUP ASSIGNMENTS
CREATE TABLE coding_groups (
  group_id SERIAL PRIMARY KEY,
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
  note_id SERIAL PRIMARY KEY,
  notes TEXT,
  name TEXT,
  note_date TIMESTAMPTZ,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

CREATE TABLE proficiency_rates (
  skill_id INT UNIQUE,
  skill_descr TEXT NOT NULL
);

CREATE TABLE student_tech_skills (
  student_id INT,
  score INT,
  record_date TIMESTAMPTZ,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (score) REFERENCES proficiency_rates(skill_id) ON DELETE RESTRICT
);

  CREATE TABLE student_teamwork_skills (
    student_id INT,
    score INT,
    record_date TIMESTAMPTZ,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (score) REFERENCES proficiency_rates(skill_id) ON DELETE RESTRICT
  );

--THIS ALLOWS TRACKIJNG STUDENTS' PROJECT RATINGS/SCORES
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT,
  ASANA_GID TEXT
);

CREATE TABLE project_grades (
  student_id INT,
  project_id INT,
  project_passed BOOLEAN,
  notes TEXT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE RESTRICT
  --removes learn grades if student is deleted. Cannot delete projects without deleting grades first
);
----this index ensures students don't have duplicate grades
CREATE UNIQUE INDEX project_grades_only_one_per_student
    ON project_grades (student_id, project_id);

CREATE TABLE learn (
  assessment_id SERIAL PRIMARY KEY,
  assessment_name TEXT
);

CREATE TABLE learn_grades (
  student_id INT,
  assessment_id INT,
  assessment_grade INT,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
  FOREIGN KEY (assessment_id) REFERENCES learn(assessment_id) ON DELETE RESTRICT
  --removes learn grades if student is deleted. Cannot delete assessments without deleting grades first

);
----this index ensures students don't have duplicate grades
CREATE UNIQUE INDEX learn_grades_only_one_per_student
    ON learn_grades (student_id, assessment_id);





/* ============================================================
-- SECTION 2: FUNCTIONS AND TRIGGERS
============================================================== */
--- (1) UPDATE STUDENT'S TECH SKILLS AVG WHEN NEW SCORE IS ADDED OR UPDATED. 
----FUNCTION: UPDATE STUDENT'S TECH AVG SCORE
CREATE OR REPLACE FUNCTION calc_techavg() RETURNS trigger AS $$ BEGIN WITH scores AS (
    SELECT AVG(student_tech_skills.score) as avg
    FROM student_tech_skills
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET tech_avg = scores.avg
FROM scores
WHERE student_id = NEW.student_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
----TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER tech_skills_trigger
AFTER
INSERT
  OR
UPDATE ON student_tech_skills FOR EACH ROW EXECUTE PROCEDURE calc_techavg();


--- (2) UPDATE STUDENT'S TEAMWORK SKILLS AVG WHEN NEW SCORE IS ADDED OR UPDATED. 
---- FUNCTION: UPDATE STUDENT'S TEAMWORK AVG SCORE
CREATE OR REPLACE FUNCTION calc_teamwrkavg() RETURNS trigger AS $$ BEGIN WITH scores AS (
    SELECT AVG(student_teamwork_skills.score) as avg
    FROM student_teamwork_skills
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET teamwork_avg = scores.avg
FROM scores
WHERE student_id = NEW.student_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
---- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER teamwrk_skills_trigger
AFTER
INSERT
  OR
UPDATE ON student_teamwork_skills FOR EACH ROW EXECUTE PROCEDURE calc_teamwrkavg();


--- (3) UPDATE STUDENT'S LEARN AVG WHEN NEW GRADE IS ADDED OR UPDATED TO LEARN. 
-- FUNCTION: UPDATE STUDENT'S LEARN AVG SCORE
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
-- TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER learn
AFTER
INSERT
  OR
UPDATE OF assessment_grade ON learn_grades FOR EACH ROW EXECUTE PROCEDURE calc_learnavg();


--- (4)  UPDATE COHORT'S LOWEST ASSESSMENT AVERAGE WHEN STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED. 
-- FUNCTION:UPDATE COHORT LOWEST AVG SCORE
CREATE OR REPLACE FUNCTION calc_cohortmin() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT MIN(students.learn_avg) as min
    FROM students
    WHERE cohort_id = NEW.cohort_id
  )
UPDATE cohorts
SET cohort_min = grades.min
FROM grades
WHERE cohort_id = new.cohort_id;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
-- TRIGGER: RUNS WHEN STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED
CREATE TRIGGER cohortmin
AFTER
INSERT
  OR
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortmin();


--- (5)  UPDATE COHORT'S HIGHEST ASSESSMENT AVERAGE WHEN STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED. 
-- FUNCTION:UPDATE COHORT HIGHEST AVG SCORE
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
-- TRIGGER: RUNS WHEN STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED
CREATE TRIGGER cohortmax
AFTER
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortmax();

-- Update cohort avg
--- (6)  UPDATE THE OVERALL AVERAGE OF STUDENT'S ASSESSMENT-AVERAGES FOR THE COHORT WHEN
---      STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED.
-- FUNCTION:UPDATE COHORT OVERALL AVG SCORE
CREATE OR REPLACE FUNCTION calc_cohortavg() RETURNS trigger AS $$ BEGIN WITH grades AS (
    SELECT AVG(students.learn_avg) as avg
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
-- TRIGGER: RUNS WHEN STUDENT'S LEARN AVERAGE IS ADDED OR UPDATED
CREATE TRIGGER cohortavg
AFTER
UPDATE of learn_avg ON students FOR EACH ROW EXECUTE PROCEDURE calc_cohortavg();




/* ============================================================
-- SECTION 3: SEED DATA
============================================================== */
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES('1', 'Needs improvement');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES('2', 'Approaching standard');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES('3', 'Meets standard');
INSERT INTO proficiency_rates (skill_id, skill_descr)
VALUES('4', 'Exceeds standard');




/* ============================================================
-- SECTION 4: TESTING(FAKE) DATA
============================================================== */

--INSERT INTO USERS
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

  INSERT INTO users (
    username,
    password,
    default_cohort,
    asana_access_token
  )
VALUES (
    'Mr. Egg',
    crypt('password', gen_salt('bf')),
    'MCSP15',
    'heres_another_asana_access_token'
  );

  INSERT INTO users (
    username,
    password,
    default_cohort,
    asana_access_token
  )
VALUES (
    'a',
    crypt('a', gen_salt('bf')),
    'MCSP13',
    'heres_yet another_asana_access_token'
  );

-- Fake Data
INSERT INTO cohorts (
    name,
    begin_date,
    end_date,
    instructor,
    gid
  )
VALUES (
    'MCSP13',
    '01/01/2022',
    '04/04/2022',
    'testuser',
    '100'
  );
-- Fake Data
INSERT INTO students (
    name,
    server_side_test,
    client_side_test,
    tech_avg,
    teamwork_avg,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'John Testor',
    'pass',
    'pass',
    '3',
    '2',
    'MCSP13',
    '1',
    '12/31/2022',
    'bronzedog'
  );

-- Fake Data
INSERT INTO notes (student_id, name, note_date, notes)
VALUES ('1', 'Egg',NOW(), 'Cat ipsum dolor sit amet, intrigued by the shower for chase red laser dot, 
or always ensure to lay down in such a manner that tail can lightly brush human`s nose love me!. 
Demand to have some of whatever the human is cooking, then sniff the offering and walk away jump up to edge of bath, 
fall in then scramble in a mad panic to get out scratch leg; 
meow for can opener to feed me but bathe private parts with tongue then lick owner`s face and catasstrophe. 
Pounce on unsuspecting person. Bring your owner a dead bird cat meoooow i iz master of hoomaan, not hoomaan master of i, 
oooh damn dat dog. Meow meow you are my owner so here is a dead rat oooo! dangly balls! 
jump swat swing flies so sweetly to the floor crash move on wash belly nap going to catch the red dot today going to catch the red dot today,
 thug cat and hack up furballs paw at your fat belly. Walk on keyboard scream for no reason at 4 am show belly for poop in the plant pot but hack. 
 Cat snacks attack feet.');



--INSERT INTO TECH AND TEAMWORK TABLES


-- Fake Data
INSERT INTO projects (project_name)
VALUES ('Twiddler');
INSERT INTO projects (project_name  )
VALUES ('PixelArtMaker');
INSERT INTO projects (project_name)
VALUES ('ReactMVP');

INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '1', 'TRUE', 'Great job. They are so smart');
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '2', 'TRUE', 'not very good');
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '3', 'FALSE', 'good effort but missed the mark');

--Fake Data
INSERT INTO learn (assessment_name)
VALUES('Functions');
INSERT INTO learn (assessment_name)
VALUES ('Objects');
INSERT INTO learn (assessment_name)
VALUES ('Arrays');


-- Fake Data
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '1', '99');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '2', '90');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '3', '60');



-- Test for student_id population across tables in the db when new student created
INSERT INTO students (
    name,
    server_side_test,
    client_side_test,
    tech_avg,
    teamwork_avg,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'Bob Builder',
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
VALUES ('2', '1', '94');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('2', '2', '87');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('2', '3', '88');

-- Test for cohort_id population into coding groups when cohort created
INSERT INTO cohorts (
    name,
    begin_date,
    end_date,
    instructor,
    gid
  )
VALUES (
    'MCSP15',
    '01/01/2022',
    '04/04/2022',
    'Egg',
    '101'
  );

-- Test for triggers to recalc average on update
INSERT INTO projects (project_name)
VALUES ('FoodTruck');
INSERT INTO learn (assessment_name)
VALUES('DOM_API');
INSERT INTO project_grades (student_id, project_id, project_passed, notes)
VALUES ('1', '4', 'FALSE', 'They SUCK!!');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('1', '4', '100');



-- Test of date update for notes
UPDATE notes
SET notes = 'this is a test of the change date on note update feature'
WHERE student_id = '2';
UPDATE notes
SET note_date = NOW()
WHERE student_id = '2';

-- Test of cohort avergage, to make sure only one coohort is averaged

INSERT INTO students (
    name,
    server_side_test,
    client_side_test,
    tech_avg,
    teamwork_avg,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'Dark Helmet',
    'pass',
    'pass',
    '3',
    '2',
    'MCSP15',
    '2',
    '12/31/2022',
    'MegaMaid5050'
  );


  INSERT INTO students (
    name,
    server_side_test,
    client_side_test,
    tech_avg,
    teamwork_avg,
    cohort,
    cohort_id,
    ETS_date,
    github
  )
VALUES (
    'Anna Cortana',
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
VALUES ('1', '5', '40');

-- Fake Data
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('3', '1', '66');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('3', '2', '54');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('3', '3', '92');

INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '1', '88');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '2', '97');
INSERT INTO learn_grades (student_id, assessment_id, assessment_grade)
VALUES ('4', '3', '89');


INSERT INTO student_tech_skills (student_id, score, record_date)
VALUES ('2', '4', NOW());

INSERT INTO student_teamwork_skills (student_id, score, record_date)
VALUES ('2', '2', NOW());

-- Database statistics collector:
-- SELECT * FROM pg_stat_activity

-- Linear Regression to see if learn scores are predictive of tech skills for a cohort.  
-- The closer R^2 is to 1, the stronger the predictive power
-- SELECT regr_r2(learn_avg, tech_skills) as r2_learn_tech FROM students