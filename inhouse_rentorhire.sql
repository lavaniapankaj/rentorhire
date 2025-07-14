-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 14, 2025 at 04:08 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inhouse_rentorhire`
--

-- --------------------------------------------------------

--
-- Table structure for table `roh_categories`
--

CREATE TABLE `roh_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `slug` varchar(255) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `add_id` bigint(11) DEFAULT NULL,
  `edit_id` bigint(11) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roh_categories`
--

INSERT INTO `roh_categories` (`id`, `name`, `description`, `slug`, `parent_category_id`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(18, 'Electronics', 'Gadgets and devices for communication, work, and entertainment including phones, laptops, headphones, and smart accessories', 'electronics', NULL, 1, 1, 1, '2025-07-08 15:38:36', '2025-07-08 15:38:36'),
(19, 'Mobile Phones', 'Gadgets and devices for communication, work, and entertainment including phones, laptops, headphones, and smart accessories', 'mobile-phones', 18, 1, 1, 1, '2025-07-08 15:39:13', '2025-07-08 15:39:13'),
(22, 'Laptops', 'Gadgets and devices for communication, work, and entertainment including phones, laptops, headphones, and smart accessories', 'laptops', 18, 1, 1, 1, '2025-07-08 15:39:46', '2025-07-08 15:39:55'),
(23, 'Accessories', 'Gadgets and devices for communication, work, and entertainment including phones, laptops, headphones, and smart accessories', 'accessories', 18, 1, 1, 1, '2025-07-08 15:40:09', '2025-07-08 15:40:23'),
(24, 'Real Estate', 'Property listings for buying, selling, or renting houses, offices, and land in different cities and budgets', 'real-estate', NULL, 1, 1, 1, '2025-07-08 15:41:05', '2025-07-08 15:41:05'),
(25, 'Residential', 'Property listings for buying, selling, or renting houses, offices, and land in different cities and budgets', 'residential', 24, 1, 1, 1, '2025-07-08 15:41:45', '2025-07-08 15:41:45'),
(26, 'Commercial', 'Property listings for buying, selling, or renting houses, offices, and land in different cities and budgets', 'commercial', 24, 1, 1, 1, '2025-07-08 15:42:01', '2025-07-08 15:42:01');

-- --------------------------------------------------------

--
-- Table structure for table `roh_cities`
--

CREATE TABLE `roh_cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `city_slug` varchar(150) NOT NULL,
  `state_id` int(11) NOT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `add_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `edit_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roh_cities`
--

INSERT INTO `roh_cities` (`city_id`, `city_name`, `city_slug`, `state_id`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(16, 'Mumbai', 'mumbai', 31, 1, 1, 1, '2025-07-08 21:02:41', '2025-07-08 21:02:41'),
(17, 'Pune', 'pune', 31, 1, 1, 1, '2025-07-08 21:02:53', '2025-07-08 21:02:53'),
(18, 'Lucknow', 'lucknow', 32, 1, 1, 1, '2025-07-08 21:03:09', '2025-07-08 21:03:09'),
(19, 'Varanasi', 'varanasi', 32, 1, 1, 1, '2025-07-08 21:03:19', '2025-07-08 21:03:19'),
(20, 'Chennai', 'chennai', 33, 1, 1, 1, '2025-07-08 21:03:29', '2025-07-08 21:03:29'),
(21, 'Coimbatore', 'coimbatore', 33, 1, 1, 1, '2025-07-08 21:03:45', '2025-07-08 21:03:45'),
(22, 'Jaipur', 'jaipur', 34, 1, 1, 1, '2025-07-08 21:04:06', '2025-07-08 21:04:06'),
(23, 'Udaipur', 'udaipur', 34, 1, 1, 1, '2025-07-08 21:04:20', '2025-07-08 21:04:20'),
(24, 'Kolkata', 'kolkata', 35, 1, 1, 1, '2025-07-08 21:04:35', '2025-07-08 21:04:35'),
(25, 'Darjeeling', 'darjeeling', 35, 1, 1, 1, '2025-07-08 21:04:45', '2025-07-08 21:04:45'),
(26, 'Ahmedabad', 'ahmedabad', 36, 1, 1, 1, '2025-07-08 21:05:39', '2025-07-08 21:05:39'),
(27, 'Surat', 'surat', 36, 1, 1, 1, '2025-07-08 21:05:48', '2025-07-08 21:05:48');

-- --------------------------------------------------------

--
-- Table structure for table `roh_roles`
--

CREATE TABLE `roh_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `add_id` bigint(20) DEFAULT NULL,
  `edit_id` bigint(20) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roh_roles`
--

INSERT INTO `roh_roles` (`id`, `name`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'Super Admin', 1, 1, 1, '2025-07-08 15:46:30', '2025-07-08 15:46:30'),
(2, 'Service Provider', 1, 1, 1, '2025-07-08 15:46:55', '2025-07-08 15:46:55');

-- --------------------------------------------------------

--
-- Table structure for table `roh_routes`
--

CREATE TABLE `roh_routes` (
  `id` int(11) NOT NULL,
  `route_name` varchar(255) NOT NULL,
  `access_type` varchar(100) DEFAULT NULL,
  `route_type` varchar(100) DEFAULT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `add_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `edit_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roh_routes`
