-- Insert items
INSERT INTO items("ID", "Name", "Price")
VALUES
(1, 'Small Desk', 100),
(2, 'Large Desk', 300),
(3, 'Fan', 80);

-- See all items
SELECT * FROM items;

SELECT * FROM items
WHERE "Price" < 300;

SELECT * FROM items
WHERE "Price" > 80;



INSERT INTO customers("ID", "FirstName", "LastName")
VALUES
(1, 'Greg', 'Jones'),
(2, 'Sandra', 'Jones'),
(3, 'Scott', 'Scott'),
(4, 'Trevor', 'Green'),
(5, 'Melanie', 'Johnson');

SELECT * FROM customers
WHERE "FirstName" != 'Scott';


SELECT * FROM customers
WHERE "LastName" = 'Jones';

SELECT * FROM customers
WHERE "LastName" = 'Smith';
