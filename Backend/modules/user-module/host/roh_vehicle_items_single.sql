CREATE TABLE roh_vehicle_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_provider_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_ids TEXT, -- serialized IDs like '1,2,3,22'
    status TINYINT(1) DEFAULT 1, -- 1 = active, 0 = inactive
    item_status TINYINT(1) DEFAULT 1, -- 1 = approved, 0 = pending
    quantity_total INT DEFAULT 1,
    quantity_available INT DEFAULT 1,
    quantity_unavailable INT GENERATED ALWAYS AS (quantity_total - quantity_available) STORED,
    add_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    edit_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_views INT DEFAULT 0,
    security_deposit DECIMAL(10, 2),
    booking_terms TEXT,
    availability_status ENUM('Available', 'Unavailable', 'Booked') DEFAULT 'Available'
);

CREATE TABLE roh_vehicle_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL, -- Reference to roh_vehicle_details table
    category_id INT NOT NULL,
    tag_id INT NOT NULL,
    brand_id INT NOT NULL,
    model_id INT NOT NULL,
    engine_type ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG') DEFAULT 'Petrol',
    transmission_type ENUM('Manual', 'Automatic') DEFAULT 'Automatic',
    fuel_consumption DECIMAL(5, 2),
    seating_capacity INT DEFAULT 5,
    color VARCHAR(100),
    vehicle_age INT,
    mileage DECIMAL(10, 2),
    registration_number VARCHAR(255) UNIQUE,
    insurance_validity DATE,
    vehicle_type ENUM('Luxury', 'Economy', 'Standard') DEFAULT 'Standard',
    rental_period ENUM('Daily', 'Weekly', 'Monthly', 'Custom') DEFAULT 'Daily',
    vehicle_condition ENUM('New', 'Used', 'Refurbished') DEFAULT 'Used',
    accessories TEXT,
    location_details VARCHAR(255),
    booking_instructions TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES roh_vehicle_details(id),
);
