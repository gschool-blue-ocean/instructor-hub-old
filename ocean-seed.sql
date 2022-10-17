/* ============================================================
-- TESTING(FAKE) DATA
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
meow for can opener to feed me but bathe private parts with tongue then lick owner`s face and cata**trophe. 
Pounce on unsuspecting person. Bring your owner a dead bird cat meoooow i iz master of hoomaan, not hoomaan master of i, 
oooh damn dat dog. Meow meow you are my owner so here is a dead rat oooo! dangly balls! 
jump swat swing flies so sweetly to the floor crash move on wash belly nap going to catch the red dot today going to catch the red dot today,
 thug cat and hack up furballs paw at your fat belly. Walk on keyboard, scream for no reason at 4 am, show belly for poop in the plant pot but hack. 
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