--

INSERT INTO `roh_routes` (`id`, `route_name`, `access_type`, `route_type`, `group_name`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(12, 'route/create', 'admin', 'user', 'Route Create', 1, 1, 1, '2025-07-08 21:32:01', '2025-07-08 21:32:01');

-- --------------------------------------------------------

--
-- Table structure for table `roh_states`
--

CREATE TABLE `roh_states` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `state_slug` varchar(150) NOT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `add_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `edit_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roh_states`
--

INSERT INTO `roh_states` (`state_id`, `state_name`, `state_slug`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(31, 'Maharashtra', 'maharashtra', 1, 1, 1, '2025-07-08 20:55:42', '2025-07-08 20:55:42'),
(32, 'Uttar Pradesh', 'uttar-pradesh', 1, 1, 1, '2025-07-08 20:56:10', '2025-07-08 20:56:10'),
(33, 'Tamil Nadu', 'tamil-nadu', 1, 1, 1, '2025-07-08 21:00:31', '2025-07-08 21:00:31'),
(34, 'Rajasthan', 'rajasthan', 1, 1, 1, '2025-07-08 21:01:34', '2025-07-08 21:01:34'),
(35, 'West Bengal', 'west-bengal', 1, 1, 1, '2025-07-08 21:01:53', '2025-07-08 21:01:53'),
(36, 'Gujarat', 'gujarat', 1, 1, 1, '2025-07-08 21:05:25', '2025-07-08 21:05:25');

-- --------------------------------------------------------

--
-- Table structure for table `roh_users`
--

CREATE TABLE `roh_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `address_1` varchar(100) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roh_users`
--

INSERT INTO `roh_users` (`user_id`, `user_name`, `first_name`, `last_name`, `email`, `phone_number`, `password_hash`, `user_role_id`, `profile_picture_url`, `address_1`, `landmark`, `state`, `city`, `pincode`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'Super Admin', 'Super', 'Admin', 'superadmin@gmail.com', '9012345678', '$2b$10$YhI9dGj19YmLXSNgvxKUceXULmW74mEN0xjqE/Catk/Rz4eiS0Tz.', 1, '', 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, NULL, 1, '2025-07-13 11:26:08', '2025-07-13 11:26:30'),
(2, 'Service Provider', 'Service', 'Provider', 'serviceprovider@gmail.com', '9012345678', '$2b$10$iMm05yN3cv8uFqD.ZxxMi.N4pgIXJ5LsHLaEJhPs6/EcVYjAXEoHW', 2, '', 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, NULL, 1, '2025-07-13 11:27:31', '2025-07-13 11:27:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roh_categories`
--
ALTER TABLE `roh_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `roh_cities`
--
ALTER TABLE `roh_cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `roh_roles`
--
ALTER TABLE `roh_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roh_routes`
--
ALTER TABLE `roh_routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roh_states`
--
ALTER TABLE `roh_states`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `roh_users`
--
ALTER TABLE `roh_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roh_categories`
--
ALTER TABLE `roh_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `roh_cities`
--
ALTER TABLE `roh_cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `roh_roles`
--
ALTER TABLE `roh_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roh_routes`
--
ALTER TABLE `roh_routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roh_states`
--
ALTER TABLE `roh_states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
