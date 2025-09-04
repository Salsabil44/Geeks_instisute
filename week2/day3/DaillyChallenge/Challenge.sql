--Part 1:
CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

CREATE TABLE customer_profile(
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INT UNIQUE REFERENCES customer(id) ON DELETE CASCADE
);

INSERT INTO customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO customer_profile (customer_id, isLoggedIn)
VALUES
((SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe'), TRUE),
((SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'), FALSE);

SELECT c.first_name
FROM customer c
JOIN customer_profile p
  ON c.id = p.customer_id
WHERE p.isLoggedIn = TRUE;

SELECT c.first_name, p.isLoggedIn
FROM customer c
LEFT JOIN customer_profile p
 ON c.id = p.customer_id;
 
SELECT COUNT(*) AS not_logged_in_count
FROM customer c
LEFT JOIN customer_profile p
  ON c.id = p.customer_id
WHERE p.isLoggedIn = FALSE OR p.isLoggedIn IS NULL;

--Part 2:
create table Book(
book_id serial primary key,
title  VARCHAR(100) NOT NULL,
author VARCHAR(100) NOT NULL
);
insert into Book(title,author)
values
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter','J.K Rowling'),
('To kill a mockingbird','Harper Lee');

create table Student(
student_id serial primary key,
name varchar(50) not null unique,
age int check (age <= 15)
);
insert into Student(name, age)
values
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob',14);
select * from Student;
create table Library (
book_fk_id int,
student_fk_id int,
borrowed_date date,
primary key (book_fk_id, student_fk_id),
foreign key (book_fk_id) references Book(book_id) 
on delete cascade 
on update cascade,
foreign key (student_fk_id) references Student(student_id) 
on delete cascade
on  update cascade
);

insert into library (book_fk_id, student_fk_id, borrowed_date)
values (
    (select book_id from book where title = 'Alice In Wonderland'),
    (select student_id from student where name = 'john'),
    '2022-02-15'
);

insert into library (book_fk_id, student_fk_id, borrowed_date)
values (
    (select book_id from book where title = 'To kill a mockingbird'),
    (select student_id from student where name = 'Bob'),
    '2021-03-03'
);

insert into library (book_fk_id, student_fk_id, borrowed_date)
values (
    (select book_id from book where title = 'Alice In Wonderland'),
    (select student_id from student where name = 'Lera'),
    '2021-05-23'
);

insert into library (book_fk_id, student_fk_id, borrowed_date)
values (
    (select book_id from book where title = 'Harry Potter'),
    (select student_id from student where name = 'Bob'),
    '2021-08-12'
);

select * from library;

select s.name, b.title, l.borrowed_date
from library l
join student s on l.student_fk_id = s.student_id
join book b on l.book_fk_id = b.book_id;

select avg(s.age) as avg_age
from library l
join student s on l.student_fk_id = s.student_id
join book b on l.book_fk_id = b.book_id
where b.title = 'Alice In Wonderland';

delete from student where name = 'Bob';