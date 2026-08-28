-- ╔══════════════════════════════════════════════════════════════╗
-- ║  KVS RENTAL SHOP — MySQL Database Schema                   ║
-- ║  Run this file to create all tables:                        ║
-- ║    mysql -u root -p < schema.sql                            ║
-- ╚══════════════════════════════════════════════════════════════╝

CREATE DATABASE IF NOT EXISTS kvs_rental
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kvs_rental;

-- ─── Users (for auth) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('admin','staff') DEFAULT 'staff',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Customers ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(150) NOT NULL,
  phone          VARCHAR(20)  NOT NULL,
  email          VARCHAR(150) DEFAULT NULL,
  area           VARCHAR(200) DEFAULT NULL,
  id_proof_type  VARCHAR(50)  DEFAULT NULL,
  id_proof_num   VARCHAR(100) DEFAULT NULL,
  notes          TEXT         DEFAULT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Inventory ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  item_code     VARCHAR(30)   NOT NULL UNIQUE,
  name          VARCHAR(200)  NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  total_qty     INT           NOT NULL DEFAULT 0,
  available_qty INT           NOT NULL DEFAULT 0,
  rent_rate     DECIMAL(10,2) NOT NULL DEFAULT 0,
  damage_charge DECIMAL(10,2) DEFAULT 0,
  description   TEXT          DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Orders ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  order_code      VARCHAR(20)   NOT NULL UNIQUE,
  customer_id     INT           NOT NULL,
  rental_start    DATE          NOT NULL,
  rental_end      DATE          NOT NULL,
  actual_return   DATE          DEFAULT NULL,
  subtotal        DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount        DECIMAL(10,2) DEFAULT 0,
  damage_charges  DECIMAL(10,2) DEFAULT 0,
  total           DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid            DECIMAL(10,2) DEFAULT 0,
  status          ENUM('active','overdue','returned','cancelled') DEFAULT 'active',
  notes           TEXT          DEFAULT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);

-- ─── Order Items ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_id      INT           NOT NULL,
  inventory_id  INT           NOT NULL,
  quantity      INT           NOT NULL DEFAULT 1,
  rate          DECIMAL(10,2) NOT NULL DEFAULT 0,
  returned_qty  INT           DEFAULT 0,
  damage_qty    INT           DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id)     REFERENCES orders(id)     ON DELETE CASCADE,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)   ON DELETE RESTRICT
);

