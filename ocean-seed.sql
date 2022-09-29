DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learn CASCADE;
DROP TABLE IF EXISTS project_grades CASCADE;
DROP TABLE IF EXISTS learn_grades CASCADE;

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
cohort TEXT,
begin_date DATE,
end_date DATE,
instructor TEXT,
SEIR1 TEXT,
SEIR2 TEXT
);


CREATE TABLE pairs (
cohort_id INT,
cohort TEXT,
student1_ln TEXT,
student2_ln TEXT
);


CREATE TABLE notes (
student_id INT,
name_first TEXT,
name_last TEXT,
instructor_notes TEXT,
SEIR_notes TEXT,
note_date DATE
);

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name TEXT
);

CREATE TABLE learn (
assessment_id SERIAL PRIMARY KEY,
assessment_name TEXT
);


CREATE TABLE project_grades (
student_id INT,
project_id INT,
project_grade INT,
FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);


CREATE TABLE learn_grades (
student_id INT,
assessment_id INT,
assessment_grade INT,
FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
FOREIGN KEY (assessment_id) REFERENCES learn(assessment_id) ON DELETE CASCADE
);

INSERT INTO students (name_first, name_last, server_s_ide_test, client_s_ide_test, soft_skills, cohort, ETS_date) 
  VALUES ('John', 'Testor', 'pass', 'pass', '2', 'MCSP13', '12/31/2022');
INSERT INTO cohorts (cohort, begin_date, end_date, instructor, SEIR1, SEIR2) 
  VALUES ('MCSP13', '01/01/2022', '04/04/2022', 'Egg', 'May', 'Growl');
INSERT INTO projects (project_name) 
  VALUES ('Twiddler');
INSERT INTO learn (assessment_name) 
  VALUES('Ajax');


INSERT INTO project_grades (project_grade) VALUES ('4');
INSERT INTO project_grades (project_grade) VALUES ('4');
INSERT INTO project_grades (project_grade) VALUES ('2');
INSERT INTO learn_grades (assessment_grade) VALUES ('99');
INSERT INTO learn_grades (assessment_grade) VALUES ('90');
INSERT INTO learn_grades (assessment_grade) VALUES ('60');

SELECT assessment_grade, name_first 
FROM learn_grades
INNER JOIN students ON students.student_id = learn_grades.student_id
WHERE learn_grades.student_id = 1;

