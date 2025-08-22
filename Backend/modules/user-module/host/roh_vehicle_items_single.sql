CREATE TABLE roh_vehicle_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_provider_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    vehicle_description TEXT,
    category_id INT NOT NULL,
    tag_id INT NOT NULL,
    brand_id INT NOT NULL,
    model_id INT NOT NULL,
    image_ids TEXT, -- serialized IDs like '1,2,3,22'
    price_per_day DECIMAL(10, 2),
    price_per_week DECIMAL(10, 2),
    price_per_month DECIMAL(10, 2),
    price_custom_day DECIMAL(10, 2),
    item_status TINYINT(1) DEFAULT 1, -- 1 = active, 0 = inactive
    admin_item_status TINYINT(1) DEFAULT 1, -- 1 = approved, 0 = pending
    total_views INT DEFAULT 0,
    security_deposit DECIMAL(10, 2),
    booking_terms TEXT,
    availability_status ENUM('Available', 'Unavailable', 'Booked') DEFAULT 'Available',
    add_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    edit_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roh_vehicle_attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL, -- Reference to roh_vehicle_details table
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
    address_1 VARCHAR(255),
    landmark VARCHAR(255),
    item_state VARCHAR(100),
    city VARCHAR(100),
    pincode INT(11),
    booking_instructions TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES roh_vehicle_details(id)
);