create table final_score(
	id int not null auto_increment,
	studentID varchar(30) not null,
    coding double not null,
    teample double not null,
    spec double not null,
    grade double not null,
    math double not null,
    final_grade varchar(20) not null,
		professor varchar(255) null,
    check_date varchar(30) not null,
    primary key (id, studentID, final_grade)
);
