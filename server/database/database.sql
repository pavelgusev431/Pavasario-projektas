INSERT INTO "users" (username, email) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com'),
('example', 'example@rxample.com');

INSERT INTO products (user_id, subcategory_id, name, price, description, image_url, amount_in_stock) 
VALUES 
(1, 2, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://example.com/iphone15.jpg', 50),
(2, 3, 'Samsung Galaxy S24', 99900, 'Galingas Samsung flagmanas', 'https://example.com/galaxyS24.jpg', 30)
;