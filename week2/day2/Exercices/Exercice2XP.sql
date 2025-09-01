select * from customer;
select first_name || ' ' || last_name as full_name from customer;
select Distinct create_date from customer ;
select * from customer Order by first_name desc ;
select film_id,title,description,release_year,rental_rate from film  order by rental_rate;
select phone,address from address A INNER join City C 
ON C.city_id=A.city_id;
select * from film where film_id between 15 and 150;
select film_id,title,description,length,rental_rate from film where title="my favorite film"
select film_id,title,description,length,rental_rate from film where title like "Av%";
select * from film order by rental_rate desc limit 10;
select * from film order by rental_rate desc OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
select first_name,last_name,P.amount,P.payment_date from customer C
inner join payment P on P.customer_id=C.customer_id;
select * from film F 
right  join inventory I on I.film_id is null ;
select C1.city,C2.country from city C1 inner join country C2 on C1.country_id=C2.country_id;