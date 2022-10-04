DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS coding_groups CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learn CASCADE;
DROP TABLE IF EXISTS project_grades CASCADE;
DROP TABLE IF EXISTS learn_grades CASCADE;
DROP TABLE IF EXISTS assigned_student_groupings CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;

CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  name_first TEXT,
  name_last TEXT,
  learn_avg INT,
  project_avg INT,
  server_side_test TEXT,
  client_side_test TEXT,
  soft_skills TEXT,
  cohort TEXT,
  ETS_date DATE
);
CREATE TABLE cohorts (
  cohort_id SERIAL PRIMARY KEY,
  cohort TEXT,
  begin_date DATE,
  end_date DATE,
  instructor TEXT,
  SEIR1 TEXT,
  SEIR2 TEXT
);
--THIS ENABLES TRACKING OF STUDENT CODING PAIR/GROUP ASSIGNMENTS
CREATE TABLE coding_groups (group_id SERIAL PRIMARY KEY);
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
  project_grade INT,
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
INSERT INTO students (
    name_first,
    name_last,
    server_side_test,
    client_side_test,
    soft_skills,
    cohort,
    ETS_date
  )
VALUES (
    'John',
    'Testor',
    'pass',
    'pass',
    '2',
    'MCSP13',
    '12/31/2022'
  );
INSERT INTO cohorts (
    cohort,
    begin_date,
    end_date,
    instructor,
    SEIR1,
    SEIR2
  )
VALUES (
    'MCSP13',
    '01/01/2022',
    '04/04/2022',
    'Egg',
    'May',
    'Growl'
  );
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
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '1', '4');
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '2', '4');
INSERT INTO project_grades (student_id, project_id, project_grade)
VALUES ('1', '3', '2');
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
INSERT ON students FOR EACH ROW EXECUTE PROCEDURE student_copy();

--EXAMPLE QUERY: GET ALL LEARN GRADES FOR A STUDENT BY THEIR ID
-- SELECT assessment_grade, name_first 
-- FROM learn_grades
-- INNER JOIN students ON students.student_id = learn_grades.student_id
-- WHERE learn_grades.student_id = 1;
--EXAMPLE QUERY: GET ALL PROJECT SCORES FOR A STUDENT BY THEIR ID
-- SELECT project_grade, name_first 
-- FROM project_grades
-- INNER JOIN students ON students.student_id = project_grades.student_id
-- WHERE project_grades.student_id = 1;
--CALCULATE STUDENT'S AVERAGE PROJECT SCROE/RATING

WITH grades AS (
  SELECT AVG(project_grades.project_grade) as avg
  FROM project_grades
  WHERE student_id = 1
)
UPDATE students
SET project_avg = grades.avg
FROM grades;
--CALCULATE STUDENT'S LEARN AVERAGE
WITH grades AS (
  SELECT AVG(learn_grades.assessment_grade) as avg
  FROM learn_grades
  WHERE student_id = 1
)
UPDATE students
SET learn_avg = grades.avg
FROM grades;

-- SELECT * FROM students;
---UPDATE PROJECTS AVG WHEN NEW GRADE IS ADDED OR UPDATED TO PROJECTS. 
--FUNCTION: UPDATE STUDENT'S PROJECT AVG SCORE
CREATE OR REPLACE FUNCTION calc_projavg() RETURNS trigger AS $$ BEGIN -- raise notice 'what should be returned?';
  WITH grades AS (
    SELECT AVG(project_grades.project_grade) as avg
    FROM project_grades
    WHERE student_id = NEW.student_id
  )
UPDATE students
SET project_avg = grades.avg
FROM grades;
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

--TRIGGER: RUNS WHEN STUDENT'S GRADE IS ADDED OR UPDATED
CREATE TRIGGER project
AFTER
INSERT
  OR
UPDATE ON project_grades FOR EACH ROW EXECUTE PROCEDURE calc_projavg();

---UPDATE LEARN AVG WHEN NEW GRADE IS ADDED OR UPDATED TO LEARN. 
--FUNCTION: UPDATE STUDENT'S LEARN AVG SCORE
CREATE OR REPLACE FUNCTION calc_learnavg() RETURNS trigger AS $$ BEGIN -- raise notice 'what should be returned?';
  WITH grades AS (
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

-- SELECT * FROM students;
-- SELECT project_grade, name_first 
-- FROM project_grades
-- INNER JOIN students ON students.student_id = project_grades.student_id
-- WHERE project_grades.student_id = 1;
-- SELECT assessment_grade, name_first 
-- FROM learn_grades
-- INNER JOIN students ON students.student_id = learn_grades.student_id
-- WHERE learn_grades.student_id = 1;
-- Test for student_id population across tables in the db when new student created
INSERT INTO students (
    name_first,
    name_last,
    server_side_test,
    client_side_test,
    soft_skills,
    cohort,
    ETS_date
  )
VALUES (
    'Bob',
    'Builder',
    'pass',
    'pass',
    '2',
    'MCSP13',
    '12/31/2022'
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