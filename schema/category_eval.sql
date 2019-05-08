create table category_eval (
	id int not null,
    category_id int not null,
    student_id int not null,
    sw_score double not null,
    sw_grade varchar(20) not null,
    eval_date Date not null,
    primary key(id,student_id)
);