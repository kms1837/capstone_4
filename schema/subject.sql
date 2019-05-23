create table subject (
	id int not null auto_increment,
    majorname varchar(30) not null,
    subjectnumber int not null,
    name varchar(255) not null,
    trackID INT,
    primary key (id)
);