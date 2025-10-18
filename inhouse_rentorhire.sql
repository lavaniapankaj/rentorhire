-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 18, 2025 at 03:01 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `roh_brands`
--

CREATE TABLE `roh_brands` (
  `id` int(11) NOT NULL,
  `brand_name` varchar(150) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `logo_media_id` int(10) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roh_brands`
--

INSERT INTO `roh_brands` (`id`, `brand_name`, `cat_id`, `logo_media_id`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'TATA', 2, 0, 1, 1, 1, '2025-08-19 14:30:53', '2025-08-19 14:30:53'),
(2, 'Suzuki', 2, 0, 1, 1, 1, '2025-08-19 14:30:53', '2025-08-19 14:30:53'),
(3, 'Mahindra', 2, 0, 1, 1, 1, '2025-08-19 14:30:53', '2025-08-19 14:30:53'),
(4, 'Volkswagen', 2, 0, 1, 1, 1, '2025-08-19 14:30:53', '2025-08-19 14:30:53'),
(5, 'BMW', 3, 1, 1, 1, 1, '2025-08-21 16:27:32', '2025-08-21 16:27:32'),
(6, 'Hyundai', 2, 1, 1, 1, 1, '2025-08-25 17:19:56', '2025-08-25 17:19:56'),
(7, 'Activa', 8, 1, 1, 1, 1, '2025-08-25 17:19:56', '2025-08-25 17:19:56');

-- --------------------------------------------------------

--
-- Table structure for table `roh_categories`
--

CREATE TABLE `roh_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `add_id` bigint(11) DEFAULT NULL,
  `edit_id` bigint(11) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roh_categories`
--

INSERT INTO `roh_categories` (`id`, `name`, `description`, `slug`, `parent_category_id`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'Vehicles', 'A broad category that includes all types of transport modes, such as cars, bikes, trucks, and recreational vehicles. Vehicles are essential for personal, commercial, and leisure travel, offering diverse options for different purposes, from daily commuting to long-distance journeys and business logistics.', 'vehicles', NULL, 1, 1, 1, '2025-08-05 17:11:45', '2025-09-22 06:34:08'),
(2, 'Cars', 'A wide range of vehicles for personal transportation, including various types like sedans, hatchbacks, and SUVs. Suitable for everyday commuting, family trips, and more.', 'cars', 1, 1, 1, 1, '2025-08-05 17:12:34', '2025-08-05 17:12:34'),
(3, 'Bikes', 'Includes motorcycles and bicycles for personal use, from high-speed sports bikes to commuter-friendly models. Ideal for short trips, daily commutes, or adventure riding.', 'bikes', 1, 1, 1, 1, '2025-08-05 17:12:53', '2025-08-05 17:12:53'),
(4, 'Commercial Vehicles', 'Vehicles designed for business purposes such as trucks, delivery vans, and buses. Used for transporting goods, passengers, or as part of a fleet for logistics and service industries.', 'commercial-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:28', '2025-08-05 17:13:28'),
(5, 'Luxury Vehicles', 'High-end cars and bikes offering exceptional comfort, performance, and design. Includes premium brands and models meant for those who seek an elite driving experience.', 'luxury-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:51', '2025-08-05 17:13:51'),
(6, 'Recreational Vehicles', 'Vehicles designed for leisure activities, including motorhomes, campervans, and RVs. Perfect for road trips, outdoor adventures, and extended vacations.', 'recreational-vehicles', 1, 1, 1, 1, '2025-08-05 17:14:11', '2025-08-05 17:14:11'),
(8, 'Scooters', 'A scooter or motor scooter, is a motorcycle with an underbone or step-through frame, a seat, a transmission that shifts without the operator having to operate a clutch lever, a platform for their feet, and with a method of operation that emphasizes comfort and fuel economy.\r\n', 'scooters', 1, 1, 1, 1, '2025-10-16 17:26:18', '2025-10-16 17:26:18');

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
  `active` tinyint(1) DEFAULT 1,
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_cities`
--

INSERT INTO `roh_cities` (`city_id`, `city_name`, `city_slug`, `state_id`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'Hyderabad', 'hyderabad', 1, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(2, 'Visakhapatnam', 'visakhapatnam', 1, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(3, 'Guwahati', 'guwahati', 2, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(4, 'Dibrugarh', 'dibrugarh', 2, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(5, 'Gaya', 'gaya', 3, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(6, 'Patna', 'patna', 3, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(7, 'Raipur', 'raipur', 4, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(8, 'Bilaspur', 'bilaspur', 4, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(9, 'Panaji', 'panaji', 5, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(10, 'Mapusa', 'mapusa', 5, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(11, 'Ahmedabad', 'ahmedabad', 6, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(12, 'Surat', 'surat', 6, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(13, 'Chandigarh', 'chandigarh', 7, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(14, 'Faridabad', 'faridabad', 7, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(15, 'Shimla', 'shimla', 8, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(16, 'Kullu', 'kullu', 8, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(17, 'Ranchi', 'ranchi', 9, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(18, 'Jamshedpur', 'jamshedpur', 9, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(19, 'Bangalore', 'bangalore', 10, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(20, 'Mysore', 'mysore', 10, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(21, 'Thiruvananthapuram', 'thiruvananthapuram', 11, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(22, 'Kochi', 'kochi', 11, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(23, 'Indore', 'indore', 12, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(24, 'Bhopal', 'bhopal', 12, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(25, 'Mumbai', 'mumbai', 13, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(26, 'Pune', 'pune', 13, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(27, 'Nagpur', 'nagpur', 14, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(28, 'Nashik', 'nashik', 14, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(29, 'Imphal', 'imphal', 15, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(30, 'Churachandpur', 'churachandpur', 15, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(31, 'Shillong', 'shillong', 16, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(32, 'Tura', 'tura', 16, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(33, 'Aizawl', 'aizawl', 17, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(34, 'Lunglei', 'lunglei', 17, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(35, 'Kohima', 'kohima', 18, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(36, 'Dimapur', 'dimapur', 18, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(37, 'Bhubaneswar', 'bhubaneswar', 19, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(38, 'Cuttack', 'cuttack', 19, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(39, 'Ludhiana', 'ludhiana', 20, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(40, 'Amritsar', 'amritsar', 20, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(41, 'Jaipur', 'jaipur', 21, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(42, 'Udaipur', 'udaipur', 21, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(43, 'Gangtok', 'gangtok', 22, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(44, 'Namchi', 'namchi', 22, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(45, 'Chennai', 'chennai', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(46, 'Coimbatore', 'coimbatore', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(47, 'Hyderabad', 'hyderabad', 24, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(48, 'Warangal', 'warangal', 24, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(49, 'Agartala', 'agartala', 25, 1, 1, 1, '2025-07-25 18:53:25', '2025-09-11 18:15:25'),
(50, 'Dhalai', 'dhalai', 25, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(51, 'Lucknow', 'lucknow', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(52, 'Kanpur', 'kanpur', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(53, 'Dehradun', 'dehradun', 27, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(54, 'Haridwar', 'haridwar', 27, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(55, 'Kolkata', 'kolkata', 28, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(56, 'Howrah', 'howrah', 28, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(57, 'Port Blair', 'port-blair', 29, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(58, 'Dwarka', 'dwarka', 30, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(59, 'Silvassa', 'silvassa', 31, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(60, 'Kavaratti', 'kavaratti', 32, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(61, 'New Delhi', 'new-delhi', 33, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(62, 'Puducherry', 'puducherry', 34, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(63, 'Vijayawada', 'vijayawada', 1, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(64, 'Kochi', 'kochi', 11, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(65, 'Vadodara', 'vadodara', 6, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(66, 'Bhubaneshwar', 'bhubaneswar', 19, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(67, 'Bihar Sharif', 'bihar-sharif', 3, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(68, 'Surat', 'surat', 6, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(69, 'Ranchi', 'ranchi', 9, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(70, 'Bhopal', 'bhopal', 12, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(71, 'Raipur', 'raipur', 4, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(72, 'Nagpur', 'nagpur', 14, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(73, 'Mysore', 'mysore', 10, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(74, 'Jamshedpur', 'jamshedpur', 9, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(75, 'Pune', 'pune', 13, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(76, 'Chandigarh', 'chandigarh', 7, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(77, 'Tiruchirappalli', 'tiruchirappalli', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(78, 'Meerut', 'meerut', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(79, 'Kochi', 'kochi', 11, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(80, 'Dhanbad', 'dhanbad', 9, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(81, 'Jalandhar', 'jalandhar', 20, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(82, 'Patiala', 'patiala', 20, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(83, 'Pondicherry', 'pondicherry', 34, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(84, 'Vellore', 'vellore', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(85, 'Noida', 'noida', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(86, 'Tirunelveli', 'tirunelveli', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(87, 'Aurangabad', 'aurangabad', 13, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(88, 'Erode', 'erode', 23, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(89, 'Bhubaneshwar', 'bhubaneswar', 19, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(90, 'Rajkot', 'rajkot', 6, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(91, 'Bhopal', 'bhopal', 12, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(92, 'Mangalore', 'mangalore', 10, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(93, 'Jammu', 'jammu', 8, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(94, 'Karnal', 'karnal', 7, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(95, 'Rajahmundry', 'rajahmundry', 1, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(96, 'Ambala', 'ambala', 7, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 23:40:34'),
(97, 'Agra', 'agra', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(98, 'Gurgaon', 'gurgaon', 26, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(99, 'Kochi', 'kochi', 11, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(100, 'Vishakhapatnam', 'vishakhapatnam', 1, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
(101, 'Demo', 'demo', 1, 1, 1, 0, '2025-07-26 00:17:20', '2025-07-26 01:18:58'),
(104, 'dfsdfs', 'dfsdfs', 1, 19, 19, 1, '2025-08-05 23:58:55', '2025-08-05 23:59:53'),
(105, 'delta', 'delta', 1, 1, 0, 0, '2025-09-11 18:15:45', '2025-09-11 18:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `roh_contact_us`
--

CREATE TABLE `roh_contact_us` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `email_status` enum('sent','failed') DEFAULT 'sent' COMMENT 'Email sending status',
  `ip_address` varchar(45) DEFAULT NULL COMMENT 'User IP (optional)',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roh_contact_us`
--

INSERT INTO `roh_contact_us` (`id`, `first_name`, `last_name`, `full_name`, `email`, `phone`, `subject`, `message`, `email_status`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, '', '', 'Vishnu Raj', 'vishnu@example.com', '9876543210', 'Vehicle Rental Support', 'Need assistance with my booking.', 'sent', '203.0.113.45', '2025-10-15 23:10:26', '2025-10-15 23:10:26'),
(2, '', '', 'Carissa Steele', 'boqesoda@mailinator.com', '3533833548', 'Payment or Billing', 'Exercitationem accus', 'sent', '157.48.93.55', '2025-10-16 00:04:43', '2025-10-16 00:04:43'),
(3, '', '', 'Billu ', 'rilujy@mailinator.com', '8095871619', 'Partnership / Business Inquiry', 'Adipisci culpa sit r', 'sent', '157.48.93.55', '2025-10-16 00:14:05', '2025-10-16 00:14:05'),
(4, '', '', 'Omar Goodwin', 'xyke@mailinator.com', '7669891215', 'List My Vehicle', 'Et nisi ad doloremqu', 'sent', '157.48.93.55', '2025-10-16 00:15:46', '2025-10-16 00:15:46'),
(5, '', '', 'David Mitchell', 'qidorile@mailinator.com', '1788027928', 'Payment or Billing', 'Aute adipisicing pos', 'sent', '157.48.93.55', '2025-10-16 00:23:08', '2025-10-16 00:23:08'),
(6, '', '', 'Alana Savage', 'kybitubak@mailinator.com', '1583422936', 'General Inquiry', 'Cupiditate qui eum q', 'sent', '157.48.93.55', '2025-10-16 00:23:54', '2025-10-16 00:23:54'),
(7, NULL, NULL, 'Brody Gilliam', 'hyfuda@mailinator.com', '6117799159', 'Partnership / Business Inquiry', 'Perferendis aut repe', 'sent', '157.48.93.202', '2025-10-18 05:57:35', '2025-10-18 05:57:35');

-- --------------------------------------------------------

--
-- Table structure for table `roh_faqs`
--

CREATE TABLE `roh_faqs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `cate_id` int(11) DEFAULT NULL COMMENT 'Category ID (no FK)',
  `add_id` int(11) DEFAULT NULL COMMENT 'User ID who added',
  `edit_id` int(11) DEFAULT NULL COMMENT 'User ID who last edited',
  `active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active, 0=Inactive',
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_faqs`
--

INSERT INTO `roh_faqs` (`id`, `title`, `description`, `cate_id`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(5, 'What documents are required to rent a vehicle?', 'You’ll need to provide a valid government-issued ID, a driving license, and a security deposit (if applicable). International customers must also show a valid passport and international driving permit.', 1, 1, 1, 1, '2025-10-15 22:01:39', '2025-10-15 22:48:16'),
(6, 'Can I extend my vehicle rental period?', 'Yes, you can easily extend your rental duration through your account dashboard or by contacting our support team. Extensions are subject to vehicle availability and applicable daily rates.', 1, 1, NULL, 1, '2025-10-15 22:02:00', '2025-10-15 22:02:00'),
(7, 'Is fuel included in the vehicle rental price?', 'Fuel is not included in the rental price. You’ll receive the vehicle with a full tank and must return it in the same condition. Any shortage will be charged at the prevailing fuel rate.', 1, 1, NULL, 1, '2025-10-15 22:02:26', '2025-10-15 22:02:26'),
(8, 'Can I rent a car without a driver?', 'Yes, you can rent a car for self-drive. You’ll need to provide a valid driving license, ID proof, and security deposit before pickup.', 2, 1, NULL, 1, '2025-10-15 22:03:20', '2025-10-15 22:03:20'),
(9, 'Is fuel included in the car rental price?', 'Fuel is not included in the rental cost. You’ll receive the car with a full tank and are expected to return it with the same level of fuel.', 2, 1, NULL, 1, '2025-10-15 22:03:41', '2025-10-15 22:03:41'),
(10, 'What happens if I return the car late?', 'Late returns beyond the scheduled time will incur additional charges per hour. We recommend informing us in advance to avoid penalties.', 2, 1, NULL, 1, '2025-10-15 22:03:57', '2025-10-15 22:03:57'),
(11, 'Can I rent a bike without a driving license?', 'No, a valid two-wheeler driving license is mandatory to rent a bike. Please carry your original license and a government-issued ID for verification at the time of pickup.', 3, 1, NULL, 1, '2025-10-15 22:05:05', '2025-10-15 22:05:05'),
(12, 'Is there a security deposit required for bike rentals?', 'Yes, a small refundable security deposit is required for every booking. The amount varies depending on the bike model and will be refunded within 24 hours after returning the bike in good condition.', 3, 1, NULL, 1, '2025-10-15 22:05:48', '2025-10-15 22:05:48'),
(13, 'What should I do if the bike breaks down during my trip?', 'If your bike experiences a breakdown, immediately contact our customer support. We provide on-road assistance or a replacement vehicle depending on your location and situation.', 3, 1, NULL, 1, '2025-10-15 22:06:04', '2025-10-15 22:06:04'),
(14, 'What types of commercial vehicles are available for rent?', 'We offer a wide range of commercial vehicles including mini trucks, pickup vans, cargo carriers, and heavy-duty trucks. You can choose the right vehicle type based on your load size and transport requirements.', 4, 1, NULL, 1, '2025-10-15 22:08:31', '2025-10-15 22:08:31'),
(15, 'Do I need a special license to rent a commercial vehicle?', 'Yes, renting and driving a commercial vehicle requires a valid commercial driving license (LMV-NT or HMV, depending on the vehicle type). You’ll also need to provide basic identity and business verification documents during booking.', 4, 1, NULL, 1, '2025-10-15 22:08:54', '2025-10-15 22:08:54'),
(16, 'Can I rent a commercial vehicle for intercity transportation?', 'Absolutely! You can rent commercial vehicles for both local and intercity deliveries. Just mention your pickup and drop locations while booking, and we’ll arrange the most suitable vehicle for your route.', 4, 1, NULL, 1, '2025-10-15 22:09:16', '2025-10-15 22:09:16'),
(17, 'What is included in the luxury vehicle rental package?', 'Each luxury vehicle rental includes standard insurance coverage, a full fuel tank, complimentary 24/7 roadside assistance, and delivery to your preferred location within city limits. Additional amenities like a personal chauffeur or VIP pick-up can be arranged on request.', 5, 1, NULL, 1, '2025-10-15 22:10:50', '2025-10-15 22:10:50'),
(18, 'Do I need a security deposit for luxury vehicle rentals?', 'Yes, a refundable security deposit is required for all luxury car rentals. The amount depends on the car model and duration of rental, and it is fully refunded once the vehicle is returned in good condition after inspection.', 5, 1, NULL, 1, '2025-10-15 22:11:06', '2025-10-15 22:11:06'),
(19, 'Can I rent a luxury car for out-of-city travel?', 'Absolutely! Luxury vehicles can be rented for intercity or long-distance trips. Just inform our team in advance so that we can prepare the required travel documentation and ensure 24-hour assistance coverage throughout your journey.', 5, 1, 1, 1, '2025-10-15 22:11:21', '2025-10-15 22:24:04'),
(20, 'What documents do I need to rent a recreational vehicle?', 'To rent an RV, you’ll need a valid driver’s license, government-issued ID, and a security deposit. Some rentals may also require proof of insurance or a credit card for verification.', 6, 1, NULL, 1, '2025-10-15 22:12:31', '2025-10-15 22:12:31'),
(21, 'Are pets allowed in recreational vehicle rentals?', 'Yes, most RV rental companies allow pets with a small additional cleaning fee. However, it’s best to confirm the pet policy in advance, as some vehicles have specific restrictions based on size or breed.', 6, 1, NULL, 1, '2025-10-15 22:12:49', '2025-10-15 22:12:49'),
(22, 'What is included in the RV rental price?', 'The rental price typically includes the vehicle, standard amenities like a kitchenette, bathroom, and bedding, as well as basic mileage. Additional charges may apply for extra mileage, fuel, or generator usage.', 6, 1, NULL, 1, '2025-10-15 22:13:10', '2025-10-15 22:13:10'),
(23, 'What makes your scooters different from others?', 'Our scooters are designed with next-gen features like smart display, extended battery life, quick charging, and superior comfort — giving you a smooth and reliable ride every time.', 8, 1, NULL, 1, '2025-10-16 23:57:46', '2025-10-16 23:57:46'),
(24, 'How long does the battery last on a full charge?', 'Depending on the model, our electric scooters can cover up to 90–120 km on a single charge. With fast-charging technology, you can power up in just a few hours and get back on the road quickly.', 8, 1, NULL, 1, '2025-10-16 23:58:03', '2025-10-16 23:58:03'),
(25, 'Do you provide after-sales service and warranty?', 'Yes! All our scooters come with 1-year standard warranty and dedicated after-sales support. We ensure your scooter stays in top condition with easy maintenance and service availability.', 8, 1, NULL, 1, '2025-10-16 23:58:18', '2025-10-16 23:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `roh_media_gallery`
--

CREATE TABLE `roh_media_gallery` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_media_gallery`
--

INSERT INTO `roh_media_gallery` (`id`, `file_name`, `file_path`, `file_type`, `active`, `add_date`, `edit_date`) VALUES
(1, 'pankaj-img-1.webp', '/media/users/profile/', 'webp', 1, '2025-07-29 18:19:15', '2025-08-02 16:12:58'),
(2, 'vishnu-roh-admin.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-07-29 18:32:46', '2025-08-02 16:13:01'),
(3, 'raj-roh-admin.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-07-29 18:38:25', '2025-08-02 16:13:05'),
(15, 'rentorhire-logo.png', '/media/users/profile/', 'png', 1, '2025-08-01 16:35:55', '2025-08-02 16:13:08'),
(16, 'vishnu-2.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:09:48', '2025-08-02 16:13:10'),
(17, 'vishnu-2.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:13:08', '2025-08-02 16:13:13'),
(18, 'vishnu-2.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:16:35', '2025-08-02 16:13:15'),
(19, 'vishnu-2-1.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:16:49', '2025-08-02 16:13:21'),
(20, 'vishnu-2-2.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:18:25', '2025-08-02 16:13:18'),
(54, 'scorpio-headshot-1.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:38'),
(55, 'scorpio-headshot-2.webp', '/uploads/media/host/items/', 'webp', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:41'),
(56, 'scorpio-headshot-3.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:43'),
(57, 'scorpio-headshot-4.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:45'),
(58, 'scorpio-headshot-5.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:47'),
(59, 'scorpio-headshot-6.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-10-18 00:54:51'),
(60, 'hyundai-i20-1.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-10-18 00:54:52'),
(61, 'hyundai-i20-2.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-10-18 00:54:54'),
(62, 'hyundai-i20-3.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-10-18 00:54:56'),
(63, 'hyundai-i20-4.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-10-18 00:54:58'),
(64, 'hyundai-i20-5.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-10-18 00:55:00'),
(65, 'bmw-s1000rr-headshot-1.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-10-18 00:55:03'),
(66, 'bmw-s1000rr-headshot-2.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-10-18 00:55:05'),
(67, 'bmw-s1000rr-headshot-3.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-10-18 00:55:07'),
(68, 'bmw-s1000rr-headshot-4.png', '/uploads/media/host/items/', 'png', 1, '2025-08-29 23:08:18', '2025-10-18 00:55:09'),
(69, 'images.png', '/media/host/items/', 'png', 1, '2025-09-03 19:43:26', '2025-09-03 19:43:26'),
(71, 'car1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-03 20:17:19', '2025-09-03 20:17:19'),
(72, 'car2.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-03 20:17:19', '2025-09-03 20:17:19'),
(73, 'car3.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-03 20:17:19', '2025-09-03 20:17:19'),
(74, 'car4.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-03 20:17:19', '2025-09-03 20:17:19'),
(75, 'car1-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-04 16:49:19', '2025-09-04 16:49:19'),
(76, 'car2-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-04 16:49:19', '2025-09-04 16:49:19'),
(77, 'car3-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-04 16:49:19', '2025-09-04 16:49:19'),
(78, 'car4-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-04 16:49:19', '2025-09-04 16:49:19'),
(79, 'creta.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-04 17:28:46', '2025-09-04 17:28:46'),
(80, 'images (1).jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-04 17:28:46', '2025-09-04 17:28:46'),
(81, 'images (2).jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-04 17:28:46', '2025-09-04 17:28:46'),
(82, 'images (3).jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-04 17:28:46', '2025-09-04 17:28:46'),
(83, 'images.jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-04 17:28:46', '2025-09-04 17:28:46'),
(87, '20230130052131_Screenshot_20230130_171913-3.avif', '/media/host/items/', 'avif', 1, '2025-09-06 17:45:26', '2025-09-06 17:45:26'),
(88, 'Mahindra_Scorpio_N_1662098067527.webp', '/media/host/items/', 'webp', 1, '2025-09-07 15:56:33', '2025-09-07 15:56:33'),
(89, '22hsvty9zgbw0jx-7ked0763o1.webp', '/media/host/items/', 'webp', 1, '2025-09-10 12:12:52', '2025-09-10 12:12:52'),
(90, 'product-jpeg-500x500.webp', '/media/host/items/', 'webp', 1, '2025-09-10 12:12:52', '2025-09-10 12:12:52'),
(91, 'Legs-1.png', '/media/host/items/', 'png', 1, '2025-09-12 11:45:06', '2025-09-12 11:45:06'),
(92, 'unnamed.webp', '/uploads/media/host/items/', 'webp', 1, '2025-09-15 11:37:29', '2025-09-15 11:37:29'),
(93, 'need-for-speed-hot-pursuit-photo.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-15 11:37:29', '2025-09-15 11:37:29'),
(95, 'ventrac-aerator-1.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-15 11:52:42', '2025-09-15 11:52:42'),
(96, 'pankaj.jpg', '/media/category/', 'jpg', 1, '2025-09-17 12:49:15', '2025-09-17 12:49:15'),
(97, 'macajizeh.jpg', '/uploads/media/users/profile/', 'jpg', 1, '2025-09-17 13:06:01', '2025-09-17 13:08:46'),
(98, 'photo-1614200179396-2bdb77ebf81b.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-19 07:13:21', '2025-09-19 07:13:21'),
(99, 'e2b61196b57ac77201579eccad180a47-2948301858163471344.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-19 07:13:21', '2025-09-19 07:13:21'),
(100, 'e2b61196b57ac77201579eccad180a47-2948301858163471344-1.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-22 06:35:50', '2025-09-22 06:35:50'),
(101, 'e2b61196b57ac77201579eccad180a47-2948301858163471344-2.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-30 09:29:57', '2025-09-30 09:29:57'),
(102, 'photo-1614200179396-2bdb77ebf81b-1.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-30 09:29:57', '2025-09-30 09:29:57'),
(103, 'e2b61196b57ac77201579eccad180a47-2948301858163471344.jpg', '/uploads/media/post/', 'jpg', 1, '2025-10-11 09:46:16', '2025-10-11 09:46:16'),
(104, 'furniture.webp', '/uploads/media/post/', 'webp', 1, '2025-10-12 15:40:55', '2025-10-12 15:40:55'),
(105, 'furniture-1.webp', '/uploads/media/post/', 'webp', 1, '2025-10-12 15:41:20', '2025-10-12 15:41:20'),
(106, 'furniture-2.webp', '/uploads/media/post/', 'webp', 1, '2025-10-12 15:41:31', '2025-10-12 15:41:31'),
(107, 'furniture-3.webp', '/uploads/media/post/', 'webp', 1, '2025-10-12 15:42:10', '2025-10-12 15:42:10'),
(108, 'furniture-4.webp', '/uploads/media/post/', 'webp', 1, '2025-10-12 15:55:32', '2025-10-12 15:55:32'),
(109, '2024_Bajaj_Chetak_1739512465382_1739512465730.avif', '/uploads/media/host/items/', 'avif', 1, '2025-10-16 18:18:55', '2025-10-16 18:18:55'),
(110, '2024_Bajaj_Chetak_1739512465382_1739512465730.avif', '/uploads/media/post/', 'avif', 1, '2025-10-16 18:23:05', '2025-10-16 18:23:05'),
(111, 'c12i-max68624902204e5.avif', '/uploads/media/post/', 'avif', 1, '2025-10-16 18:24:07', '2025-10-16 18:24:07'),
(112, 'Screenshot-2025-05-30-172354.webp', '/uploads/media/post/', 'webp', 1, '2025-10-16 18:25:18', '2025-10-16 18:25:18'),
(113, 'joy-blog-post-images-1-1.png', '/uploads/media/post/', 'png', 1, '2025-10-16 18:26:55', '2025-10-16 18:26:55');

-- --------------------------------------------------------

--
-- Table structure for table `roh_models`
--

CREATE TABLE `roh_models` (
  `id` int(11) NOT NULL,
  `model_name` varchar(150) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `tag_id` int(10) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roh_models`
--

INSERT INTO `roh_models` (`id`, `model_name`, `brand_id`, `tag_id`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'Altroz', 1, 3, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(2, 'Punch', 1, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(3, 'Baleno', 2, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(4, 'Swift', 2, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(5, 'Scorpio S11 Classic', 3, 1, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(6, 'ScorpioN', 3, 1, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(7, 'Virtus', 4, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(8, 'Taigun', 4, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(9, 'BMW S 1000 RR', 5, 0, 1, 1, 1, '2025-08-22 17:36:50', '2025-08-22 17:36:50'),
(10, 'G310 RR', 5, 0, 1, 1, 1, '2025-08-22 17:37:39', '2025-08-22 17:37:39'),
(11, 'i20', 6, 2, 1, 1, 1, '2025-08-25 17:21:03', '2025-08-25 17:21:03'),
(12, 'Activa 6G', 7, 6, 1, 1, 1, '2025-08-25 17:21:03', '2025-08-25 17:21:03');

-- --------------------------------------------------------

--
-- Table structure for table `roh_posts`
--

CREATE TABLE `roh_posts` (
  `id` int(11) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `post_excerpt` text DEFAULT NULL,
  `post_status` enum('draft','published','archived') DEFAULT 'draft',
  `post_img_id` int(11) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_posts`
--

INSERT INTO `roh_posts` (`id`, `post_title`, `post_slug`, `description`, `post_excerpt`, `post_status`, `post_img_id`, `cate_id`, `add_date`, `edit_date`) VALUES
(1, 'How to Maintain Your Car for Long Life', 'how-to-maintain-your-car-for-long-life', 'Learn essential car maintenance tips to extend the lifespan of your vehicle. From oil changes to tire rotation, this guide covers everything you need.', 'Essential car maintenance tips for long-lasting performance.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(2, 'Top 10 Travel Destinations in India', 'top-10-travel-destinations-in-india', 'Explore the most beautiful places in India — from the backwaters of Kerala to the mountains of Himachal. Ideal for solo and family trips.', 'Best travel spots in India to visit this year.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(3, 'Beginner’s Guide to WordPress Plugins', 'beginners-guide-to-wordpress-plugins', 'This post explains what WordPress plugins are, how they work, and which ones are essential for every beginner site.', 'Understand and use WordPress plugins effectively.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(4, 'Simple Exercises to Stay Fit at Home', 'simple-exercises-to-stay-fit-at-home', 'No gym? No problem! These 10 home workouts require no equipment and help you stay fit and active.', 'Home workouts you can do easily.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(5, '5 Signs Your Laptop Needs a Service', '5-signs-your-laptop-needs-a-service', 'Is your laptop slow or overheating? Check out these 5 warning signs that indicate your device might need a quick service.', 'When to get your laptop serviced.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(6, 'The Future of Electric Vehicles', 'the-future-of-electric-vehicles', 'Electric vehicles are revolutionizing the automobile industry. Learn how EVs are shaping the future of sustainable transport.', 'EV trends and the future of transport.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(7, 'Mastering SEO in 2025: Complete Guide', 'mastering-seo-in-2025-complete-guide', 'Stay ahead in search engine rankings with our comprehensive SEO guide for 2025. Includes keyword strategies and AI tools.', 'Updated SEO tips for 2025.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(8, 'Healthy Breakfast Ideas for Busy People', 'healthy-breakfast-ideas-for-busy-people', 'Short on time? Try these nutritious breakfast options that take under 10 minutes to prepare.', 'Quick and healthy breakfast recipes.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(9, 'Why Every Business Needs a Website', 'why-every-business-needs-a-website', 'A strong online presence is no longer optional. Discover how a professional website can boost your brand and sales.', 'Importance of having a business website.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(10, 'Top 7 Android Apps for Productivity', 'top-7-android-apps-for-productivity', 'Boost your daily productivity with these amazing Android apps that help manage tasks, notes, and time.', 'Best productivity apps for Android users.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(11, 'How to Start Freelancing in 2025', 'how-to-start-freelancing-in-2025', 'Freelancing is booming! Learn how to build your freelance profile, find clients, and earn from your skills.', 'Step-by-step guide to freelancing.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(12, 'Difference Between AI and Machine Learning', 'difference-between-ai-and-machine-learning', 'Understand the real difference between Artificial Intelligence and Machine Learning in simple terms with practical examples.', 'AI vs ML explained clearly.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(13, 'How to Improve Website Loading Speed', 'how-to-improve-website-loading-speed', 'Website too slow? Follow these optimization techniques to make your site faster and improve user experience.', 'Boost your website performance.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(14, 'Budget-Friendly Interior Design Tips', 'budget-friendly-interior-design-tips', 'Make your home beautiful without breaking the bank. Simple ideas to redesign spaces on a budget.', 'Affordable home interior design ideas.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(15, 'Exploring the Himalayas: Travel Guide', 'exploring-the-himalayas-travel-guide', 'A complete guide for trekking and traveling in the Himalayas — what to pack, where to stay, and how to stay safe.', 'Trekking guide for the Himalayas.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(16, 'Best Laptops for Developers in 2025', 'best-laptops-for-developers-in-2025', 'Looking for a perfect laptop for coding? Here’s a curated list of powerful machines ideal for developers and programmers.', 'Top laptops for developers this year.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(17, '5-Minute Meditation Techniques for Focus', '5-minute-meditation-techniques-for-focus', 'Learn how to calm your mind and increase focus with these short meditation practices.', 'Quick meditation tips for better focus.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(18, 'WordPress Security Tips Every Site Needs', 'wordpress-security-tips-every-site-needs', 'Protect your WordPress website from hackers with these proven security measures.', 'Enhance WordPress security easily.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(19, 'Top 10 Coding Practices for Clean Code', 'top-10-coding-practices-for-clean-code', 'Write maintainable, readable, and scalable code by following these simple but effective coding practices.', 'Best practices for writing clean code.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(20, 'The Rise of Remote Work Culture', 'the-rise-of-remote-work-culture', 'Remote work is the new normal. Learn how businesses are adapting to flexible work models.', 'How remote work is reshaping industries.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(21, 'How to Create a YouTube Channel', 'how-to-create-a-youtube-channel', 'Start your own YouTube journey with this easy setup guide for beginners. Learn about setup, branding, and monetization.', 'Step-by-step guide to starting on YouTube.', 'draft', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(22, 'Top 5 Marketing Trends for 2025', 'top-5-marketing-trends-for-2025', 'Stay ahead in digital marketing with these trends — from AI-based ads to personalized campaigns.', 'Latest digital marketing strategies.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(23, 'Best Ways to Save Money Every Month', 'best-ways-to-save-money-every-month', 'Learn simple financial habits that can help you save more and spend smartly every month.', 'Easy monthly money-saving ideas.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(24, 'How to Optimize Images for Web', 'how-to-optimize-images-for-web', 'Improve your site speed by compressing and optimizing images the right way using free tools.', 'Guide to image optimization for web.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(25, 'Best Cameras for Beginners 2025', 'best-cameras-for-beginners-2025', 'If you’re new to photography, here’s a list of beginner-friendly cameras with great quality and features.', 'Top entry-level cameras to buy.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(26, 'The Importance of Regular Health Checkups', 'the-importance-of-regular-health-checkups', 'Discover why regular medical checkups are essential to catch diseases early and stay healthy.', 'Stay healthy with regular checkups.', 'published', 103, 6, '2025-10-11 16:52:32', '2025-10-14 00:00:24'),
(27, 'Top Freelance Websites to Find Work', 'top-freelance-websites-to-find-work', 'Explore top platforms where freelancers can find high-paying clients and remote projects.', 'Find freelance jobs easily online.', 'published', 103, 6, '2025-10-11 16:52:32', '2025-10-14 00:00:17'),
(28, 'Common WordPress Errors and Fixes', 'common-wordpress-errors-and-fixes', 'Encountering WordPress issues? Learn the common problems and how to fix them quickly.', 'Fix common WordPress site errors.', 'published', 103, 6, '2025-10-11 16:52:32', '2025-10-14 00:00:20'),
(29, 'How to Create an Online Portfolio', 'how-to-create-an-online-portfolio', 'Showcase your skills professionally by creating a strong online portfolio. Step-by-step process included.', 'Make an online portfolio easily.', 'published', 103, 6, '2025-10-11 16:52:32', '2025-10-14 00:00:29'),
(30, '10 Delicious Smoothie Recipes', '10-delicious-smoothie-recipes', 'Healthy and refreshing smoothie ideas you can make at home in minutes. Perfect for breakfast or post-workout.', 'Try these healthy smoothie recipes.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(31, 'Top Web Development Trends 2025', 'top-web-development-trends-2025', 'Discover the newest web technologies and frameworks dominating 2025.', 'Upcoming trends in web development.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(32, 'The Psychology of Productivity', 'the-psychology-of-productivity', 'Learn how your mind affects your ability to stay productive and how to train it for better focus.', 'Productivity and mindset explained.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(33, 'Easy Gardening Tips for Beginners', 'easy-gardening-tips-for-beginners', 'Turn your balcony or backyard into a green paradise with these easy gardening tips.', 'Simple steps to start gardening.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(34, 'Understanding Cryptocurrency Basics', 'understanding-cryptocurrency-basics', 'Get started with crypto by understanding what Bitcoin, Ethereum, and blockchain technology are.', 'A simple guide to cryptocurrency.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(35, 'Why Sleep is Important for Health', 'why-sleep-is-important-for-health', 'Sleep plays a vital role in maintaining health. Learn how to improve your sleep quality naturally.', 'The benefits of quality sleep.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(36, 'WordPress vs Shopify: Which is Better?', 'wordpress-vs-shopify-which-is-better', 'Choosing between WordPress and Shopify? Compare both platforms based on features, pricing, and scalability.', 'Ecommerce comparison: WP vs Shopify.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(37, 'Home Automation for Beginners', 'home-automation-for-beginners', 'Explore how smart home devices can make your daily life easier and more efficient.', 'Intro to smart home devices.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(38, 'How to Stay Motivated Every Day', 'how-to-stay-motivated-every-day', 'Motivation fluctuates, but these daily habits can help you stay consistent and focused.', 'Daily habits for motivation.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(39, 'Top 10 WordPress Themes for 2025', 'top-10-wordpress-themes-for-2025', 'Looking for a modern, fast, and SEO-friendly WordPress theme? Here are the best picks of the year.', 'Best free and premium WordPress themes.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(40, 'Best Mobile Phones Under ₹20,000', 'best-mobile-phones-under-20000', 'Find the latest smartphones under ₹20,000 with top performance and camera quality.', 'Budget smartphone guide for 2025.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(41, 'Importance of Regular Exercise', 'importance-of-regular-exercise', 'Exercise keeps your body and mind fit. Learn why you should make it a part of your routine.', 'Stay active with regular workouts.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(42, 'How to Learn Coding from Scratch', 'how-to-learn-coding-from-scratch', 'Start coding even if you have zero experience. Follow these simple steps and free resources.', 'Coding for beginners simplified.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(43, 'Creating a Blog that Earns', 'creating-a-blog-that-earns', 'Blogging can be a full-time career. Learn how to start, grow, and monetize your blog effectively.', 'Monetize your blog with these steps.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(44, 'Top Gadgets You Must Have in 2025', 'top-gadgets-you-must-have-in-2025', 'From smart glasses to foldable phones, here are the coolest gadgets you’ll want this year.', 'List of trending gadgets in 2025.', 'published', 103, 2, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(45, 'Boost Your Immune System Naturally', 'boost-your-immune-system-naturally', 'Simple lifestyle changes and foods that can naturally strengthen your immunity.', 'Stay strong with natural immunity tips.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(46, 'Essential Plugins for WooCommerce', 'essential-plugins-for-woocommerce', 'Enhance your WooCommerce store with these must-have plugins for better performance and sales.', 'Top WooCommerce plugins for growth.', 'published', 103, 1, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(47, 'The Art of Time Management', 'the-art-of-time-management', 'Master time management to achieve more every day. Learn how to plan and prioritize effectively.', 'Practical tips for managing your time.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(48, 'Travel Packing Checklist', 'travel-packing-checklist', 'Never forget an essential item again! Use this travel checklist before every trip.', 'Your must-have travel packing list.', 'published', 103, 3, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(49, 'The Role of AI in Education', 'the-role-of-ai-in-education', 'Artificial Intelligence is transforming how students learn and teachers teach. Discover its impact.', 'AI and the future of education.', 'published', 103, 5, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(50, 'Simple Ways to Reduce Plastic Waste', 'simple-ways-to-reduce-plastic-waste', 'Small actions can make a big difference. Learn easy ways to reduce plastic waste at home and office.', 'Reduce plastic waste effortlessly.', 'published', 103, 4, '2025-10-11 16:52:32', '2025-10-11 16:52:32'),
(51, 'What is SEO?', 'what-is-seo', 'This is my test post', 'This is my first test post', 'draft', 108, 2, '2025-10-12 21:25:32', '2025-10-12 23:01:11'),
(52, 'Experience the Freedom with the All-New Urban Ride Scooter', 'experience-the-freedom-with-the-all-new-urban-ride-scooter', 'Discover the perfect balance of power, comfort, and style with the new Urban Ride Scooter — built for modern commuters who want performance with elegance.', 'The Urban Ride Scooter brings together innovation and comfort for your daily travel. Its smooth performance and sleek design make it the perfect choice for city riders looking for a reliable and stylish partner.', 'published', 110, 8, '2025-10-16 23:53:05', '2025-10-16 23:53:05'),
(53, 'Go Electric, Go Smart — The Future of Scooters Is Here', 'go-electric-go-smart-the-future-of-scooters-is-here', 'Step into the future with our next-gen electric scooters, offering zero emissions, high efficiency, and powerful range for sustainable urban mobility.', 'Eco-friendly yet powerful, our electric scooters redefine city travel. Designed for smart riders, they deliver unmatched performance, quick charging, and effortless rides — all while caring for the planet.', 'published', 111, 8, '2025-10-16 23:54:07', '2025-10-16 23:54:07'),
(54, 'The Perfect Scooter for Every Journey', 'the-perfect-scooter-for-every-journey', 'Whether it’s a quick city errand or a long weekend cruise, our latest scooter line blends durability, comfort, and modern design — made for every kind of rider.', 'Take your journey to the next level with scooters built for all terrains and all moods. Comfortable seating, sleek looks, and top-notch performance — experience the joy of riding in style.', 'published', 112, 8, '2025-10-16 23:55:18', '2025-10-16 23:55:18'),
(55, 'Redefine Your Ride — Introducing the Next-Gen Smart Scooter', 'redefine-your-ride-introducing-the-next-gen-smart-scooter', 'Meet the new era of two-wheelers — designed with smart technology, superior mileage, and unmatched comfort for your everyday city commute.', 'Experience the thrill of effortless riding with our next-gen Smart Scooter. From its intelligent dashboard to energy-efficient performance, it’s built to make every journey smooth, smart, and sustainable. Perfect for the modern rider who values both innovation and style.', 'published', 113, 8, '2025-10-16 23:56:55', '2025-10-16 23:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `roh_roles`
--

CREATE TABLE `roh_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `add_id` bigint(20) DEFAULT NULL,
  `edit_id` bigint(20) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roh_roles`
--

INSERT INTO `roh_roles` (`id`, `name`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'Super Admin', 1, 1, 19, '2025-07-08 15:46:30', '2025-08-05 17:43:34'),
(2, 'Service Provider', 1, 1, 1, '2025-07-08 15:46:55', '2025-07-08 15:46:55'),
(3, 'Customer', 1, 1, 1, '2025-07-17 18:41:10', '2025-07-17 18:41:10'),
(4, 'adfsdf', 0, 1, 1, '2025-09-11 12:50:09', '2025-09-11 12:50:12');

-- --------------------------------------------------------

--
-- Table structure for table `roh_routes`
--

CREATE TABLE `roh_routes` (
  `id` int(11) NOT NULL,
  `route_name` varchar(255) NOT NULL,
  `access_type` tinyint(4) DEFAULT 1 COMMENT '1 = View, 2 = All',
  `route_type` tinyint(4) DEFAULT 3 COMMENT '1 = Admin, 2 = User, 3 = Public',
  `group_name` varchar(100) DEFAULT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_routes`
--

INSERT INTO `roh_routes` (`id`, `route_name`, `access_type`, `route_type`, `group_name`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'route/create', 1, 2, '2', 1, 1, 1, '2025-07-08 21:32:01', '2025-08-03 23:59:17'),
(2, 'role/create', 2, 1, '2', 1, 1, 1, '2025-07-08 21:32:01', '2025-08-03 23:59:21'),
(3, 'Test', 2, 1, '3', 1, 1, 1, '2025-08-03 16:09:09', '2025-08-03 23:59:24'),
(4, 'Test 2', 1, 2, '1', 1, 1, 1, '2025-08-03 16:11:56', '2025-08-04 23:21:58');

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
  `active` tinyint(1) DEFAULT 1,
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_states`
--

INSERT INTO `roh_states` (`state_id`, `state_name`, `state_slug`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'Andhra Pradesh', 'andhra-pradesh', 1, 1, 1, '2025-07-25 18:48:11', '2025-09-11 18:13:58'),
(2, 'Arunachal Pradesh', 'arunachal-pradesh', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(3, 'Assam', 'assam', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(4, 'Bihar', 'bihar', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(5, 'Chhattisgarh', 'chhattisgarh', 1, 19, 1, '2025-07-25 18:48:11', '2025-08-05 23:04:45'),
(6, 'Goa', 'goa', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(7, 'Gujarat', 'gujarat', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(8, 'Haryana', 'haryana', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(9, 'Himachal Pradesh', 'himachal-pradesh', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(10, 'Jharkhand', 'jharkhand', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(11, 'Karnataka', 'karnataka', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(12, 'Kerala', 'kerala', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(13, 'Madhya Pradesh', 'madhya-pradesh', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(14, 'Maharashtra', 'maharashtra', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(15, 'Manipur', 'manipur', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(16, 'Meghalaya', 'meghalaya', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(17, 'Mizoram', 'mizoram', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(18, 'Nagaland', 'nagaland', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(19, 'Odisha', 'odisha', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(20, 'Punjab', 'punjab', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(21, 'Rajasthan', 'rajasthan', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(22, 'Sikkim', 'sikkim', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(23, 'Tamil Nadu', 'tamil-nadu', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(24, 'Telangana', 'telangana', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(25, 'Tripura', 'tripura', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(26, 'Uttar Pradesh', 'uttar-pradesh', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(27, 'Uttarakhand', 'uttarakhand', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(28, 'West Bengal', 'west-bengal', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(29, 'Andaman and Nicobar Islands', 'andaman-and-nicobar-islands', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(30, 'Chandigarh', 'chandigarh', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(31, 'Dadra and Nagar Haveli and Daman and Diu', 'dadra-and-nagar-haveli-and-daman-and-diu', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(32, 'Lakshadweep', 'lakshadweep', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(33, 'Delhi', 'delhi', 1, 1, 1, '2025-07-25 18:48:11', '2025-07-25 18:48:11'),
(34, 'Puducherry', 'puducherry', 1, 19, 1, '2025-07-25 18:48:11', '2025-08-05 23:08:21'),
(35, 'Demo', 'demo', 1, 19, 0, '2025-07-26 22:34:15', '2025-08-05 23:05:05'),
(36, 'delta', 'delta', 1, 0, 0, '2025-09-11 18:14:12', '2025-09-11 18:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `roh_tags`
--

CREATE TABLE `roh_tags` (
  `id` int(11) NOT NULL,
  `tag_name` varchar(150) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roh_tags`
--

INSERT INTO `roh_tags` (`id`, `tag_name`, `cat_id`, `active`, `add_id`, `edit_id`, `add_date`, `edit_date`) VALUES
(1, 'SUV', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36'),
(2, 'Sedan', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36'),
(3, 'Coupe', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36'),
(4, 'Hatchback', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36'),
(5, 'MPV', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36'),
(6, '6G', 8, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36');

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
  `phone_number` varchar(21) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `business_name` varchar(100) DEFAULT NULL,
  `address_1` varchar(100) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `authorize_code` varchar(7) DEFAULT NULL,
  `verified` int(5) NOT NULL,
  `is_service_provider` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'is_service_provider => 0(Only User)\r\n\r\nis_service_provider => 1(Service provider and products listed for the user)',
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_users`
--

INSERT INTO `roh_users` (`user_id`, `user_name`, `first_name`, `last_name`, `email`, `phone_number`, `password_hash`, `user_role_id`, `profile_picture_url`, `business_name`, `address_1`, `landmark`, `state`, `city`, `pincode`, `authorize_code`, `verified`, `is_service_provider`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'Super Admin', 'Super', 'Admin', 'superadmin@gmail.com', '9012345678', '$2b$10$8P.0ga2QxTP9S27V38vFneIdKJr0YZ1Y9rD79aWZoNHzBNrT5vZQq', 1, '25', NULL, 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 0, 1, 1, 1, '2025-07-13 11:26:08', '2025-09-11 12:36:16'),
(2, 'Service Provider', 'Service', 'Provider', 'serviceprovider@gmail.com', '9012345678', '$2b$10$VswYxyPGRuYuU/1IFkMS1uAgYybZCvHIwhb93CFUtmyHUZyddYFf.', 2, '', NULL, 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 0, 1, 1, 1, '2025-07-13 11:27:31', '2025-08-12 17:24:15'),
(18, 'lavaniapankaj', 'Pankaj ', 'Verma', 'lavaniapankaj@gmail.com', '9876543210', '$2b$10$fwpmVvn/RVr3d/cbedmo8eTTxBebn0XhKtfXQt4dHk32IkBZFw8bG', 1, '1', NULL, '13th Street', '47 W 13th St, New York, NY 10011, USA', 'New York', 'CT', 10011, NULL, 1, 0, 1, 0, 1, '2025-07-29 18:19:15', '2025-08-12 17:24:19'),
(19, 'ecmascript', 'Vishnu', 'Kumawat', 'ecmascript.php@gmail.com', '9783457008', '$2b$10$bVzM.eJjjhU7boZzNEE8aul7iycXabXaDmIuQAB9CXMTfDLP/v8hC', 1, '2', NULL, 'Stuyvesant 14th St & 1st Ave ', '238 1st Ave, New York, NY 10009, USA', 'New York', 'CT', 10009, NULL, 1, 0, 1, 0, 1, '2025-07-29 18:32:46', '2025-08-12 17:24:21'),
(20, 'rajtailor9694', 'Raj', 'Tailor', 'rajtailor9694@gmail.com', '9694453829', '$2b$10$9CqGEjQCtkD9W1HI0cUFT.iHNyJNozCtDaucVM4lMkYDeBIT0DwMa', 3, '3', 'Moyal Rentals', 'Stuyvesant 14th St & Ave ', 'C 690 E 14th St, New York, NY 10009, USA', 'Nwy York', 'CT', 10009, NULL, 1, 1, 1, 1, 1, '2025-07-29 18:38:25', '2025-09-03 20:21:24'),
(50, 'rent_or_hire', 'Den', 'Cook', 'roh@hosting.com', '9876543219', '$2b$10$TwK0imHqaYotk9QvtG0aiu65rXvC4gBHxAnm26vXGY77eWDNkOMZq', 3, NULL, 'Zahir Gallegos', 'Jaipur', '', '', '', 302012, '999000', 1, 1, NULL, NULL, 1, '2025-08-27 17:16:42', '2025-09-10 11:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `roh_vehicle_attributes`
--

CREATE TABLE `roh_vehicle_attributes` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `engine_type` enum('Petrol','Diesel','Electric','Hybrid','CNG') DEFAULT 'Petrol',
  `transmission_type` enum('Manual','Automatic') DEFAULT 'Automatic',
  `fuel_consumption` decimal(5,2) DEFAULT NULL,
  `seating_capacity` int(11) DEFAULT 5,
  `color` varchar(100) DEFAULT NULL,
  `vehicle_age` int(11) DEFAULT NULL,
  `mileage` decimal(10,2) DEFAULT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `insurance_validity` date DEFAULT NULL,
  `vehicle_type` enum('Luxury','Economy','Standard') DEFAULT 'Standard',
  `rental_period` enum('Daily','Weekly','Monthly','Custom') DEFAULT 'Daily',
  `vehicle_condition` enum('New','Used','Refurbished') DEFAULT 'Used',
  `accessories` text DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `item_state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `booking_instructions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_vehicle_attributes`
--

INSERT INTO `roh_vehicle_attributes` (`id`, `vehicle_id`, `engine_type`, `transmission_type`, `fuel_consumption`, `seating_capacity`, `color`, `vehicle_age`, `mileage`, `registration_number`, `insurance_validity`, `vehicle_type`, `rental_period`, `vehicle_condition`, `accessories`, `address_1`, `landmark`, `item_state`, `city`, `pincode`, `booking_instructions`) VALUES
(1, 24, 'Diesel', 'Manual', 100.00, 7, 'Z Black', 2, 14.00, 'TR01 AB 1234', '2025-08-25', 'Standard', 'Daily', 'New', 'Stylish Alloy Wheels\r\n\r\nPremium Fog Lamps\r\n\r\nRoof Rails\r\n\r\nDesigner Seat Covers\r\n\r\nTouchscreen Infotainment System\r\n\r\nReverse Parking Camera\r\n\r\nFloor Mats', 'Scorpio Car Rentals', '2nd Floor, MG Road', 'Agartala', 'Tripura', 799001, 'Fill in the online booking form\r\n\r\nUpload valid ID proof (Aadhaar/Driving License/Passport)\r\n\r\nPay the booking amount securely online\r\n\r\nOur team will confirm your booking within 24 hours\r\n\r\nVisit the showroom for final payment and delivery'),
(2, 25, 'Petrol', 'Manual', 18.00, 5, 'Polar White', 3, 11.00, 'TR02 XY 5678', '2025-08-27', 'Luxury', 'Daily', 'New', 'Alloy Wheels\r\n\r\nTouchscreen Infotainment System\r\n\r\nReverse Parking Camera\r\n\r\nSeat Covers\r\n\r\nFloor Mats\r\n\r\nFog Lamps', 'i20 Car Rentals', 'Ground Floor, HGB Road,', 'Agartala', 'Tripura', 799001, 'Fill in the online booking form\r\n\r\nUpload valid ID proof (Aadhaar/Driving License/Passport)\r\n\r\nPay the booking amount securely online\r\n\r\nOur team will confirm your booking within 24 hours\r\n\r\nVisit the showroom for final payment and delivery'),
(3, 26, 'Petrol', 'Automatic', 4.00, 2, 'Black', 3, 3.00, 'RJ45DD9892', '2025-08-31', 'Luxury', 'Daily', 'New', 'Helemt', 'Vaishali nagar', 'Plot no.11', 'Rajasthan', 'Jaipur', 302021, 'No booking instructions fro S1000RR '),
(30, 58, 'Petrol', 'Automatic', NULL, NULL, NULL, NULL, NULL, 'AJ 44 SW 2032', NULL, NULL, NULL, 'New', NULL, NULL, NULL, NULL, NULL, NULL, 'This is Booking Instructions (Activa 6G)');

-- --------------------------------------------------------

--
-- Table structure for table `roh_vehicle_details`
--

CREATE TABLE `roh_vehicle_details` (
  `id` int(11) NOT NULL,
  `service_provider_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `vehicle_description` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `sub_cat_id` int(11) DEFAULT NULL,
  `tag_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `image_ids` text DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `price_per_week` decimal(10,2) DEFAULT NULL,
  `price_per_month` decimal(10,2) DEFAULT NULL,
  `price_custom_day` decimal(10,2) DEFAULT NULL,
  `item_status` tinyint(1) DEFAULT 1,
  `admin_item_status` tinyint(1) DEFAULT 1,
  `total_views` int(11) DEFAULT 0,
  `security_deposit` decimal(10,2) DEFAULT NULL,
  `booking_terms` text DEFAULT NULL,
  `availability_status` enum('Available','Unavailable','Booked') DEFAULT 'Available',
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_vehicle_details`
--

INSERT INTO `roh_vehicle_details` (`id`, `service_provider_id`, `item_name`, `vehicle_description`, `category_id`, `sub_cat_id`, `tag_id`, `brand_id`, `model_id`, `image_ids`, `price_per_day`, `price_per_week`, `price_per_month`, `price_custom_day`, `item_status`, `admin_item_status`, `total_views`, `security_deposit`, `booking_terms`, `availability_status`, `add_date`, `edit_date`) VALUES
(24, 50, 'Mahindra Scorpio – Power Meets Style', 'The Big Daddy SUV – Mahindra Scorpio is known for its bold looks, powerful performance, and unmatched road presence. Whether it’s a city ride or an off-road adventure, the Scorpio is built to conquer every journey with style and comfort.', 1, 2, 2, 3, 5, '[54,55,56,57,58,59]', 2500.00, 15000.00, 45000.00, 120000.00, 1, 1, 0, 9998.00, 'Booking amount: ₹5,000 (non-refundable)\r\n\r\nFinal payment before delivery\r\n\r\nPrice excludes RTO, insurance, and taxes\r\n\r\nDelivery subject to stock availability and clearance\r\n\r\nAccessories charged separately', 'Available', '2025-08-25 22:44:58', '2025-09-24 16:33:40'),
(25, 50, 'Hyundai i20 – Premium Hatchback', 'The Hyundai i20 is a premium hatchback that blends style, comfort, and efficiency. With its modern design, advanced features, and smooth driving experience, the i20 is the perfect choice for city commutes and weekend getaways.', 1, 2, 2, 6, 11, '[60,61,62,63,64]', 1800.00, 11000.00, 32000.00, 69998.00, 1, 1, 0, 7000.00, 'Booking amount: ₹3,000 (non-refundable)\r\n\r\nFinal payment before delivery\r\n\r\nPrice excludes fuel, tolls, RTO, insurance, and taxes\r\n\r\nDelivery subject to availability and clearance\r\n\r\nAccessories charged separately', 'Available', '2025-08-25 22:56:55', '2025-09-24 16:33:42'),
(26, 50, 'BMW S1000RR', 'The S1000RR is BMW\'s flagship sportsbike that is known for its top-end performance, modern safety electronics and excellent handling abilities. But just like other BMWs, the S1000RR is also expensive to purchase and maintain', 1, 3, 2, 5, 9, '[65,66,67,68]', 1200.00, 8000.00, 25000.00, 45000.00, 1, 1, 0, 596.00, 'No Booking terms for S1000RR. ', 'Available', '2025-08-30 04:38:18', '2025-09-24 16:33:46'),
(58, 50, 'Activa 6G', 'This Vehicle Description (Activa)', 1, 8, 6, 7, 12, '[109]', 1000.00, 550.00, 2500.00, NULL, 1, 1, 0, 350.00, NULL, 'Available', '2025-10-16 23:48:55', '2025-10-16 23:48:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roh_brands`
--
ALTER TABLE `roh_brands`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `roh_contact_us`
--
ALTER TABLE `roh_contact_us`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_email_status` (`email_status`);

--
-- Indexes for table `roh_faqs`
--
ALTER TABLE `roh_faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cate_id` (`cate_id`),
  ADD KEY `active` (`active`);

--
-- Indexes for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roh_models`
--
ALTER TABLE `roh_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roh_posts`
--
ALTER TABLE `roh_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_slug` (`post_slug`),
  ADD KEY `post_slug_2` (`post_slug`),
  ADD KEY `post_status` (`post_status`);

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
-- Indexes for table `roh_tags`
--
ALTER TABLE `roh_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roh_users`
--
ALTER TABLE `roh_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration_number` (`registration_number`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `roh_vehicle_details`
--
ALTER TABLE `roh_vehicle_details`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roh_brands`
--
ALTER TABLE `roh_brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roh_categories`
--
ALTER TABLE `roh_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roh_cities`
--
ALTER TABLE `roh_cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `roh_contact_us`
--
ALTER TABLE `roh_contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roh_faqs`
--
ALTER TABLE `roh_faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `roh_models`
--
ALTER TABLE `roh_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roh_posts`
--
ALTER TABLE `roh_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `roh_roles`
--
ALTER TABLE `roh_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roh_routes`
--
ALTER TABLE `roh_routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roh_states`
--
ALTER TABLE `roh_states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `roh_tags`
--
ALTER TABLE `roh_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `roh_vehicle_details`
--
ALTER TABLE `roh_vehicle_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  ADD CONSTRAINT `roh_vehicle_attributes_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `roh_vehicle_details` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
