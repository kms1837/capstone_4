create table final_score(
	id int not null auto_increment,
    studentID int not null,
    final_score double not null,
    final_grade varchar(20) not null,
    primary key (id, studentID, final_grade)
);
