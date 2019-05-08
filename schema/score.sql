create table score (
	id int not null auto_increment,
    studentID int not null,
    majorid int not null,
    score double not null,
    grade varchar(10) not null,
    learndate date not null,
    primary key(id, studentID, majorid, grade)
);