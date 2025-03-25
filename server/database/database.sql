INSERT INTO "users" (username, email, image_url, description, contacts) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com', 'https://c8.alamy.com/zooms/9/305f98cf4d084cefbe7d506128e11ecb/pxx5p8.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('Vardenis Vardenis', 'vardenis@gmail.com', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fability&psig=AOvVaw3A2c6Mz4QsnX-AcWAKZbE1&ust=1742494830976000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDW1p3hlowDFQAAAAAdAAAAABAJ', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('pavardenis Vardenis', 'pavardenis@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('trending', 'trending@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words',  'Konstutucijos 45, Vilnius'),
('bestnew', 'bestnew@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',  'text text write here more 5 words', 'Konstutucijos 45, Vilnius');
 
 
 
 
INSERT INTO products (
    user_id, subcategory_id, name, price, description, image_url, amount_in_stock, "createdAt", "updatedAt"
)
VALUES
-- Pavel Gusev
(1, 1, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 2, 'MacBook Air M2', 239900, 'testas', 'https://techcrunch.com/wp-content/uploads/2022/07/CMC_1580.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 3, 'AirPods Pro', 79900, 'Aukštos kokybės Apple ausinės', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/a/i/airpods_4_pdp_image_position_2__wwen.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 4, 'Apple Watch Series 8', 109900, 'Išmanusis laikrodis su naujomis funkcijomis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEI1ZxzdYj2i4XKe7nExt_GipGBGq31mvSw&s', 25, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 5, 'iPad Pro 12.9"', 159900, 'Naujausias Apple planšetinis kompiuteris', 'https://istore.lt/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/p/ipad-pro-12.9-wifi-space-gray_9_3.png', 20, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 6, 'Apple TV 4K', 179900, 'Streamingo įrenginys su 4K vaizdo kokybe', 'https://www.cnet.com/a/img/resize/1c366d0a88fbfbd39e98f89d27962601ba70de95/hub/2022/11/01/de745101-c753-4a3b-b9ae-b28ebfdcf9af/apple-tv-4k-streaming-box-5084.jpg?auto=webp&width=1200', 15, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 7, 'Beats Studio3 Wireless', 89900, 'Beats ausinės su triukšmo slopinimu', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/m/q/mq562-beats-studio3-over-ear-headphones-black-2.jpg', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 8, 'Apple Magic Mouse', 69900, 'Ergonomiška Apple pelė', 'https://picfit.topocentras.lt/xcdn-cgi/image/fit=contain,format=auto,quality=85/media/catalog/product/m/m/mmmq3_464582_1647337558.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 9, 'Apple Keyboard', 99900, 'Elegantiška Apple klaviatūra', 'https://www.novastar.lt/UserFiles/Products/Images/401424-604924-medium.png', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 10, 'iPhone 14 Pro', 119900, 'Ankstesnis modelis, vis dar puikus', 'https://istore.lt/media/catalog/product/a/p/apple-iphone-14-pro-deep-purple_1_1_1_1.jpg', 60, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

-- Vardenis Vardenis
(2, 1, 'Samsung Galaxy S24', 99900, 'Galingas Samsung flagmanas', 'https://kainos-img.dgn.lt/photos2_25_268648490/img.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 2, 'Samsung Galaxy Tab S8', 84900, 'Samsung planšetinis kompiuteris', 'https://www.mobilusmiestas.lt/out/pictures/z1/71kxnf5yskl._ac_sl1500__z1.jpg', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 3, 'Samsung Galaxy Buds2', 39900, 'Komfortiškos ausinės su aktyviu triukšmo slopinimu', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 4, 'Samsung SmartWatch', 79900, 'Išmanusis laikrodis su nuotolinio valdymo funkcija', 'https://cdn.pixabay.com/photo/2018/11/14/18/47/smartwatch-3818844_640.jpg', 35, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 5, 'Samsung QLED TV', 149900, 'Aukštos kokybės televizorius su QLED technologija', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 45, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 6, 'Samsung Notebook', 109900, 'Galingas nešiojamas kompiuteris', 'https://cdn.pixabay.com/photo/2018/03/21/09/52/samsung-3246582_640.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 7, 'Samsung Soundbar', 79900, 'Garsinė juosta su aukšta garso kokybe', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 60, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 8, 'Samsung Monitor', 59900, 'Didelis ekranas su 4K raiška', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Xk9-82MPIO_iMgGBjAmk09WWWFXeqZxFqQ&s', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 9, 'Samsung Powerbank', 24900, 'Nešiojamas įkroviklis', 'https://www.varle.lt/static/uploads/products/496/sam/samsung-eb-u3300xjegeu-nesiojamasis-ikroviklis_UgzXRJC.jpg', 70, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(2, 10, 'Samsung External SSD', 45900, 'Greitas išorinis SSD diskas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7DWLxqQhqoAicUNO0RWMdCuOSvP2OVrplA&s', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 2, 'MacBook Air M2', 239900, 'testas', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

-- testas
(4, 5, 'betkas', 15, 'testuoju', 'https://cdn.pixabay.com/photo/2019/04/25/21/42/ipad-4166255_640.jpg', 20, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(4, 1, 'Testo telefonas', 39999, 'Tai tik testinis telefonas', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 10, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(4, 2, 'Testo kompiuteris', 49999, 'Testo kompiuteris su labai gera kaina', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 5, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(4, 3, 'Testo ausinės', 19999, 'Testinės ausinės', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 15, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(4, 4, 'Testo laikrodis', 24999, 'Testinis laikrodis su visomis funkcijomis', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 8, '2025-03-01 10:00:00', '2025-03-01 10:00:00');

 
 
 
 
 
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

(2, 1, 6,  'Pirko iPhone 15 Pro už 1299'),
(2, 1, 6,  'Pirko iPhone 15 Pro už 999'),
(2, 1, 6,  'testas'),
(2, 1, 6,  'testas2'),
(2, 1, 6,  'Pirko Samsung Galaxy S24 už 1111'),
(2, 1, 6,  'Pirko Samsung Galaxy S24'),
(2, 1, 6,  'Pirko Samsung Galaxy S24'),
(2, 1, 6,  'ikele Samsung Galaxy S24'),
 
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
 