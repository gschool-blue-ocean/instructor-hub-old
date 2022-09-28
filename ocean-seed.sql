DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learn CASCADE;

CREATE TABLE students (
studentId INT,
name_first_last TEXT,
learn_avg INT,
project_avg INT,
server_side_test TEXT,
client_side_test TEXT,
soft_skills TEXT,
cohort TEXT,
ETS_date DATE,



 CONSTRAINT student_learn
    FOREIGN KEY(learn_avg) 
	  REFERENCES learn(learn_avg),

  CONSTRAINT student_project
    FOREIGN KEY(project_avg) 
	  REFERENCES projects(project_avg)
);

CREATE TABLE cohorts (
cohortId INT,
cohort TEXT,
begin_date DATE,
end_date DATE,
instructor TEXT,
SEIR1 TEXT,
SEIR2 TEXT,
);


CREATE TABLE pairs (
pairId INT,
cohortId INT, 
student1 TEXT,
student2 TEXT, 

CONSTRAINT pairs_cohort
    FOREIGN KEY(cohortId) 
	  REFERENCES cohorts(cohortId)
);


CREATE TABLE notes (
studentId INT,
name_first_last TEXT,
instructor_notes TEXT,
SEIR_notes TEXT,
note_date DATE,

CONSTRAINT notes_student
    FOREIGN KEY(studentId) 
	  REFERENCES students(studentId)
);



CREATE TABLE projects (
studentId INT,
name_first_last INT,
cohort TEXT,
project1 INT,
project2 INT,
project3 INT,
project_avg INT,

CONSTRAINT project_student
    FOREIGN KEY(studentId) 
	  REFERENCES students(studentId)
);

CREATE TABLE learn (
studentId INT,
cohort TEXT,
name_first_last TEXT,
cohort TEXT,
learn1 INT,
learn2 INT,
learn3 INT,
learn_avg INT,

CONSTRAINT learn_student
    FOREIGN KEY(studentId) 
	  REFERENCES students(studentId)
);

ALTER TABLE students ADD PRIMARY KEY (studentId);
ALTER TABLE cohorts ADD PRIMARY KEY (cohortId);
ALTER TABLE pairs ADD PRIMARY KEY (pairId);

ALTER TABLE student ADD CONSTRAINT student_learn FOREIGN KEY (learn_avg) REFERENCES learn (learn_avg);
ALTER TABLE student ADD CONSTRAINT student_project FOREIGN KEY (project_avg) REFERENCES projects (project_avg);


INSERT INTO students (name_first_last, server_side_test, client_side_test, soft_skills, cohort, ETS_date) 
  VALUES ('John Testor', 'pass', 'pass', '2', 'MCSP13', '12/31/2022');
INSERT INTO cohorts (cohort, begin_date, end_date, instructor, SEIR1, SEIR2) 
  VALUES ('MCSP13', '01/01/2022', '04/04/2022', 'Jimmy Bobby', 'May Growl', 'Chanda Lear');
INSERT INTO pairs (cohort, student1, student2) 
  VALUES ('MCSP13', 'John Testor', 'Dave Random');
INSERT INTO notes (name_first_last, instructor_notes, SEIR_notes, note_date) 
  VALUES ('John Testor', 'Meh', 'Meh','02/02/2022');
INSERT INTO projects (name_first_last, cohort, project1, project2, project3) 
  VALUES ('John Testor', 'MCSP13', '99', '88','77');
INSERT INTO learn (name_first_last, cohort, learn1, learn2, learn3) 
  VALUES ('John Testor', 'MCSP13', '99', '88','77');
