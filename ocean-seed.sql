DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS scores CASCADE;


CREATE TABLE students (
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


CREATE TABLE scores (
student_id INT,
cohort_id INT,
learn_complete TEXT,
learn_scores TEXT [],
projects_complete TEXT,
project_scores INT []
);


INSERT INTO students (name_first, name_last, server_side_test, client_side_test, soft_skills, cohort, ETS_date) 
  VALUES ('John', 'Testor', 'pass', 'pass', '2', 'MCSP13', '12/31/2022');
INSERT INTO cohorts (cohort, begin_date, end_date, instructor, SEIR1, SEIR2) 
  VALUES ('MCSP13', '01/01/2022', '04/04/2022', 'Egg', 'May', 'Growl');
INSERT INTO pairs (cohort, student1_ln, student2_ln) 
  VALUES ('MCSP13', 'Testor', 'Mon');
INSERT INTO notes (name_first, name_last, instructor_notes, SEIR_notes, note_date) 
  VALUES ('John', 'Testor', 'Meh', 'Meh','02/02/2022');
INSERT INTO scores (learn_complete, learn_scores) VALUES ('learn1','{"99"}'),('learn2','{"88"}'),('learn3','{"77"}'),('learn4','{"66"}');
INSERT INTO scores (projects_complete, project_scores) VALUES ('project1','{"99"}'),('project2','{"88"}'),('project3','{"77"}'),('project4','{"66"}');


ALTER TABLE students ADD COLUMN student_id SERIAL PRIMARY KEY;
ALTER TABLE cohorts ADD COLUMN cohort_id SERIAL PRIMARY KEY;
ALTER TABLE pairs ADD COLUMN pair_id SERIAL PRIMARY KEY;



ALTER TABLE pairs ADD CONSTRAINT pairs_cohort FOREIGN KEY(cohort_id) REFERENCES cohorts(cohort_id);
ALTER TABLE notes ADD CONSTRAINT notes_student FOREIGN KEY(student_id) REFERENCES students(student_id);
ALTER TABLE scores ADD CONSTRAINT scores_student FOREIGN KEY(student_id) REFERENCES students(student_id);
ALTER TABLE scores ADD CONSTRAINT scores_cohort FOREIGN KEY(cohort_id) REFERENCES cohorts(cohort_id);



INSERT INTO students (name_first, name_last, server_side_test, client_side_test, soft_skills, cohort, ETS_date) 
  VALUES ('Jo', 'Mon', 'pass', 'pass', '2', 'MCSP13', '12/31/2022');
INSERT INTO cohorts (cohort, begin_date, end_date, instructor, SEIR1, SEIR2) 
  VALUES ('MCSP13', '01/01/2022', '04/04/2022', 'Egg', 'June', 'Growl');
INSERT INTO pairs (cohort, student1_ln, student2_ln) 
  VALUES ('MCSP13', 'Testor', 'Mon');
INSERT INTO notes (name_first, name_last, instructor_notes, SEIR_notes, note_date) 
  VALUES ('Jo', 'Mon', 'Meh', 'Meh','02/02/2022');
INSERT INTO scores (learn_complete, learn_scores) VALUES ('learn1','{"99"}'),('learn2','{"88"}'),('learn3','{"77"}'),('learn4','{"66"}');
INSERT INTO scores (projects_complete, project_scores) VALUES ('project1','{"99"}'),('project2','{"88"}'),('project3','{"77"}'),('project4','{"66"}');