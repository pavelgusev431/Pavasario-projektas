INSERT INTO "users" (username, email, image_url, description, contacts) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com', 'https://c8.alamy.com/zooms/9/305f98cf4d084cefbe7d506128e11ecb/pxx5p8.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('Vardenis Vardenis', 'vardenis@gmail.com', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fability&psig=AOvVaw3A2c6Mz4QsnX-AcWAKZbE1&ust=1742494830976000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDW1p3hlowDFQAAAAAdAAAAABAJ', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('pavardenis Vardenis', 'pavardenis@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('trending', 'trending@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words',  'Konstutucijos 45, Vilnius'),
('bestnew', 'bestnew@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',  'text text write here more 5 words', 'Konstutucijos 45, Vilnius');
 
 
 
 
INSERT INTO products (user_id, subcategory_id, name, price, description, image_url, amount_in_stock)
VALUES
-- Pavel Gusev
(1, 1, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50),
(1, 2, 'MacBook Air M2', 239900, 'testas', 'https://techcrunch.com/wp-content/uploads/2022/07/CMC_1580.jpg', 30),
(1, 3, 'AirPods Pro', 79900, 'Aukštos kokybės Apple ausinės', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/a/i/airpods_4_pdp_image_position_2__wwen.jpg', 40),
(1, 4, 'Apple Watch Series 8', 109900, 'Išmanusis laikrodis su naujomis funkcijomis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEI1ZxzdYj2i4XKe7nExt_GipGBGq31mvSw&s', 25),
(1, 5, 'iPad Pro 12.9"', 159900, 'Naujausias Apple planšetinis kompiuteris', 'https://cdn.pixabay.com/photo/2019/04/25/21/42/ipad-4166255_640.jpg', 20),
(1, 6, 'Apple TV 4K', 179900, 'Streamingo įrenginys su 4K vaizdo kokybe', 'https://cdn.pixabay.com/photo/2017/11/19/08/47/television-2958579_640.jpg', 15),
(1, 7, 'Beats Studio3 Wireless', 89900, 'Beats ausinės su triukšmo slopinimu', 'https://cdn.pixabay.com/photo/2017/06/04/23/43/headphones-2375491_640.jpg', 50),
(1, 8, 'Apple Magic Mouse', 69900, 'Ergonomiška Apple pelė', 'https://cdn.pixabay.com/photo/2018/07/12/08/43/apple-3539336_640.jpg', 30),
(1, 9, 'Apple Keyboard', 99900, 'Elegantiška Apple klaviatūra', 'https://cdn.pixabay.com/photo/2015/12/09/12/47/apple-1081042_640.jpg', 40),
(1, 10, 'iPhone 14 Pro', 119900, 'Ankstesnis modelis, vis dar puikus', 'https://cdn.pixabay.com/photo/2019/06/24/22/24/smartphone-4302037_640.jpg', 60),
 
-- Vardenis Vardenis
(2, 1, 'Samsung Galaxy S24', 99900, 'Galingas Samsung flagmanas', 'https://kainos-img.dgn.lt/photos2_25_268648490/img.jpg', 30),
(2, 2, 'Samsung Galaxy Tab S8', 84900, 'Samsung planšetinis kompiuteris', 'https://cdn.pixabay.com/photo/2017/09/04/12/31/smartphone-2713652_640.jpg', 50),
(2, 3, 'Samsung Galaxy Buds2', 39900, 'Komfortiškos ausinės su aktyviu triukšmo slopinimu', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 40),
(2, 4, 'Samsung SmartWatch', 79900, 'Išmanusis laikrodis su nuotolinio valdymo funkcija', 'https://cdn.pixabay.com/photo/2018/11/14/18/47/smartwatch-3818844_640.jpg', 35),
(2, 5, 'Samsung QLED TV', 149900, 'Aukštos kokybės televizorius su QLED technologija', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 45),
(2, 6, 'Samsung Notebook', 109900, 'Galingas nešiojamas kompiuteris', 'https://cdn.pixabay.com/photo/2018/03/21/09/52/samsung-3246582_640.jpg', 40),
(2, 7, 'Samsung Soundbar', 79900, 'Garsinė juosta su aukšta garso kokybe', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 60),
(2, 8, 'Samsung Monitor', 59900, 'Didelis ekranas su 4K raiška', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Xk9-82MPIO_iMgGBjAmk09WWWFXeqZxFqQ&s', 50),
(2, 9, 'Samsung Powerbank', 24900, 'Nešiojamas įkroviklis', 'https://www.varle.lt/static/uploads/products/496/sam/samsung-eb-u3300xjegeu-nesiojamasis-ikroviklis_UgzXRJC.jpg', 70),
(2, 10, 'Samsung External SSD', 45900, 'Greitas išorinis SSD diskas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7DWLxqQhqoAicUNO0RWMdCuOSvP2OVrplA&s', 30),
(3, 2, 'MacBook Air M2', 239900, 'testas', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 30),
--testas
(4, 5, 'betkas', 15, 'testuoju', 'https://cdn.pixabay.com/photo/2019/04/25/21/42/ipad-4166255_640.jpg', 20),
 
(4, 1, 'Testo telefonas', 39999, 'Tai tik testinis telefonas', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 10),
(4, 2, 'Testo kompiuteris', 49999, 'Testo kompiuteris su labai gera kaina', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 5),
(4, 3, 'Testo ausinės', 19999, 'Testinės ausinės', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 15),
(4, 4, 'Testo laikrodis', 24999, 'Testinis laikrodis su visomis funkcijomis', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 8);
 
 
 
 
 
INSERT INTO "events" (user_id,product_id, type_id, target_id,  description, timestamp)
VALUES
(1,null, 1, 6,  'Pirko iPhone 15 Pro už 1299', '2024-03-01 10:15:30'),
(1,null, 1, 6,  'Pirko iPhone 15 Pro už 999', '2024-03-01 10:15:30'),
(1,null, 1, 6,  'testas', '2024-03-01 10:15:30'),
(1,null, 1, 6,  'testas2', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko Samsung Galaxy S24 už 1111', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko Samsung Galaxy S24', '2024-03-01 10:15:30'),
(3,null, 1, 6,  'Pirko Samsung Galaxy S24', '2024-03-01 10:15:30'),
(4,null, 1, 6,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),

(2,null, 1, 6,  'Pirko iPhone 15 Pro už 1299', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko iPhone 15 Pro už 999', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'testas', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'testas2', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko Samsung Galaxy S24 už 1111', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko Samsung Galaxy S24', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'Pirko Samsung Galaxy S24', '2024-03-01 10:15:30'),
(2,null, 1, 6,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
 

(4,null, 1, 1,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
(4,null, 1, 1,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
(4,null, 1, 1,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
(4,null, 1, 1,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
(4,null, 1, 1,  'ikele Samsung Galaxy S24', '2024-03-01 10:15:30'),
 

(1,1, 1, 2, 'Įkėlė telefoną', '2024-03-01 10:15:30'),
(1,2, 1, 2, 'Įkėlė planšetę', '2024-03-10 12:45:50'),
(1,3, 1, 2, 'Įkėlė nešiojamą kompiuterį', '2024-03-20 14:30:20'),
(1,4, 1, 2, 'Įkėlė ausines', '2024-04-01 16:05:10'),
(1,5, 1, 2, 'Įkėlė televizorių', '2024-04-12 09:25:40'),
(1,6, 1, 2, 'Įkėlė kolonėlę', '2024-04-22 11:50:15'),
(1,7, 1, 2, 'Įkėlė žaidimų konsolę', '2024-05-02 08:10:55'),
(1,8, 1, 2, 'Įkėlė smartwatch', '2024-05-15 13:40:30'),
(1,9, 1, 2, 'Įkėlė dulkių siurblį', '2024-05-25 15:20:45'),
(1,10, 1, 2, 'Įkėlė šaldytuvą', '2024-06-05 18:35:25'),
(2,11, 1, 2, 'Įkėlė skalbimo mašiną', '2024-06-15 20:10:50'),
(2,12, 1, 2, 'Įkėlė orkaitę', '2024-06-28 07:55:35'),
(2,13, 1, 2, 'Įkėlė kavos aparatą', '2024-07-05 10:20:15'),
(2,14, 1, 2, 'Įkėlė mikrobangų krosnelę', '2024-07-15 12:30:40'),
(2,15, 1, 2, 'Įkėlė fotoaparatą', '2024-08-01 14:55:10'),
(2,16, 1, 2, 'Įkėlė droną', '2024-08-12 17:25:20'),
(2,17, 1, 2, 'Įkėlė vaizdo plokštę', '2024-08-22 19:40:55'),
(2,18, 1, 2, 'Įkėlė procesorių', '2024-09-05 09:15:30'),
(2,19, 1, 2, 'Įkėlė kietąjį diską', '2024-09-18 11:50:10'),
(2,20, 1, 2, 'Įkėlė SSD diską', '2024-09-30 13:35:45'),
(3,21, 1, 2, 'Įkėlė RAM atmintį', '2024-10-10 16:05:30'),
(4,22, 1, 2, 'Įkėlė motininę plokštę', '2024-10-25 18:20:50'),
(4,23, 1, 2, 'Įkėlė kompiuterio dėklą', '2024-11-05 20:45:15'),
(4,24, 1, 2, 'Įkėlė monitorių', '2024-11-15 08:30:40'),
(4,25, 1, 2, 'Įkėlė pelę', '2024-12-01 10:55:20'),
(4,26, 1, 2, 'Įkėlė klaviatūrą', '2024-12-12 13:10:35');
 
INSERT INTO "ratings" (user_id, product_id, comment, stars, image_url)
VALUES
-- Pavel Gusev
(1, 2, 'Puikus telefonas, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 2, 'Labai patogus naudoti, tačiau kaina galėtų būti mažesnė.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 2, 'Kamera galėtų būti geresnė, bet visumoje geras produktas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 2, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
-- Vardenis Vardenis
(2, 2, 'Puikus telefono ekranas, bet baterija greitai išsikrauna.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 2, 'Geras telefonas už gerą kainą, bet su trūkumais.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 2, 'Nedaug funkcijų, bet vis tiek patogus naudoti.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 2, 'Išskirtinis dizainas, tačiau prasta kamera.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(3, 2, 'Puikus telefonas', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
-- Vardenis Vardenis
(2, 18, 'Puikus telefono ekranas, bet baterija greitai išsikrauna.', 4, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(3, 18, 'Geras telefonas už gerą kainą, bet su trūkumais.', 4, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
 
(1, 1, 'Puikus telefonas, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Labai patogus naudoti, tačiau kaina galėtų būti mažesnė.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Kamera galėtų būti geresnė, bet visumoje geras produktas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
-- Vardenis Vardenis
(2, 1, 'Puikus telefono ekranas, bet baterija greitai išsikrauna.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 1, 'Geras telefonas už gerą kainą, bet su trūkumais.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 1, 'Nedaug funkcijų, bet vis tiek patogus naudoti.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 1, 'Išskirtinis dizainas, tačiau prasta kamera.', 5, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(3, 1, 'Puikus telefonas', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
-- Vardenis Vardenis
(2, 1, 'Puikus telefono ekranas, bet baterija greitai išsikrauna.', 4, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(3, 1, 'Geras telefonas už gerą kainą, bet su trūkumais.', 4, 'https://cdn.pixabay.com/photo/2016/04/29/05/47/phone-1434035_960_720.jpg'),
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 11, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 3, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 3, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 3, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 4, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 4, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 4, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(2, 19, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 20, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 18, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(1, 1, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(4, 22, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 22, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 22, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 22, 'Super greitas ir patogus telefonas.', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(1, 23, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 24, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(3, 25, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(5, 26, 'Super greitas ir patogus telefonas.', 4, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png');
 