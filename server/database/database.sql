INSERT INTO "users" (username, email, image_url, description, contacts) VALUES
('Pavel gusev', 'pavel.gusev431@gmail.com', 'https://c8.alamy.com/zooms/9/305f98cf4d084cefbe7d506128e11ecb/pxx5p8.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('Vardenis Vardenis', 'vardenis@gmail.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-gxW7tUW_zWRnuZbcfV35ypZZvBoRbKZrA&s', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('pavardenis Vardenis', 'pavardenis@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words', 'Konstutucijos 45, Vilnius'),
('trending', 'trending@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg', 'text text write here more 5 words',  'Konstutucijos 45, Vilnius'),
('bestnew', 'bestnew@gmail.com', 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',  'text text write here more 5 words', 'Konstutucijos 45, Vilnius');


INSERT INTO products (user_id,category_id, subcategory_id, name, price, description, image_url, amount_in_stock, "createdAt", "updatedAt")
VALUES
-- Pavel Gusev
(2, 1, 1, 'iPhone 15 Pro', 1299.00, 'Naujausias Apple telefonas', 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png', 50, '2025-02-26 09:00:00', '2025-03-01 09:00:00'),
(2, 1, 2, 'MacBook Air M2', 2399.00, 'testas', 'https://techcrunch.com/wp-content/uploads/2022/07/CMC_1580.jpg', 30, '2025-02-27 10:30:00', '2025-03-02 10:30:00'),
(2, 1, 3, 'AirPods Pro', 799.00, 'Aukštos kokybės Apple ausinės', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/a/i/airpods_4_pdp_image_position_2__wwen.jpg', 40, '2025-02-28 11:45:00', '2025-03-03 11:45:00'),
(2, 1, 4, 'Apple Watch Series 8', 1099.00, 'Išmanusis laikrodis su naujomis funkcijomis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEI1ZxzdYj2i4XKe7nExt_GipGBGq31mvSw&s', 25, '2025-03-01 12:15:00', '2025-03-03 12:15:00'),
(2, 1, 2, 'iPad Pro 12.9"', 1599.00, 'Naujausias Apple planšetinis kompiuteris', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-ipad-pro-12-wificell-spacegray-2021?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1674663709258', 20, '2025-03-02 13:30:00', '2025-03-04 13:30:00'),
(2, 1, 5, 'Apple TV 4K', 1799.00, 'Streamingo įrenginys su 4K vaizdo kokybe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITvFPp3DQ4ngX545DXjxiIyAeRB0sHptwDQ&s', 15, '2025-03-02 14:00:00', '2025-03-04 14:00:00'),
(2, 1, 3, 'Beats Studio3 Wireless', 899.00, 'Beats ausinės su triukšmo slopinimu', 'https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/m/q/mqtp3-beats-pro-black-4.jpeg', 50, '2025-03-03 15:15:00', '2025-03-04 15:15:00'),
(2, 1, 1, 'Apple Magic Mouse', 699.00, 'Ergonomiška Apple pelė', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK63?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1730508287136', 30, '2025-03-04 16:30:00', '2025-03-05 16:30:00'),
(2, 1, 1, 'Apple Keyboard', 999.00, 'Elegantiška Apple klaviatūra', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdHj0aRrA7hlxfiXu8SQEuNLxWyxed2i_Vg&s', 40, '2025-03-05 17:45:00', '2025-03-06 17:45:00'),
(2, 1, 1, 'iPhone 14 Pro', 1199.00, 'Ankstesnis modelis, vis dar puikus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8lvCIRMAbJ0RuaeQP74f90i8dQR-IMqXDA&s', 60, '2025-03-06 18:00:00', '2025-03-07 18:00:00'),

-- Vardenis Vardenis
(3, 1, 1, 'Samsung Galaxy S24', 999.00, 'Galingas Samsung flagmanas', 'https://kainos-img.dgn.lt/photos2_25_268648490/img.jpg', 30, '2025-03-04 09:00:00', '2025-03-06 09:00:00'),
(3, 1, 1, 'Samsung Galaxy Tab S8', 849.00, 'Samsung planšetinis kompiuteris', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoK3wn3Ep9Yx3evtt8QWedwsnH8vRTo3dsmA&s', 50, '2025-03-05 10:30:00', '2025-03-07 10:30:00'),
(3, 1, 3, 'Samsung Galaxy Buds2', 399.00, 'Komfortiškos ausinės su aktyviu triukšmo slopinimu', 'https://static1.xdaimages.com/wordpress/wp-content/uploads/2022/11/Samsung-Galaxy-Buds-2-Pro-in-Bora-Purple-colorway.jpeg', 40, '2025-03-06 11:45:00', '2025-03-08 11:45:00'),
(3, 1, 4, 'Samsung SmartWatch', 799.00, 'Išmanusis laikrodis su nuotolinio valdymo funkcija', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTub11bCaWROg6b5mQZi4N07UIjp4ysfTHflQ&s', 35, '2025-03-07 12:15:00', '2025-03-09 12:15:00'),
(3, 1, 5, 'Samsung QLED TV', 1499.00, 'Aukštos kokybės televizorius su QLED technologija', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdWRF198EPZdgUmuQ1R0aI136jgMZ0x7xmA&s', 45, '2025-03-08 13:30:00', '2025-03-10 13:30:00'),
(3, 1, 2, 'Samsung Notebook', 1099.00, 'Galingas nešiojamas kompiuteris', 'https://preview.redd.it/screen-size-comparison-between-2022-14-6-samsung-galaxy-tab-v0-pzbjjkac5h4c1.jpg?width=640&crop=smart&auto=webp&s=cffae25cba9d6756f3b5d21db3d38c69189e5ebb', 40, '2025-03-09 14:45:00', '2025-03-11 14:45:00'),
(3, 1, 3, 'Samsung Soundbar', 799.00, 'Garsinė juosta su aukšta garso kokybe', 'https://www.telia.lt/medias/garso-sistema-lg-s95tr.jpg?context=bWFzdGVyfHJvb3R8MTIyMjR8aW1hZ2UvanBlZ3xoYjIvaDg4LzEzMjg0MDc5OTYwMDk0LmpwZ3w5ZGYyZjkxZjRhOWMxNzQ2NzFiZDExMTQwNGViY2FkZGY0NjdmYzkzYmI0ZmNlNjFhZmM1OWQ3ZjJlYTcwZjdl', 60, '2025-03-10 15:15:00', '2025-03-12 15:15:00'),
(3, 1, 2, 'Samsung Monitor', 599.00, 'Didelis ekranas su 4K raiška', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Xk9-82MPIO_iMgGBjAmk09WWWFXeqZxFqQ&s', 50, '2025-03-11 16:00:00', '2025-03-13 16:00:00'),
(3, 1, 1, 'Samsung Powerbank', 249.00, 'Nešiojamas įkroviklis', 'https://www.varle.lt/static/uploads/products/496/sam/samsung-eb-u3300xjegeu-nesiojamasis-ikroviklis_UgzXRJC.jpg', 70, '2025-03-12 17:00:00', '2025-03-14 17:00:00'),
(3, 1, 1, 'Samsung External SSD', 459.00, 'Greitas išorinis SSD diskas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7DWLxqQhqoAicUNO0RWMdCuOSvP2OVrplA&s', 30, '2025-03-13 18:00:00', '2025-03-15 18:00:00'),

-- testas
(4, 1, 2, 'MacBook Air M2', 2399.00, 'testas', 'https://bgr.com/wp-content/uploads/2022/06/MacBook-Air-M2.jpg?quality=82&strip=all&w=1020&h=574&crop=1', 30, '2025-03-14 09:00:00', '2025-03-16 09:00:00'),
(5, 1, 5, 'betkas', 15, 'testuoju', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5BiA2UWH55YtwpfFZHQE_y6t45_x8BttMCA&s', 20, '2025-03-14 10:00:00', '2025-03-16 10:00:00'),
(5, 1, 1, 'Testo telefonas', 399.99, 'Tai tik testinis telefonas', 'https://picfit.topocentras.lt/xcdn-cgi/image/fit=contain,format=auto,width=300,quality=85/media/catalog/product/f/i/file_720555_1737852227.jpg', 10, '2025-03-14 11:00:00', '2025-03-16 11:00:00'),
(5, 1, 2, 'Testo kompiuteris', 499.99, 'Testo kompiuteris su labai gera kaina', 'https://ai-techreport.com/wp-content/uploads/2024/07/converted_image-39-1.webp', 5, '2025-03-14 12:00:00', '2025-03-16 12:00:00'),
(5, 1, 3, 'Testo ausinės', 199.99, 'Testinės ausinės', 'https://priedai.lt/e/media/catalog/product/cache/1/small_image/252x252/9df78eab33525d08d6e5fb8d27136e95/a/p/apple-earpods-originaiosl-iphone-ipad-ipod-ausines.jpg', 15, '2025-03-14 13:00:00', '2025-03-16 13:00:00'),
(5, 1, 4, 'Testo laikrodis', 249.99, 'Testinis laikrodis su visomis funkcijomis', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkACTKQ8DQXViZSKoBQe0aDFrGfrnc34H1ww&s', 8, '2025-03-14 14:00:00', '2025-03-16 14:00:00'),
(5, 1, 5, 'Tikrinu ar veikia data', 249, 'tikrinu', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYlODcqSHiGaEh6eLqV-nH8wxlHLoMPsP8eg&s', 8, '2025-03-14 15:00:00', '2025-03-16 15:00:00');
 
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
(4,1, 1, 6,  'sUKURE KOMETARA', '2025-01-25T16:28:44.450Z'),
(4,1, 1, 6,  'sUKURE KOMETARA', '2023-09-14T17:18:44.450Z'),
(5,1, 1, 6,  'sUKURE KOMETARA', '2020-01-25T18:48:44.450Z'),
 
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
(5,1, 1, 6,  'sUKURE KOMETARA', '2025-02-20T15:58:44.450Z'),
(2,27, 1, 6,  'sUKURE KOMETARA', '2025-03-19T15:58:44.450Z'),
(2,27, 1, 6,  'sUKURE KOMETARA', '2025-04-07T10:11:44.450Z');
 
 
 
 
INSERT INTO "ratings" (user_id, product_id, comment, stars, image_url)
VALUES
(3, 1, 'Puikus telefonas, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 1, 'Puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 1, 'puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(5, 1, 'puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
 
(3, 2, 'Puikus telefonas, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 2, 'Puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 2, 'puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(5, 2, 'puikus telefonas, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(3, 3, 'Puikios ausines, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 3, 'Puikios ausines, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 3, 'Puikios ausines, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(5, 3, 'Puikios ausines, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
(3, 4, 'Puikios laikrodis, labai rekomenduoju!', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 4, 'Puikios laikrodis, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(4, 4, 'puikus laikrodis, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(5, 4, 'Puikus laikrodis, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
 
--tikrinu
(5, 1, 'blogas telefonas, ', 1, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 27, 'Puikus laikrodis, ', 5, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png'),
(2, 27, 'labai prastas laikrodis, ', 1, 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_640.png');

