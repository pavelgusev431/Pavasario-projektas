INSERT INTO "users" (username, email, image_url, description, contacts) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com', 'https://c8.alamy.com/zooms/9/305f98cf4d084cefbe7d506128e11ecb/pxx5p8.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('Vardenis Vardenis', 'vardenis@gmail.com', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fability&psig=AOvVaw3A2c6Mz4QsnX-AcWAKZbE1&ust=1742494830976000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDW1p3hlowDFQAAAAAdAAAAABAJ', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('pavardenis Vardenis', 'pavardenis@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius');

INSERT INTO products (user_id, subcategory_id, name, price, description, image_url, amount_in_stock)
VALUES
-- Pavel Gusev
(2, 1, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(2, 2, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(3, 1, 'Samsung Galaxy S24', 99900, 'Galingas Samsung flagmanas', 'https://kainos-img.dgn.lt/photos2_25_268648490/img.jpg', 30),
(3, 8, 'Apple Magic Mouse', 69900, 'Ergonomiška Apple pelė', 'https://cdn.pixabay.com/photo/2018/07/12/08/43/apple-3539336_640.jpg', 30);

INSERT INTO "events" (user_id,product_id, type_id, target_id,  description, timestamp)
VALUES
(2,1, 1, 2,  'ikele telefona', '2025-01-25T15:58:44.450Z'),
(3,3, 1, 2,  'ikele telefona', '2025-01-25T15:58:44.450Z'),
(2, 1, 1, 6, 'sukure kometara', '2025-03-26T10:00:00.000Z'),
(3,1, 1, 6,  'sukure kometara', '2025-03-25T15:58:44.450Z'),
(4,1, 1, 6,  'sUKURE KOMETARA', '2025-01-25T15:58:44.450Z'),
(4,1, 1, 6,  'sUKURE KOMETARA', '2023-09-14T15:58:44.450Z'),
(4,2, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),
(4,2, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),
(2,3, 1, 6,  'sUKURE KOMETARA', '2025-09-14T15:58:44.450Z'),
(2,4, 1, 6,  'sUKURE KOMETARA', '2021-09-14T15:58:44.450Z');

INSERT INTO "ratings" (user_id, product_id, comment, stars, image_url)
VALUES
(3, 1, 'Puikus telefonas, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 1, 'Puikus telefonas, ', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 1, 'nekoks telefonas, ', 1, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 2, 'blogas telefonas, ', 1, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 2, 'Puikus telefonas testas ar gali buti 2 vienodi, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 3, 'nekoks telefonas, ', 2, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 4, 'nekoks Ergonomiška Apple pelė, ', 2, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png');



