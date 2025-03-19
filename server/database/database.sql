INSERT INTO "users" (username, email) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com'),
('Vardenis Vardenis', 'vardenis@gmail.com'),
('pavardenis Vardenis', 'pavardenis@gmail.com'),
('trending', 'trending@gmail.com'),
('bestnew', 'bestnew@gmail.com');
 
 
 
 
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
 
 
 
 
 
INSERT INTO "events" (user_id, type_id, target_id,  description)
VALUES
(1, 1, 6,  'Pirko iPhone 15 Pro už 1299'),
(1, 1, 6,  'Pirko iPhone 15 Pro už 999'),
(1, 1, 6,  'testas'),
(1, 1, 6,  'testas2'),
(2, 1, 6,  'Pirko Samsung Galaxy S24 už 1111'),
(2, 1, 6,  'Pirko Samsung Galaxy S24'),
(3, 1, 6,  'Pirko Samsung Galaxy S24'),
(4, 1, 6,  'ikele Samsung Galaxy S24'),
 
(1, 1, 2,  'ikele iPhone 15 Pro už 1299'),
(1, 1, 2,  'ikele iPhone 15 Pro už 999'),
(1, 1, 2,  'ikele'),
(1, 1, 2,  'ikele2'),
(2, 1, 2,  'ikele Samsung Galaxy S24 už 1111'),
(2, 1, 2,  'ikele Samsung Galaxy S24 už 1111'),
(2, 1, 2,  'ikele Samsung Galaxy S24 už 1111'),
(2, 1, 2,  'ikele Samsung Galaxy S24 už 1111'),
(2, 1, 2,  'ikele Samsung Galaxy S24'),
(3, 1, 2,  'ikele Samsung Galaxy S24'),
(4, 1, 1,  'ikele Samsung Galaxy S24'),
(4, 1, 1,  'ikele Samsung Galaxy S24'),
(4, 1, 1,  'ikele Samsung Galaxy S24'),
(4, 1, 1,  'ikele Samsung Galaxy S24'),
(4, 1, 1,  'ikele Samsung Galaxy S24'),
 
(4, 1, 2, 'Pirko Testo telefoną už 39999'),
(4, 1, 2, 'Pirko Testo kompiuterį už 49999'),
(4, 1, 2, 'Pirko Testo ausines už 19999'),
(4, 1, 2, 'Pirko Testo laikrodį už 24999');
 
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
 