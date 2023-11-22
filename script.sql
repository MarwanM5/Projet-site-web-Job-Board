--- Create User: project ---
Create user if not exists 'project'@'localhost' identified by 'P@ssword1234';
Grant all privileges on *.* to 'project'@'localhost';

--- Database: store ---
Create database if not exists store;
use store;

---- Table: advertisements ----
CREATE TABLE if not exists advertisements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) not null,
  description TEXT,
  location VARCHAR(255) not null,
  salary DOUBLE(10,2) not null,
  category VARCHAR(255) not null,
  company_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

---- Table: companies ---
CREATE TABLE if not exists companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL
);

---- Table: people ---
CREATE TABLE if not exists people (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'employee') not null default 'employee',
  company_id INT
);

---- Table: job_applications ---
CREATE TABLE if not exists job_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  advertisement_id INT,
  person_id INT,
  email_sent BOOLEAN,
  status ENUM('pending', 'accepted', 'rejected') default 'pending'
);

--- Table: routes ---
CREATE TABLE if not exists routes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paths VARCHAR(255) NOT NULL,
  namePaths VARCHAR(255) NOT NULL,
  isLoggedIn BOOLEAN NOT NULL
);

---- Foreign keys ---
alter table job_applications add foreign key (advertisement_id) references advertisements(id);
alter table job_applications add foreign key (person_id) references people(id);
alter table people add foreign key (company_id) references companies(id);
alter table advertisements add foreign key (company_id) references companies(id);

--- Data ---
insert into companies (name, address, contact_email) values ('Google', '1600 Amphitheatre Pkwy, Mountain View, CA 94043', '9h3Jr@example.com');
insert into companies (name, address, contact_email) values ('Facebook', '1600 Amphitheatre Pkwy, Mountain View, CA 94043', '9h3Jr@example.com');
insert into companies (name, address, contact_email) values ('Amazon', '1600 Amphitheatre Pkwy, Mountain View, CA 94043', '9h3Jr@example.com');

insert into advertisements (title, description, location, salary, category, company_id) values ('Software Engineer', 'Software Engineer', 'Mountain View, CA', 1000.00, 'Software', 1);
insert into advertisements (title, description, location, salary, category, company_id) values ('Software Engineer', 'Software Engineer', 'Mountain View, CA', 1000.00, 'Software', 2);
insert into advertisements (title, description, location, salary, category, company_id) values ('Software Engineer', 'Software Engineer', 'Mountain View, CA', 1000.00, 'Software', 3);

insert into routes (paths, namePaths, isLoggedIn) values ('/', 'Home', false);
insert into routes (paths, namePaths, isLoggedIn) values ('/account', 'Account', false);
insert into routes (paths, namePaths, isLoggedIn) values ('/postes', 'Postes', true);
insert into routes (paths, namePaths, isLoggedIn) values ('/company', 'Company', true);