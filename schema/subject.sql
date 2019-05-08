create table subject (
	id int not null auto_increment,
    majorname varchar(30) not null,
    subjectnumber int not null,
    subjectname varchar(255) not null,
    category varchar(255) null,
    primary key (id)
);