INSERT INTO "users" (username, email) VALUES
('Pavel Gusev', 'pavel.gusev431@gmail.com'),
('example', 'example@rxample.com');

-- INSERT INTO "user_secrets" (user_id, password) VALUES
-- (2, )

INSERT INTO products (user_id, subcategory_id, name, price, description, image_url, amount_in_stock) 
VALUES 
(1, 2, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(1, 4, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(1, 5, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(1, 6, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(2, 3, 'Samsung Galaxy S24', 99900, 'Galingas Samsung flagmanas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 30)
;