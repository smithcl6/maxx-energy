-- Do not run run these statements unless wanting to reset logins table.
DROP TABLE IF EXISTS logins;
CREATE TABLE logins (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(45) NOT NULL,
    name varchar(45) NOT NULL,
    password varchar(45) NOT NULL,
    UNIQUE (email),
    PRIMARY KEY (id)
);
INSERT INTO logins (email, name, password)
VALUES
  ('hyrule1414@gmail.com', 'Christopher Smith', 'abc123'),
  ('kgandrews13@gmail.com', 'Kenton Andrews', 'ocarina1'),
  ('xmiles99@gmail.com', 'Xavier Miles', 'secret password'),
  ('therealmepippert@gmail.com', 'Madison Pippert', 'password password'),
  ('dln2015dln.dn@gmail.com', 'Devin Newland', 'password'),
  ('nosajdi@verizon.net', 'Jason Naggles', 'password'),
  ('sihenderson2@icloud.com', 'Sylvester Henderson', 'password'),
  ('dempseychris694@gmail.com', 'Chris Dempsey', 'password'),
  ('cgilber@gmu.edu', 'Charles Gilbertson', 'password'),
  ('yvteal123456789@gmail.com', 'Nathan Sale', 'password'),
  ('klemke813@gmail.com', 'Kyle Lemke', 'password'),
  ('alexkova46@gmail.com', 'Alex Kovacevic', 'password'),
  ('amjackson130@gmail.com', 'Alex Jackson', 'password'),
  ('mustafanawa13@gmail.com', 'Mustafa Azizi', 'password'),
  ('hannah.lehman@maxxpotential.com', 'Hannah Joy Lehman', 'password'),
  ('rob.simms@maxxpotential.com', 'Rob Simms', 'password'),
  ('joelle.carbonell@maxxpotential.com', 'Joelle Carbonell', 'password')
;
SELECT * FROM logins;
