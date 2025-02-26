CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "contacts" VARCHAR(255) NOT NULL,
    "image_url" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_secrets" (
    "userid" INTEGER PRIMARY KEY,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "balance" BIGINT NOT NULL,
    FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "subcategories" (
    "id" SERIAL PRIMARY KEY,
    "category_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "amount_in_stock" BIGINT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "ratings" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" SMALLINT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    "image_url" TEXT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "transaction_records" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration" TIMESTAMP WITH TIME ZONE NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE
);

-- FIX: Create "event_types" and "event_targets" BEFORE "events"
CREATE TABLE IF NOT EXISTS "event_types" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "event_targets" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "events" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("type_id") REFERENCES "event_types"("id") ON DELETE CASCADE,
    FOREIGN KEY ("target_id") REFERENCES "event_targets"("id") ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_products_user_id ON products("user_id");
CREATE INDEX idx_products_subcategory_id ON products("subcategory_id");
CREATE INDEX idx_ratings_product_id ON ratings("product_id");
CREATE INDEX idx_transaction_records_user_id ON transaction_records("user_id");
CREATE INDEX idx_transaction_records_product_id ON transaction_records("product_id");

-- Insert Categories
INSERT INTO "categories" ("name") VALUES 
('Electronics'),
('Fashion & Apparel'),
('Home & Furniture'),
('Health & Beauty'),
('Sports & Outdoors'),
('Toys & Games'),
('Automotive'),
('Books & Media'),
('Groceries & Food'),
('Office & School Supplies');

-- Insert Subcategories
INSERT INTO "subcategories" ("category_id", "name") VALUES
-- Electronics
(1, 'Smartphones & Accessories'),
(1, 'Computers & Laptops'),
(1, 'Audio & Headphones'),
(1, 'Wearable Tech'),
(1, 'Home Electronics'),

-- Fashion & Apparel
(2, 'Men’s Clothing'),
(2, 'Women’s Clothing'),
(2, 'Shoes & Footwear'),
(2, 'Accessories'),
(2, 'Jewelry'),

-- Home & Furniture
(3, 'Living Room Furniture'),
(3, 'Bedroom Furniture'),
(3, 'Kitchen & Dining'),
(3, 'Home Décor'),
(3, 'Lighting'),

-- Health & Beauty
(4, 'Skincare'),
(4, 'Haircare'),
(4, 'Makeup'),
(4, 'Personal Care'),
(4, 'Fitness & Nutrition'),

-- Sports & Outdoors
(5, 'Exercise Equipment'),
(5, 'Outdoor Gear'),
(5, 'Sports Apparel'),
(5, 'Team Sports'),
(5, 'Bicycles & Accessories'),

-- Toys & Games
(6, 'Action Figures & Collectibles'),
(6, 'Board Games & Puzzles'),
(6, 'Video Games & Consoles'),
(6, 'Educational Toys'),
(6, 'Dolls & Plush Toys'),

-- Automotive
(7, 'Car Accessories'),
(7, 'Motorcycle Gear'),
(7, 'Car Parts'),
(7, 'Tools & Equipment'),
(7, 'Tires & Wheels'),

-- Books & Media
(8, 'Fiction Books'),
(8, 'Non-Fiction Books'),
(8, 'Textbooks & Educational'),
(8, 'Music & Vinyl'),
(8, 'Movies & TV Shows'),

-- Groceries & Food
(9, 'Snacks & Beverages'),
(9, 'Fresh Produce'),
(9, 'Pantry Staples'),
(9, 'Frozen & Dairy'),
(9, 'Health & Organic Foods'),

-- Office & School Supplies
(10, 'Writing & Stationery'),
(10, 'Office Furniture'),
(10, 'Computer Accessories'),
(10, 'Organization & Storage'),
(10, 'Printing & Paper');

-- Insert Event Types
INSERT INTO "event_types" ("name") VALUES 
('created'),
('updated'),
('deleted'),
('banned'),
('viewed'),
('expired'),
('cancelled'),
('executed');

-- Insert Event Targets
INSERT INTO "event_targets" ("name") VALUES 
('user'),
('product'),
('transaction'),
('category'),
('subcategory'),
('rating');

