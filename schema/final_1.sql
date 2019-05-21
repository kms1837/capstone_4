-- 데이터 베이스 만들기
 create database capstone
 character set ='utf8'
 collate = 'utf8_general_ci';

create table subject (
	id int not null auto_increment,
    subjectnumber varchar(255) not null,
    name varchar(255) not null,
    categoryID INT,
    primary key (id)
);

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  studentID INT NOT NULL,
  name VARCHAR(30) NULL,
  password VARCHAR(255) NULL,
  departID INT NOT NULL,
  email VARCHAR(50) NULL,
  auth Boolean NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  univID INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE file (
  id INT NOT NULL AUTO_INCREMENT,
  path VARCHAR(100) NOT NULL,
  date DATE,
  PRIMARY KEY (id)
);

create table final_score(
	id int not null auto_increment,
    studentID int not null,
    final_score double not null,
    final_grade varchar(20) not null,
    primary key (id, studentID, final_grade)
);

create table major_univ (
    id int not null,
    major_univ_name varchar(30) not null
);

create table score (
	id int not null auto_increment,
    studentID varchar(255) not null,
    majorid int not null,
    score double not null,
    grade varchar(10) not null,
    learndate date not null,
    primary key(id, studentID, majorid, grade)
);

create table stu_spec (
	id int not null,
    student_id int not null,
    spec_name int not null,
    spec_score double not null,
    regist_agree boolean not null,
    spec_explain varchar(255) not null,
    certificate varchar(255) not null,
    request_date Date not null,
    agree_date Date not null,
    primary key(id,student_id)
);