-- ─── Payments ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_id      INT           NOT NULL,
  amount        DECIMAL(10,2) NOT NULL,
  payment_type  ENUM('advance','partial','final','deposit','refund') DEFAULT 'advance',
  method        ENUM('cash','upi','card','bank_transfer','other')    DEFAULT 'cash',
  reference     VARCHAR(200)  DEFAULT NULL,
  notes         TEXT          DEFAULT NULL,
  paid_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ─── Tent Bookings ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tent_bookings (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  order_id        INT           DEFAULT NULL,
  event_name      VARCHAR(200)  NOT NULL,
  customer_name   VARCHAR(150)  NOT NULL,
  phone           VARCHAR(20)   DEFAULT NULL,
  event_date      DATE          NOT NULL,
  event_end_date  DATE          DEFAULT NULL,
  venue           VARCHAR(300)  DEFAULT NULL,
  equipment       TEXT          DEFAULT NULL,
  total_amount    DECIMAL(10,2) DEFAULT 0,
  status          ENUM('confirmed','pending','cancelled') DEFAULT 'pending',
  notes           TEXT          DEFAULT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- ─── Seed Data ───────────────────────────────────────────────

-- Default admin (password: admin123 — change immediately!)
-- bcrypt hash for 'admin123'
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin', 'admin@kvsrental.com', '$2b$10$8K1p/ZQjGSHYV2aVXRb1oO5Y1Xy3aHx6QvKg8Z8V5C2dB3eT4fK6a', 'admin')
ON DUPLICATE KEY UPDATE email = email;

-- Sample inventory
INSERT INTO inventory (item_code, name, category, total_qty, available_qty, rent_rate, damage_charge) VALUES
  ('CH-001', 'Plastic Chair',             'Seating',        400, 200, 15,   200),
  ('CH-002', 'Steel Folding Chair',       'Seating',        200, 150, 25,   350),
  ('TB-001', 'Round Table (8-seat)',       'Tables',          50,  35, 200, 2000),
  ('TB-002', 'Rectangular Table (6-seat)', 'Tables',          40,  30, 180, 1800),
  ('PL-001', 'Steel Dinner Plate',         'Utensils',       500, 270, 8,    50),
  ('PL-002', 'Banana Leaf Plate (Bio)',    'Utensils',      1000, 800, 3,    5),
  ('GL-001', 'Steel Tumbler',              'Utensils',       400, 250, 5,    40),
  ('GL-002', 'Glass Tumbler',              'Utensils',       300, 200, 5,    60),
  ('SP-001', 'Serving Spoon',              'Utensils',       200, 120, 10,   80),
  ('SP-002', 'Ladle',                      'Utensils',       100,  80, 10,   80),
  ('CV-001', 'Steel Cooking Vessel (20L)', 'Cooking',         30,  26, 300, 3000),
  ('CV-002', 'Steel Cooking Vessel (10L)', 'Cooking',         25,  22, 200, 2000),
  ('TN-001', 'Marquee Tent (20x30 ft)',    'Tents & Stages',  10,   8, 3000, 15000),
  ('TN-002', 'Canopy Tent (10x10 ft)',     'Tents & Stages',  15,  12, 1500, 7000),
  ('ST-001', 'Portable Stage (8x4 ft)',    'Tents & Stages',   8,   6, 2000, 10000),
  ('LT-001', 'LED Light Set (20 bulbs)',   'Lighting',        20,  18, 500,  3000)
ON DUPLICATE KEY UPDATE name = name;

-- Sample customers
INSERT INTO customers (name, phone, area, id_proof_type, id_proof_num) VALUES
  ('Murugan Selvaraj', '+91 98421 33456', 'K.K. Nagar, Madurai',  'Aadhaar', '1234-5678-9012'),
  ('Priya Ramesh',     '+91 90477 22110', 'Anna Nagar, Madurai',  'Aadhaar', '2345-6789-0123'),
  ('Karthik Events',   '+91 98765 41230', 'Simmakkal, Madurai',   'GSTIN',   '33AAAA0001A1Z5'),
  ('Lakshmi Devi',     '+91 91502 87744', 'Villapuram, Madurai',  'Aadhaar', '3456-7890-1234'),
  ('Suresh Kumar',     '+91 89400 12233', 'Goripalayam, Madurai', 'Aadhaar', '4567-8901-2345')
ON DUPLICATE KEY UPDATE name = name;

-- Sample orders
INSERT INTO orders (order_code, customer_id, rental_start, rental_end, subtotal, total, paid, status) VALUES
  ('ORD-0001', 2, '2026-08-26', '2026-08-30', 1850, 1850, 1850, 'active'),
  ('ORD-0002', 1, '2026-08-18', '2026-08-25', 1400, 1400, 1000, 'overdue'),
  ('ORD-0003', 3, '2026-08-31', '2026-09-03', 14800, 14800, 10000, 'active'),
  ('ORD-0004', 4, '2026-08-08', '2026-08-13', 600, 600, 600, 'returned'),
  ('ORD-0005', 5, '2026-08-22', '2026-08-27', 1950, 1950, 1000, 'overdue')
ON DUPLICATE KEY UPDATE order_code = order_code;

-- Sample order items
INSERT INTO order_items (order_id, inventory_id, quantity, rate, returned_qty) VALUES
  (1, 1, 20, 15, 0),
  (1, 5, 30, 8, 0),
  (2, 1, 10, 15, 0),
  (2, 7, 15, 5, 0),
  (3, 13, 2, 3000, 0),
  (3, 3, 5, 200, 0),
  (4, 1, 10, 15, 10),
  (4, 5, 20, 8, 20),
  (5, 1, 15, 15, 0),
  (5, 9, 10, 10, 0);

-- Sample payments
INSERT INTO payments (order_id, amount, payment_type, method, paid_at) VALUES
  (3, 10000, 'advance', 'upi', '2026-08-31 10:00:00'),
  (1, 1850,  'final',   'cash', '2026-08-26 14:30:00'),
  (4, 600,   'final',   'cash', '2026-08-08 09:00:00'),
  (2, 400,   'advance', 'cash', '2026-08-18 11:00:00'),
  (5, 500,   'advance', 'upi', '2026-08-22 16:00:00'),
  (5, 500,   'partial', 'cash', '2026-08-25 10:00:00');

-- Sample tent bookings
INSERT INTO tent_bookings (order_id, event_name, customer_name, phone, event_date, event_end_date, venue, equipment, total_amount, status) VALUES
  (3, 'Krishna Wedding Reception', 'Karthik Events', '+91 98765 41230', '2026-08-31', '2026-09-03', 'MGR Mahal, Madurai', 'Marquee Tent (20x30 ft) x 2, Round Table x 5, Stage x 1', 14800, 'confirmed');
