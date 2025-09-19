-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2025 at 06:51 PM
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
(6, 'Hyundai', 2, 1, 1, 1, 1, '2025-08-25 17:19:56', '2025-08-25 17:19:56');

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
(1, 'Vehicles', 'A broad category that includes all types of transport modes, such as cars, bikes, trucks, and recreational vehicles. Vehicles are essential for personal, commercial, and leisure travel, offering diverse options for different purposes, from daily commuting to long-distance journeys and business logistics.', 'vehicles', NULL, 1, 1, 1, '2025-08-05 17:11:45', '2025-09-16 18:03:32'),
(2, 'Cars', 'A wide range of vehicles for personal transportation, including various types like sedans, hatchbacks, and SUVs. Suitable for everyday commuting, family trips, and more.', 'cars', 1, 1, 1, 1, '2025-08-05 17:12:34', '2025-08-05 17:12:34'),
(3, 'Bikes', 'Includes motorcycles and bicycles for personal use, from high-speed sports bikes to commuter-friendly models. Ideal for short trips, daily commutes, or adventure riding.', 'bikes', 1, 1, 1, 1, '2025-08-05 17:12:53', '2025-08-05 17:12:53'),
(4, 'Commercial Vehicles', 'Vehicles designed for business purposes such as trucks, delivery vans, and buses. Used for transporting goods, passengers, or as part of a fleet for logistics and service industries.', 'commercial-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:28', '2025-08-05 17:13:28'),
(5, 'Luxury Vehicles', 'High-end cars and bikes offering exceptional comfort, performance, and design. Includes premium brands and models meant for those who seek an elite driving experience.', 'luxury-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:51', '2025-08-05 17:13:51'),
(6, 'Recreational Vehicles', 'Vehicles designed for leisure activities, including motorhomes, campervans, and RVs. Perfect for road trips, outdoor adventures, and extended vacations.', 'recreational-vehicles', 1, 1, 1, 1, '2025-08-05 17:14:11', '2025-08-05 17:14:11'),
(7, 'Furniture', 'A broad category that includes all types of transport modes.', 'furniture', NULL, 1, 1, 1, '2025-09-16 17:11:45', '2025-09-16 17:34:34');

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
(49, 'Agartala', 'agartala', 25, 1, 1, 1, '2025-07-25 18:53:25', '2025-07-25 18:53:25'),
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
(104, 'dfsdfs', 'dfsdfs', 1, 19, 19, 1, '2025-08-05 23:58:55', '2025-08-05 23:59:53');

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
(54, 'scorpio-headshot-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(55, 'scorpio-headshot-2.webp', '/media/host/items/', 'webp', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(56, 'scorpio-headshot-3.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(57, 'scorpio-headshot-4.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(58, 'scorpio-headshot-5.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(59, 'scorpio-headshot-6.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:14:58', '2025-08-25 17:14:58'),
(60, 'hyundai-i20-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-08-25 17:26:55'),
(61, 'hyundai-i20-2.jpeg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-08-25 17:26:55'),
(62, 'hyundai-i20-3.jpeg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-08-25 17:26:55'),
(63, 'hyundai-i20-4.jpeg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-08-25 17:26:55'),
(64, 'hyundai-i20-5.jpeg', '/media/host/items/', 'jpeg', 1, '2025-08-25 17:26:55', '2025-08-25 17:26:55'),
(65, 'bmw-s1000rr-headshot-1.jpeg', '/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-08-29 23:08:18'),
(66, 'bmw-s1000rr-headshot-2.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-08-29 23:08:18'),
(67, 'bmw-s1000rr-headshot-3.jpg', '/media/host/items/', 'jpeg', 1, '2025-08-29 23:08:18', '2025-08-29 23:08:18'),
(68, 'bmw-s1000rr-headshot-4.png', '/media/host/items/', 'png', 1, '2025-08-29 23:08:18', '2025-08-29 23:08:18'),
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
(89, '20230130052131_Screenshot_20230130_171913-4.avif', '/media/host/items/', 'avif', 1, '2025-09-12 15:52:49', '2025-09-12 15:52:49'),
(90, '20230130052131_Screenshot_20230130_171913-5.avif', '/media/host/items/', 'avif', 1, '2025-09-12 19:22:31', '2025-09-12 19:22:31'),
(91, 'creta-1.jpg', '/media/host/items/', 'jpeg', 1, '2025-09-12 19:22:31', '2025-09-12 19:22:31'),
(92, 'images (1)-1.jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-12 19:22:31', '2025-09-12 19:22:31'),
(93, 'images (3)-1.jpeg', '/media/host/items/', 'jpeg', 1, '2025-09-12 19:22:31', '2025-09-12 19:22:31'),
(94, 'classic-modified-car-with-dark-smokie-background-ai-generative-free-photo.jpg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-15 16:39:29', '2025-09-15 16:39:29'),
(95, 'Aston-Martin-DB11-Exterior-115405.avif', '/uploads/media/host/items/', 'avif', 1, '2025-09-15 16:44:25', '2025-09-15 16:44:25'),
(97, 'Aston-Martin-DB11-Exterior-115405-1.avif', '/uploads/media/host/items/', 'avif', 1, '2025-09-15 16:54:40', '2025-09-15 16:54:40'),
(98, 'furniture.webp', '/media/category/', 'webp', 1, '2025-09-16 17:30:14', '2025-09-16 17:30:14'),
(99, 'furniture-1.webp', '/media/category/', 'webp', 1, '2025-09-16 17:30:27', '2025-09-16 17:30:27'),
(100, 'furniture-2.webp', '/media/category/', 'webp', 1, '2025-09-16 17:33:35', '2025-09-16 17:33:35'),
(101, 'furniture-3.webp', '/media/category/', 'webp', 1, '2025-09-16 17:33:44', '2025-09-16 17:33:44');

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
(11, 'i20', 6, 2, 1, 1, 1, '2025-08-25 17:21:03', '2025-08-25 17:21:03');

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
(3, 'Customer', 1, 1, 1, '2025-07-17 18:41:10', '2025-07-17 18:41:10');

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
(1, 'Andhra Pradesh', 'andhra-pradesh', 1, 19, 1, '2025-07-25 18:48:11', '2025-08-05 23:13:02'),
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
(35, 'Demo', 'demo', 1, 19, 0, '2025-07-26 22:34:15', '2025-08-05 23:05:05');

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
(5, 'MPV', 2, 1, 1, 1, '2025-08-19 14:36:36', '2025-08-19 14:36:36');

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
(1, 'Super Admin', 'Super', 'Admin', 'superadmin@gmail.com', '9012345678', '$2b$10$xdm/c.8Yh4o9VBQnAqvZW.GImjKMS3tYM/YMIJDsTRqv5YkQyKUcC', 1, '25', NULL, 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 0, 1, 19, 1, '2025-07-13 11:26:08', '2025-08-12 17:24:12'),
(2, 'Service Provider', 'Service', 'Provider', 'serviceprovider@gmail.com', '9012345678', '$2b$10$VswYxyPGRuYuU/1IFkMS1uAgYybZCvHIwhb93CFUtmyHUZyddYFf.', 2, '', NULL, 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 0, 1, 1, 1, '2025-07-13 11:27:31', '2025-08-12 17:24:15'),
(18, 'lavaniapankaj', 'Pankaj ', 'Verma', 'lavaniapankaj@gmail.com', '9876543210', '$2b$10$fwpmVvn/RVr3d/cbedmo8eTTxBebn0XhKtfXQt4dHk32IkBZFw8bG', 1, '1', NULL, '13th Street', '47 W 13th St, New York, NY 10011, USA', 'New York', 'CT', 10011, NULL, 1, 0, 1, 0, 1, '2025-07-29 18:19:15', '2025-08-12 17:24:19'),
(19, 'ecmascript', 'Vishnu', 'Kumawat', 'ecmascript.php@gmail.com', '9783457008', '$2b$10$bVzM.eJjjhU7boZzNEE8aul7iycXabXaDmIuQAB9CXMTfDLP/v8hC', 1, '2', NULL, 'Stuyvesant 14th St & 1st Ave ', '238 1st Ave, New York, NY 10009, USA', 'New York', 'CT', 10009, NULL, 1, 0, 1, 0, 1, '2025-07-29 18:32:46', '2025-08-12 17:24:21'),
(20, 'rajtailor9694', 'Raj', 'Tailor', 'rajtailor9694@gmail.com', '9694453829', '$2b$10$9CqGEjQCtkD9W1HI0cUFT.iHNyJNozCtDaucVM4lMkYDeBIT0DwMa', 3, '3', 'Moyal Rentals', 'Stuyvesant 14th St & Ave ', 'C 690 E 14th St, New York, NY 10009, USA', 'Nwy York', 'CT', 10009, NULL, 1, 1, 1, 1, 1, '2025-07-29 18:38:25', '2025-09-03 20:21:24'),
(44, 'rudrax', 'Raymond', 'Foster', 'bowijen@mailinator.com', '9999999999', '$2b$10$qchWQg.7/f.OvDEqes6MqeulRouWGrswPU5IFWhE4Ablj/rmdKIqq', 3, NULL, NULL, '', '', '', '', 123456, '1234', 0, 0, NULL, NULL, 1, '2025-08-13 15:40:33', '2025-08-23 09:48:33'),
(45, 'papyviq', 'Daphne', 'Spence', 'ligy@mailinator.com', '8957058952', '$2b$10$gv2JDIFncJrkcn/Hau.mf.hmExvOYvmMWMTkZQKsylG2Co0hdzEwK', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-08-23 13:10:32', '2025-08-23 13:16:46'),
(46, 'natup', 'Holly', 'Rush', 'cexul@mailinator.com', '2538281972', '$2b$10$DBrEyUDMsLAjCnWHfr3IfeCyeBtJ2Cv78q8c5YaysfXDPqQYpwYNi', 3, '41', NULL, '70 West New Parkway', 'Quia ut sed maiores ', 'Ea a qui amet cupid', 'Dolores harum ipsum ', 578908, NULL, 0, 0, 1, 1, 1, '2025-08-23 16:41:42', '2025-08-23 16:42:02'),
(47, 'bitugoxe', 'Amity', 'Schultz', 'perikop@mailinator.com', '4869643856', '$2b$10$Ecgs/LNcxCFKv/CqgQ7C.uS0W9Ox3moJ9z0G1XRC0mOffe6sVtXOO', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '497910', 0, 0, NULL, NULL, 0, '2025-08-27 16:44:32', '2025-08-27 16:51:00'),
(48, 'soruke', 'Chadwick', 'Dalton', 'qugenehiv@mailinator.com', '4625174203', '$2b$10$dxqghMmEVZujsUIPSeDF7uPStFFsuvOfKL.J6onRbs1jlB6l4ohQK', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '677190', 0, 0, NULL, NULL, 0, '2025-08-27 16:53:58', '2025-08-27 16:53:58'),
(49, 'qyqaluvuqu', 'Isaac', 'Hall', 'bobyhiz@mailinator.com', '2883996366', '$2b$10$StXcohwoZNeRIjOSwwfJPeMWH8EAC8c5Q79f4B3noutl1mZIaPNJW', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '110654', 0, 0, NULL, NULL, 0, '2025-08-27 16:54:55', '2025-08-27 16:54:55'),
(50, 'rent_or_hire', 'Den', 'Cook', 'roh@hosting.com', '9876543219', '$2b$10$TwK0imHqaYotk9QvtG0aiu65rXvC4gBHxAnm26vXGY77eWDNkOMZq', 3, NULL, 'Zahir Gallegos', 'Jaipur', '', '', '', 302012, '999000', 1, 1, NULL, NULL, 1, '2025-08-27 17:16:42', '2025-09-07 15:56:33'),
(51, 'vedoq', 'Jenette', 'Cannon', 'huqinileju@mailinator.com', '5317534899', '$2b$10$VFU5t7sxh9TVa8Jd.dmUiuKQtDU8sS13QWmqmC3WZKnytHuoIum5W', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-08-27 17:18:00', '2025-08-27 17:20:13'),
(52, 'lyhede@mailinator.com', 'Lunea', 'Nolan', 'lyhede@mailinator.com', '1982856472', '$2b$10$GY2KBR7dPhpa.RMI3KziIuoLXQkQFTtiSIJ0edp8JuKzHZXTAmtBm', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456', 0, 0, NULL, NULL, 0, '2025-08-27 17:21:52', '2025-09-09 16:35:32'),
(53, 'boviqafih', 'Dominique', 'Conner', 'qazitug@mailinator.com', '(294) 719-9133', '$2b$10$5FMyQTqpP3nZacqeoyWjDOVoigrhcxRLp4SZo.XfDTt7O9r7tD3C2', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '662670', 0, 0, NULL, NULL, 0, '2025-08-28 01:25:33', '2025-08-28 01:25:33'),
(54, 'numuzufot', 'Slade', 'Dixon', 'zupejyton@mailinator.com', '9815618907', '$2b$10$Ya8bGxm9dJgUdYsYwp/eQ.XSK3sWfPhf4Gp0xrcLFBdpWQTRlc2vO', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '161043', 0, 0, NULL, NULL, 0, '2025-08-28 01:30:28', '2025-08-28 01:30:28'),
(55, 'wuwyteteki', 'Danielle', 'Garrison', 'wupynyte@mailinator.com', '5268741408', '$2b$10$pSmv5wkr1NgB2cMZAEFfsOnfVy86.Hbi73i2aezW/wvlFRIDx7hqu', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 16:30:44', '2025-09-09 16:30:50'),
(56, 'cixaxexyn', 'Barrett', 'Clayton', 'jurux@mailinator.com', '8213089685', '$2b$10$50uuNXjgwRjMv1LsS4oJmukmDrJl1SnXX1dtANRhqmnmlb/rXKSje', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 16:31:51', '2025-09-09 16:32:01'),
(57, 'caned', 'Elaine', 'Cervantes', 'vicatace@mailinator.com', '8587037752', '$2b$10$QlDOgg0EvBjduU/jmjM89e8yiQz9OpBs6Rf48sJNzq18KmLLx7M7C', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 16:50:28', '2025-09-09 16:50:54'),
(58, 'kedunabe', 'Dennis', 'Martinez', 'kedunabe@mailinator.com', '4183834925', '$2b$10$8TDpt19v2YtfNF1ueuZL8e0Ayfe3.kvU3PS3VD0uCj/aDi.ODZaBq', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 16:51:10', '2025-09-09 17:15:44'),
(59, 'diwibycibu', 'Channing', 'Rodriquez', 'solabyk@mailinator.com', '8734536205', '$2b$10$9hwXp8DXv3wggIK6spivIerGHPSW0JwM0RHPJRRffSX2S.sIWz8m.', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '342086', 0, 0, NULL, NULL, 0, '2025-09-09 17:32:39', '2025-09-09 17:38:04'),
(60, 'caqyw', 'Libby', 'Herman', 'bedi@mailinator.com', '1228426608', '$2b$10$YyDKfWL7VVT82dL559eZMOURktGXszd7UXGBD1iJye.f.SGcKf4Ea', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '956185', 0, 0, NULL, NULL, 0, '2025-09-09 17:49:52', '2025-09-09 18:25:12'),
(61, 'xyzaw', 'Isadora', 'Luna', 'midohoxuz@mailinator.com', '3262737222', '$2b$10$iGxsa.yqKhhCrkG4JgQZJO9/Cfp10Bsss96dqnH5LfG5lwWHZIkzS', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:17:11', '2025-09-09 18:23:14'),
(62, 'sykyfiq', 'Fredericka', 'Riggs', 'hydymijal@mailinator.com', '5978936215', '$2b$10$cMkOLa6yuYy6oRzC7au6zOv6prMTFSCM5Z9hcwmHr2SN.y0SO1/sq', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:23:42', '2025-09-09 18:23:52'),
(63, 'sysifim', 'Stephen', 'Reid', 'qypedyv@mailinator.com', '4115098506', '$2b$10$9zq6jJkGxMeBtmIGX6Os4Oucx6D5TLe2iojtYaidYH1ZV1pUekzjS', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:25:52', '2025-09-09 18:25:58'),
(64, 'jotobu', 'Candice', 'Blackwell', 'manyk@mailinator.com', '5973614759', '$2b$10$SG8zhdLniaKCKlZQDVo6veagS7ce.vD7kJgend.6Wr4E6eTgi8uAa', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:27:55', '2025-09-09 18:29:06'),
(65, 'xaheruwije', 'Tatyana', 'Jennings', 'vizi@mailinator.com', '2011031301', '$2b$10$EdsC8FFO/KkZx9jmL.w3Ve29hOgJAfbIl3pqdpZzg5S1TFeIWFi..', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:34:35', '2025-09-09 18:35:50'),
(66, 'tzdgdfgd', 'Ashton', 'Pace', 'giqaruvur@mailinator.com', '3484117644', '$2b$10$3R9p5o7LXZ5Y1GUVK21t6uiK3qq6nGogKvQjs80Gmehg5N/yRImpS', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:38:19', '2025-09-09 18:38:35'),
(67, 'vuzatanipi', 'Dorothy', 'Mccall', 'siti@mailinator.com', '2953553424', '$2b$10$9r8TQgysS4GIvxuQvXmbUuXtCHAxFn02KF3PMTGl933Myh8F8xXKG', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-09 18:45:05', '2025-09-09 18:45:53'),
(68, 'xonohuruh', 'Kylie', 'Lott', 'quxedi@mailinator.com', '7539361021', '$2b$10$g8L.RL0zlbomBJy8GAMjBOQpnlCKGPceF4LtUsu5fgttssCmNIItO', 3, NULL, 'WDO Sub', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 1, '2025-09-12 15:50:20', '2025-09-12 15:52:49'),
(69, 'kedajot', 'Quyn', 'Lang', 'sixaciv@mailinator.com', '6351714873', '$2b$10$5EeQN/RCrwlJbSPAQxV8reMyfEqGJrxdX481eFRQ.He.7ejKix8nC', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-12 16:56:33', '2025-09-12 16:56:44'),
(70, 'kusokinony', 'Quinn', 'Chambers', 'bera@mailinator.com', '9895796519', '$2b$10$Fk6yYkXsVdni4viADHnkYOcDZOU0JHPp0pAgLnirS.j3tPeEDn.FS', 3, NULL, 'Autumn Walters', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 1, '2025-09-12 19:19:27', '2025-09-12 19:22:31');

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
(14, 42, 'Hybrid', 'Automatic', 98.00, 17, 'Ex eveniet tempore', 38, 30.00, '979', '1976-02-22', 'Standard', 'Monthly', 'New', 'Placeat ut vitae al', '157 North Old Court', 'Inventore sint cum n', 'Quos et reprehenderi', 'Ut id qui velit vita', 47, 'Aut sapiente dolorem'),
(16, 44, 'CNG', 'Manual', 59.00, 67, 'Labore qui nisi rem ', 59, 18.00, '483', '1982-02-22', 'Standard', 'Weekly', 'New', 'Iste non dolore dist', '191 East Hague Lane', 'Aliquip reiciendis s', 'Ratione incidunt ve', 'Vel quia deleniti qu', 38, 'Sit autem anim rem '),
(17, 45, 'Diesel', 'Automatic', 62.00, 24, 'Doloribus ex nemo ob', 51, 48.00, '66', '2009-08-10', 'Economy', 'Daily', 'New', 'Rem natus libero eos', '926 Green Cowley Road', 'Aperiam enim amet a', 'Repellendus Modi id', 'Voluptatem Voluptat', 23, 'Autem sunt quo vel t'),
(18, 46, 'CNG', 'Manual', 33.00, 77, 'Lorem dolores labore', 13, 19.00, '330', '1991-11-05', 'Economy', 'Custom', 'Used', 'Proident dolorum su', '33 West Old Freeway', 'A atque error non mi', 'Laborum sint beatae', 'Incidunt officia et', 452000, 'In necessitatibus pr'),
(19, 47, 'Petrol', 'Manual', 81.00, 16, 'Aliqua Molestias pe', 54, 51.00, '451', '1989-04-16', 'Standard', 'Daily', 'Refurbished', 'Dicta corrupti illu', '815 Old Avenue', 'Cupiditate earum sit', 'Dolor ipsum nostrum', 'Esse commodo qui ani', 35, 'Sequi temporibus non'),
(20, 48, 'CNG', 'Automatic', 4.00, 59, 'Illo exercitation ir', 4, 97.00, '284', '1987-07-27', 'Economy', 'Daily', 'New', 'Ducimus voluptatem ', '21 East Nobel Extension', 'Minus reiciendis dui', 'Nobis quisquam volup', 'Non est nostrud haru', 332121, 'In labore autem blan'),
(21, 49, 'Electric', 'Manual', 76.00, 19, 'Est consequatur Qu', 46, 91.00, '180', '2017-07-09', 'Standard', 'Monthly', 'Refurbished', 'Ut aut deleniti temp', '623 Nobel Parkway', 'Expedita nisi volupt', 'Sit nemo in delectus', 'Dolor ad laudantium', 642211, 'Nesciunt est sunt c'),
(22, 50, 'CNG', 'Manual', 45.00, 89, 'Sunt fuga Officia ', 22, 36.00, '156', '2015-01-03', 'Standard', 'Daily', 'Refurbished', 'Nulla quam illo qui ', '12 West Green Old Road', 'Quam quis consequat', 'Sequi inventore accu', 'Mollit aut nisi sint', 813222, 'Est sint aut exerci'),
(23, 51, 'CNG', 'Automatic', 8.00, 21, 'Explicabo Quis sed ', 93, 97.00, '252', '1973-09-10', 'Luxury', 'Monthly', 'Used', 'Dolorum quo corrupti', '466 White Nobel Extension', 'Quis in modi in et e', 'Error quibusdam dist', 'Similique cupiditate', 122321, 'Omnis dolor aut non '),
(24, 52, 'CNG', 'Manual', 44.00, 34, 'Qui ullamco mollit m', 66, 77.00, '116', '1987-06-16', 'Standard', 'Daily', 'New', 'Asperiores neque vel', '96 East Nobel Drive', 'Et consequatur harum', 'Aut esse ea est elig', 'Fugiat distinctio ', 736766, 'Et minima magni eius'),
(25, 53, 'Hybrid', 'Manual', 96.00, 73, 'Rerum aut hic exerci', 87, 13.00, '921', '1986-02-01', 'Standard', 'Weekly', 'Used', 'Atque architecto cum', '44 Clarendon Parkway', 'Sed debitis molestia', 'Quia elit animi be', 'Eu maiores minim bea', 383333, 'Ea fuga Saepe velit');

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

INSERT INTO `roh_vehicle_details` (`id`, `service_provider_id`, `item_name`, `vehicle_description`, `category_id`, `tag_id`, `brand_id`, `model_id`, `image_ids`, `price_per_day`, `price_per_week`, `price_per_month`, `price_custom_day`, `item_status`, `admin_item_status`, `total_views`, `security_deposit`, `booking_terms`, `availability_status`, `add_date`, `edit_date`) VALUES
(24, 50, 'Mahindra Scorpio – Power Meets Style', 'The Big Daddy SUV – Mahindra Scorpio is known for its bold looks, powerful performance, and unmatched road presence. Whether it’s a city ride or an off-road adventure, the Scorpio is built to conquer every journey with style and comfort.', 1, 2, 3, 5, '[54,55,56,57,58,59]', 2500.00, 15000.00, 45000.00, 120000.00, 1, 1, 0, 9998.00, 'Booking amount: ₹5,000 (non-refundable)\r\n\r\nFinal payment before delivery\r\n\r\nPrice excludes RTO, insurance, and taxes\r\n\r\nDelivery subject to stock availability and clearance\r\n\r\nAccessories charged separately', 'Available', '2025-08-25 22:44:58', '2025-08-28 06:16:16'),
(25, 50, 'Hyundai i20 – Premium Hatchback', 'The Hyundai i20 is a premium hatchback that blends style, comfort, and efficiency. With its modern design, advanced features, and smooth driving experience, the i20 is the perfect choice for city commutes and weekend getaways.', 1, 2, 6, 11, '[60,61,62,63,64]', 1800.00, 11000.00, 32000.00, 69998.00, 1, 1, 0, 7000.00, 'Booking amount: ₹3,000 (non-refundable)\r\n\r\nFinal payment before delivery\r\n\r\nPrice excludes fuel, tolls, RTO, insurance, and taxes\r\n\r\nDelivery subject to availability and clearance\r\n\r\nAccessories charged separately', 'Available', '2025-08-25 22:56:55', '2025-08-28 06:16:19'),
(26, 50, 'BMW S1000RR', 'The S1000RR is BMW\'s flagship sportsbike that is known for its top-end performance, modern safety electronics and excellent handling abilities. But just like other BMWs, the S1000RR is also expensive to purchase and maintain', 1, 2, 5, 9, '[65,66,67,68]', 1200.00, 8000.00, 25000.00, 45000.00, 1, 1, 0, 596.00, 'No Booking terms for S1000RR. ', 'Available', '2025-08-30 04:38:18', '2025-09-06 22:13:48'),
(42, 20, 'Elizabeth Michael', 'Et do do dignissimos', 1, 1, 1, 1, '[69]', 566.00, 455.00, 94.00, 659.00, 1, 1, 0, 37.00, 'Et labore dolore et ', 'Available', '2025-09-04 01:13:26', '2025-09-06 21:58:55'),
(44, 20, 'Linus Adkins', 'Quae reprehenderit a', 1, 1, 1, 1, '[71,72,73,74]', 582.00, 602.00, 711.00, 919.00, 1, 1, 0, 8.00, 'Facere aspernatur id', 'Available', '2025-09-04 01:47:19', '2025-09-06 21:58:58'),
(45, 20, 'Hiram Rivers', 'Veniam nihil quod e', 1, 1, 1, 1, '[75,76,77,78]', 653.00, 967.00, 5.00, 529.00, 1, 1, 0, 12.00, 'Duis hic id minim au', 'Booked', '2025-09-04 22:19:19', '2025-09-06 21:59:01'),
(46, 50, 'Chancellor Cain', 'Dolore cum eos nisi', 1, 1, 1, 1, '[79,80,81,82,83]', 87.00, 597.00, 358.00, 62.00, 1, 1, 0, 56.00, 'Harum deleniti qui d', 'Available', '2025-09-04 22:58:46', '2025-09-06 23:45:09'),
(47, 50, 'Declan Hester', 'Vel earum ratione te', 1, 1, 3, 5, '[87]', 532.00, 411.00, 39.00, 533.00, 1, 1, 0, 69.00, 'Illum quisquam elit', 'Available', '2025-09-06 23:15:26', '2025-09-07 20:58:17'),
(48, 50, 'Clio Garza', 'Excepteur laudantium', 1, 1, 3, 6, '[88]', 854.00, 850.00, 794.00, 649.00, 1, 1, 0, 40.00, 'Mollit dolor nostrum', 'Booked', '2025-09-07 21:26:33', '2025-09-08 21:58:53'),
(49, 68, 'Olga King', 'Sed ipsum iste volup', 1, 1, 3, 6, '[89]', 548.00, 272.00, 374.00, 677.00, 1, 1, 0, 23.00, 'Proident do dolor d', 'Booked', '2025-09-12 21:22:49', '2025-09-12 21:22:49'),
(50, 70, 'Katelyn Beach', 'Rerum neque facilis ', 1, 1, 3, 6, '[90,91,92,93]', 232.00, 496.00, 203.00, 839.00, 1, 1, 0, 66.00, 'Quo suscipit officia', 'Unavailable', '2025-09-13 00:52:31', '2025-09-13 00:52:31'),
(51, 50, 'Dustin Cherry', 'Nisi veniam dolore ', 1, 1, 3, 5, '[94]', 132.00, 672.00, 539.00, 728.00, 1, 1, 0, 91.00, 'Lorem non provident', 'Unavailable', '2025-09-15 22:09:29', '2025-09-15 22:09:29'),
(52, 50, 'Susan Parks', 'Est iusto sed expedi', 1, 1, 3, 6, '[95]', 745.00, 216.00, 436.00, 994.00, 1, 1, 0, 80.00, 'Ea sed nostrud animi', 'Unavailable', '2025-09-15 22:14:25', '2025-09-15 22:14:25'),
(53, 50, 'Seth Garza', 'Duis pariatur Quis ', 1, 1, 3, 6, '[97]', 158.00, 803.00, 409.00, 548.00, 1, 1, 0, 82.00, 'Repellendus Odio ei', 'Booked', '2025-09-15 22:24:40', '2025-09-15 22:24:40');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roh_categories`
--
ALTER TABLE `roh_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roh_cities`
--
ALTER TABLE `roh_cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `roh_models`
--
ALTER TABLE `roh_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roh_roles`
--
ALTER TABLE `roh_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roh_routes`
--
ALTER TABLE `roh_routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roh_states`
--
ALTER TABLE `roh_states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `roh_tags`
--
ALTER TABLE `roh_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `roh_vehicle_details`
--
ALTER TABLE `roh_vehicle_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
