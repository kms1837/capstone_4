create table final_score(
	id int not null auto_increment,
    studentID int not null,
    score double not null,
    grade varchar(20) not null,
    primary key (id, studentID, grade)
);
