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