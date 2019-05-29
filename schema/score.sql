create table score (
	id int not null auto_increment,
    studentID varchar(255) not null,
    subjectID int not null,
    score double not null,
    grade varchar(10) not null,
    primary key(id, studentID, grade)
);
