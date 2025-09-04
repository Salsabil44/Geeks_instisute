--Exercice 1:
SELECT * FROM language;

SELECT f.title, f.description, l.name AS language_name
FROM film AS f
JOIN language AS l ON f.language_id = l.language_id;
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id order by f.film_id desc;

create table new_film (
id serial primary key,
name varchar (60)
)
insert into new_film(name)
values
('Tehran'),
('Sister Death'),
('Doctor sleep');

create table customer_review(
review_id serial primary key,
film_id int references new_film(id) on delete cascade,
language_id int references language(language_id),
title varchar(255),
score int check (score between 1 and 10),
review_text text,
last_update timestamp default now()
);
insert into customer_review(film_id, language_id, title, score, review_text)
values
(1,1, 'nice movie', 9, 'i loved it'),
(2,2, 'not bad', 6, 'it was not that bad');
delete from new_film where id = 1;
select * from customer_review;
--Exercice 2:
update film
set language_id = 2
where film_id = 10;
-- خاصو يكون ستور موجود
-- خاصو يكون عنوان موجود
--يعني إلا بغيت تدير insert خاصك دير زبون مرتبط بعنوان وستّور موجودين
drop table customer_review;
--easy
select count(*)
from rental
where return_date is null;

select f.title, f.replacement_cost
from rental r
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
where r.return_date is null
order by f.replacement_cost desc
limit 30;

select f.title
from film f
join film_actor fa on f.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id
where f.description like '%sumo%'
and a.first_name = 'penelope'
and a.last_name = 'monroe';

select f.title
from film f
where f.length < 60
and f.rating = 'r'
and f.description ilike '%documentary%';

select f.title
from film f
join inventory i on f.film_id = i.film_id
join rental r on i.inventory_id = r.inventory_id
join customer c on r.customer_id = c.customer_id
where c.first_name = 'matthew'
  and c.last_name = 'mahan'
  and r.return_date between '2005-07-28' and '2005-08-01'
  and r.rental_rate > 4.00;