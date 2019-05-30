create table graduate(
	  studentID varchar(30) not null,
	  coding double not null,
    teample double not null,
    spec double not null,
    grade double not null,
    math double not null,
    final_grade varchar(20) not null,
		corporation varchar(50) not null,
		graduate_spec varchar(255) null,
    primary key (studentID, final_grade)
);
