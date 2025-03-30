INSERT INTO "users" (username, email, image_url, description, contacts) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com', 'https://c8.alamy.com/zooms/9/305f98cf4d084cefbe7d506128e11ecb/pxx5p8.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('Vardenis Vardenis', 'vardenis@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-gxW7tUW_zWRnuZbcfV35ypZZvBoRbKZrA&s', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('pavardenis Vardenis', 'pavardenis@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('trending', 'trending@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words',  'Konstutucijos 45, Vilnius'),
('bestnew', 'bestnew@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',  'text text write here more 5 words', 'Konstutucijos 45, Vilnius');
 

INSERT INTO products (
  user_id, subcategory_id, name, price, description, image_url, amount_in_stock, "createdAt", "updatedAt"
) VALUES
-- Pavel Gusev
(1, 1, 'iPhone 15 Pro', 129900, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 0, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 2, 'MacBook Air M2', 239900, 'testas', 'https://techcrunch.com/wp-content/uploads/2022/07/CMC_1580.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 3, 'AirPods Pro', 79900, 'Aukštos kokybės Apple ausinės', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/a/i/airpods_4_pdp_image_position_2__wwen.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 4, 'Apple Watch Series 8', 109900, 'Išmanusis laikrodis su naujomis funkcijomis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEI1ZxzdYj2i4XKe7nExt_GipGBGq31mvSw&s', 25, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 5, 'iPad Pro 12.9"', 159900, 'Naujausias Apple planšetinis kompiuteris', 'https://cdn.pixabay.com/photo/2019/04/25/21/42/ipad-4166255_640.jpg', 20, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 6, 'Apple TV 4K', 179900, 'Streamingo įrenginys su 4K vaizdo kokybe', 'https://cdn.pixabay.com/photo/2017/11/19/08/47/television-2958579_640.jpg', 15, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 7, 'Beats Studio3 Wireless', 89900, 'Beats ausinės su triukšmo slopinimu', 'https://cdn.pixabay.com/photo/2017/06/04/23/43/headphones-2375491_640.jpg', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 8, 'Apple Magic Mouse', 69900, 'Ergonomiška Apple pelė', 'https://cdn.pixabay.com/photo/2018/07/12/08/43/apple-3539336_640.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 9, 'Apple Keyboard', 99900, 'Elegantiška Apple klaviatūra', 'https://cdn.pixabay.com/photo/2015/12/09/12/47/apple-1081042_640.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(1, 10, 'iPhone 14 Pro', 119900, 'Ankstesnis modelis, vis dar puikus', 'https://cdn.pixabay.com/photo/2019/06/24/22/24/smartphone-4302037_640.jpg', 60, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

-- Vardenis Vardenis
(3, 1, 'Samsung Galaxy S24', 999.00, 'Galingas Samsung flagmanas', 'https://kainos-img.dgn.lt/photos2_25_268648490/img.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 2, 'Samsung Galaxy Tab S8', 849.00, 'Samsung planšetinis kompiuteris', 'https://cdn.pixabay.com/photo/2017/09/04/12/31/smartphone-2713652_640.jpg', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 3, 'Samsung Galaxy Buds2', 399.00, 'Komfortiškos ausinės su aktyviu triukšmo slopinimu', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 4, 'Samsung SmartWatch', 799.00, 'Išmanusis laikrodis su nuotolinio valdymo funkcija', 'https://cdn.pixabay.com/photo/2018/11/14/18/47/smartwatch-3818844_640.jpg', 35, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 5, 'Samsung QLED TV', 1499.00, 'Aukštos kokybės televizorius su QLED technologija', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 45, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 6, 'Samsung Notebook', 1099.00, 'Galingas nešiojamas kompiuteris', 'https://cdn.pixabay.com/photo/2018/03/21/09/52/samsung-3246582_640.jpg', 40, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 7, 'Samsung Soundbar', 799.00, 'Garsinė juosta su aukšta garso kokybe', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 60, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 8, 'Samsung Monitor', 599.00, 'Didelis ekranas su 4K raiška', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Xk9-82MPIO_iMgGBjAmk09WWWFXeqZxFqQ&s', 50, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 9, 'Samsung Powerbank', 249.00, 'Nešiojamas įkroviklis', 'https://www.varle.lt/static/uploads/products/496/sam/samsung-eb-u3300xjegeu-nesiojamasis-ikroviklis_UgzXRJC.jpg', 70, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(3, 10, 'Samsung External SSD', 459.00, 'Greitas išorinis SSD diskas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7DWLxqQhqoAicUNO0RWMdCuOSvP2OVrplA&s', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

-- testas
(4, 2, 'MacBook Air M2', 2399.00, 'testas', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 30, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

-- testas
(5, 5, 'betkas', 15, 'testuoju', 'https://cdn.pixabay.com/photo/2019/04/25/21/42/ipad-4166255_640.jpg', 20, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),

(5, 1, 'Testo telefonas', 399.99, 'Tai tik testinis telefonas', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 10, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(5, 2, 'Testo kompiuteris', 499.99, 'Testo kompiuteris su labai gera kaina', 'https://cdn.pixabay.com/photo/2015/09/18/19/03/black-946146_640.jpg', 5, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(5, 3, 'Testo ausinės', 199.99, 'Testinės ausinės', 'https://cdn.pixabay.com/photo/2019/07/09/06/24/headphones-4321242_640.jpg', 15, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(5, 4, 'Testo laikrodis', 249.99, 'Testinis laikrodis su visomis funkcijomis', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 8, '2025-03-01 10:00:00', '2025-03-01 10:00:00'),
(5, 4, 'Tikrinu ar veikia data', 249, 'tikrinu', 'https://cdn.pixabay.com/photo/2017/09/11/18/14/earphones-2733452_640.jpg', 8, '2025-03-01 10:00:00', '2025-03-01 10:00:00');


INSERT INTO "events" (user_id,product_id, type_id, target_id,  description, timestamp)
VALUES
-- userio sukurimas
(2,null, 1, 1,  'vartotojas sukurtas', '2025-03-25T15:58:44.450Z'),
(3,null, 1, 1,  'vartotojas sukurtas', '2025-03-27T15:58:44.450Z'),
(4,null, 1, 1,  'vartotojas sukurtas', '2025-03-25T15:58:44.450Z'),
(5,null, 1, 1,  'vartotojas sukurtas', '2025-03-25T15:58:44.450Z'),
(6,null, 1, 1,  'vartotojas sukurtas', '2025-03-25T15:58:44.450Z'),

-- produktu sukurimas
(2,1, 1, 2,  'ikele iPhone 15 Pro', '2024-03-25T15:58:44.450Z'),
(2,2, 1, 2,  'ikele MacBook Air M2', '2025-03-25T15:58:44.450Z'),
(2,3, 1, 2,  'ikele AirPods Pro', '2025-03-25T15:58:44.450Z'),
(2,4, 1, 2,  'Samsung SmartWatch', '2025-03-25T15:58:44.450Z'),
(2,5, 1, 2,  'ikele iPad Pro 12.9', '2025-03-25T15:58:44.450Z'),
(2,6, 1, 2,  'ikele Apple TV 4K', '2025-03-25T15:58:44.450Z'),
(2,7, 1, 2,  'ikele Beats Studio3 Wireless', '2025-03-25T15:58:44.450Z'),
(2,8, 1, 2,  'ikele Apple Magic Mouse', '2025-03-25T15:58:44.450Z'),
(2,9, 1, 2,  'ikele Apple Keyboard', '2025-03-25T15:58:44.450Z'),
(2,10, 1, 2,  'ikele Samsung External SSD', '2025-03-25T15:58:44.450Z'),

(3,11, 1, 2,  'ikele Samsung Galaxy S24', '2025-03-25T15:58:44.450Z'),
(3,12, 1, 2,  'ikele Samsung Galaxy Tab S8', '2025-03-25T15:58:44.450Z'),
(3,13, 1, 2,  'ikele Samsung Galaxy Buds2', '2025-03-25T15:58:44.450Z'),
(3,14, 1, 2,  'ikele Samsung Samsung SmartWatch', '2025-03-25T15:58:44.450Z'),
(3,15, 1, 2,  'ikele Samsung QLED TV', '2025-03-25T15:58:44.450Z'),
(3,16, 1, 2,  'ikele Samsung Notebook', '2025-03-25T15:58:44.450Z'),
(3,17, 1, 2,  'ikele Samsung Soundbar', '2025-03-25T15:58:44.450Z'),
(3,18, 1, 2,  'ikele Samsung Monitor', '2025-03-25T15:58:44.450Z'),
(3,19, 1, 2,  'ikele Samsung Powerbank', '2025-03-25T15:58:44.450Z'),
(3,20, 1, 2,  'ikele Samsung External SSD', '2025-03-25T15:58:44.450Z'),

(4,21, 1, 2,  'ikele MacBook Air M2', '2025-03-25T15:58:44.450Z'),

(5,22, 1, 2,  'ikele betkas', '2025-03-25T15:58:44.450Z'),
(5,23, 1, 2,  'ikele Testo telefonas', '2025-03-25T15:58:44.450Z'),
(5,24, 1, 2,  'ikele Testo kompiuteris', '2025-03-25T15:58:44.450Z'),
(5,25, 1, 2,  'ikele Testo ausinės', '2025-03-25T15:58:44.450Z'),
(5,26, 1, 2,  'ikele Testo laikrodis', '2025-03-25T15:58:44.450Z'),

(5,27, 1, 2,  'ikele tikrinu', '2025-03-25T15:58:44.450Z'),





--komentarai

(3,1, 1, 6,  'sukure kometara', '2025-03-25T15:58:44.450Z'),
(4,1, 1, 6,  'sUKURE KOMETARA', '2025-01-25T15:58:44.450Z'),
(4,1, 1, 6,  'sUKURE KOMETARA', '2023-09-14T15:58:44.450Z'),
(5,1, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),

(3,2, 1, 6,  'sukure kometara', '2025-03-25T15:58:44.450Z'),
(4,2, 1, 6,  'sUKURE KOMETARA', '2025-01-25T15:58:44.450Z'),
(4,2, 1, 6,  'sUKURE KOMETARA', '2023-09-14T15:58:44.450Z'),
(5,2, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),

(3,3, 1, 6,  'sukure kometara', '2025-03-25T15:58:44.450Z'),
(4,3, 1, 6,  'sUKURE KOMETARA', '2025-01-25T15:58:44.450Z'),
(4,3, 1, 6,  'sUKURE KOMETARA', '2023-09-14T15:58:44.450Z'),
(5,3, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),

(3,4, 1, 6,  'sukure kometara', '2025-03-25T15:58:44.450Z'),
(4,4, 1, 6,  'sUKURE KOMETARA', '2025-01-25T15:58:44.450Z'),
(4,4, 1, 6,  'sUKURE KOMETARA', '2023-09-14T15:58:44.450Z'),
(5,4, 1, 6,  'sUKURE KOMETARA', '2020-01-25T15:58:44.450Z'),

--tikrinu 
(5,1, 1, 6,  'sUKURE KOMETARA', '2025-03-20T15:58:44.450Z'),
(2,27, 1, 6,  'sUKURE KOMETARA', '2025-03-19T15:58:44.450Z');


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
