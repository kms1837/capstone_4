create table stu_spec (
	id int not null AUTO_INCREMENT,
    student_id varchar(30) not null,
    spec_typeID int not null,
    name varchar(30) not null,
    score double not null,
    regist_agree boolean not null,
    spec_explain varchar(255) not null,
    fileID int not null,
    request_date Date not null,
    agree_date Date not null,
    primary key(id, student_id)
);