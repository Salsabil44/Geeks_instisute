CREATE DATABASE public;
CREATE TABLE items (
id SERIAL PRIMARY KEY,
name varchar(20),
price decimal
);
CREATE TABLE customers (
id SERIAL PRIMARY KEY,
first_name varchar(20),
last_name varchar(30)
);
insert into items( name, price)
values
('Small Desk','100'),
('Large desk','300'),
('Fan','80');
select * from items;

select * from items
where price > 80;

select * from items
where price <= 300;

insert into customers(first_name, last_name)
values
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');
select * from customers;

select * from customers
where first_name = 'Smith'; --nothing will apear

select * from customers
where last_name = 'Jones';

select * from customers
where first_name != 'Scott'; 