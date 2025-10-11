-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 11, 2025 at 10:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
(1, 'Vehicles', 'A broad category that includes all types of transport modes, such as cars, bikes, trucks, and recreational vehicles. Vehicles are essential for personal, commercial, and leisure travel, offering diverse options for different purposes, from daily commuting to long-distance journeys and business logistics.', 'vehicles', NULL, 1, 1, 1, '2025-08-05 17:11:45', '2025-09-22 06:34:08'),
(2, 'Cars', 'A wide range of vehicles for personal transportation, including various types like sedans, hatchbacks, and SUVs. Suitable for everyday commuting, family trips, and more.', 'cars', 1, 1, 1, 1, '2025-08-05 17:12:34', '2025-08-05 17:12:34'),
(3, 'Bikes', 'Includes motorcycles and bicycles for personal use, from high-speed sports bikes to commuter-friendly models. Ideal for short trips, daily commutes, or adventure riding.', 'bikes', 1, 1, 1, 1, '2025-08-05 17:12:53', '2025-08-05 17:12:53'),
(4, 'Commercial Vehicles', 'Vehicles designed for business purposes such as trucks, delivery vans, and buses. Used for transporting goods, passengers, or as part of a fleet for logistics and service industries.', 'commercial-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:28', '2025-08-05 17:13:28'),
(5, 'Luxury Vehicles', 'High-end cars and bikes offering exceptional comfort, performance, and design. Includes premium brands and models meant for those who seek an elite driving experience.', 'luxury-vehicles', 1, 1, 1, 1, '2025-08-05 17:13:51', '2025-08-05 17:13:51'),
(6, 'Recreational Vehicles', 'Vehicles designed for leisure activities, including motorhomes, campervans, and RVs. Perfect for road trips, outdoor adventures, and extended vacations.', 'recreational-vehicles', 1, 1, 1, 1, '2025-08-05 17:14:11', '2025-08-05 17:14:11');

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
(102, 'photo-1614200179396-2bdb77ebf81b-1.jpeg', '/uploads/media/host/items/', 'jpeg', 1, '2025-09-30 09:29:57', '2025-09-30 09:29:57');

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
  `add_date` datetime DEFAULT current_timestamp(),
  `edit_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Super Admin', 'Super', 'Admin', 'superadmin@gmail.com', '9012345678', '$2b$10$8P.0ga2QxTP9S27V38vFneIdKJr0YZ1Y9rD79aWZoNHzBNrT5vZQq', 1, '25', NULL, 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 0, 1, 1, 1, '2025-07-13 11:26:08', '2025-09-11 12:36:16'),
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
(50, 'rent_or_hire', 'Den', 'Cook', 'roh@hosting.com', '9876543219', '$2b$10$TwK0imHqaYotk9QvtG0aiu65rXvC4gBHxAnm26vXGY77eWDNkOMZq', 3, NULL, 'Zahir Gallegos', 'Jaipur', '', '', '', 302012, '999000', 1, 1, NULL, NULL, 1, '2025-08-27 17:16:42', '2025-09-10 11:32:53'),
(51, 'vedoq', 'Jenette', 'Cannon', 'huqinileju@mailinator.com', '5317534899', '$2b$10$VFU5t7sxh9TVa8Jd.dmUiuKQtDU8sS13QWmqmC3WZKnytHuoIum5W', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-08-27 17:18:00', '2025-08-27 17:20:13'),
(52, 'pidawoh', 'Lunea', 'Nolan', 'lyhede@mailinator.com', '1982856472', '$2b$10$GY2KBR7dPhpa.RMI3KziIuoLXQkQFTtiSIJ0edp8JuKzHZXTAmtBm', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-08-27 17:21:52', '2025-08-27 17:22:01'),
(53, 'boviqafih', 'Dominique', 'Conner', 'qazitug@mailinator.com', '(294) 719-9133', '$2b$10$5FMyQTqpP3nZacqeoyWjDOVoigrhcxRLp4SZo.XfDTt7O9r7tD3C2', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '662670', 0, 0, NULL, NULL, 0, '2025-08-28 01:25:33', '2025-08-28 01:25:33'),
(54, 'numuzufot', 'Slade', 'Dixon', 'zupejyton@mailinator.com', '9815618907', '$2b$10$Ya8bGxm9dJgUdYsYwp/eQ.XSK3sWfPhf4Gp0xrcLFBdpWQTRlc2vO', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '161043', 0, 0, NULL, NULL, 0, '2025-08-28 01:30:28', '2025-08-28 01:30:28'),
(55, 'faxapevy', 'Orlando', 'Cochran', 'jeluse@mailinator.com', '3241124441', '$2b$10$6I8.P6V462iIwn4u5o3HOub4g7A6Vi173.J60NrYoIM79qHeAJ0dC', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-10 10:28:35', '2025-09-10 10:32:38'),
(56, 'tuwec', 'Keely', 'Summers', 'wihahyfuti@mailinator.com', '8568577505', '$2b$10$2421X7kibh0Thyz1TF/bC.A6apC1MTrZ6FI8GRcD47aHtXheu/qPe', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-11 11:19:11', '2025-09-11 11:19:28'),
(57, 'xucucudu', 'Cooper', 'Dudley', 'muxodizo@mailinator.com', '5973865345', '$2b$10$n5NGCQ6lRgg3TZVtKkDpT.wqdE.O3xt1KIEg2pi.fQBC43Me/wkqe', 3, NULL, NULL, '954 Old Boulevard', 'Beatae exercitation ', 'Exercitation et aut ', 'Aute eum quia obcaec', 117023, NULL, 0, 0, 1, 0, 1, '2025-09-11 12:37:50', '2025-09-11 12:37:50'),
(58, 'xepezup', 'Leo', 'Hull', 'homimega@mailinator.com', '6573493789', '$2b$10$rQ94RrAaMvRPjWEMzcEvR.CZQaQyTbaU.MpxHUAQ/4iyNFlcnneQi', 3, NULL, NULL, '66 South Hague Court', 'Voluptate enim amet', 'Atque ipsam qui qui ', 'Aut quidem dolorem n', 967317, NULL, 0, 0, 1, 0, 1, '2025-09-11 12:38:24', '2025-09-11 12:38:24'),
(59, 'desyqa', 'Yasir', 'Huber', 'xowe@mailinator.com', '1231231233', '$2b$10$t5M9LSB50t7k2le/QRMj7uzwnSk6tOCsYuHswQwiM7/7Lv/lRz/dG', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-12 11:06:46', '2025-09-12 11:06:56'),
(60, 'nomedohec', 'Damian', 'Chen', 'qygahu@mailinator.com', '9876543210', '$2b$10$MUbnUlJfkbMq7j4m4zjFRu3RpEomAGs/0seSz1v6TvrC7d5X.Qb5.', 3, NULL, 'Ray Acevedo', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 1, '2025-09-12 11:43:51', '2025-09-12 11:45:06'),
(61, 'tivakakone', 'Channing', 'Roth', 'wyjuwe@mailinator.com', '6281716438', '$2b$10$uNPd79F2GHqjIxY4LYQwa.ab721d.BCq4FauhPa9Oze0sGvtZbGcG', 2, NULL, NULL, '21 North Old Boulevard', 'Quaerat at accusamus', 'Ad nesciunt at opti', 'Est in dolor recusa', 737906, NULL, 0, 0, 1, 0, 1, '2025-09-17 12:55:28', '2025-09-17 12:55:28'),
(62, 'julasu', 'Barry', 'Downs', 'macajizeh@mailinator.com', '9243441884', '$2b$10$8V0sHK4aRNx.b8ofH.2fh.QfOkV.x60j.ZLWsjsEa0n1R5.qRK20m', 2, '97', NULL, '80 Milton Road', 'Non consequatur Ips', 'Dignissimos aspernat', 'Consequat Recusanda', 384450, NULL, 0, 0, 1, 0, 1, '2025-09-17 13:06:01', '2025-09-17 13:06:01'),
(63, 'hikip', 'Camden', 'Mcdaniel', 'fecomiqugi@mailinator.com', '5044132519', '$2b$10$.j.XQdONNfzXMEOQaJ5S0.kPUaSVUK3gQGR6chcZbeKBI6mjk03zq', 3, NULL, 'Car Rent Market MP', 'Laborum aliquam illo', 'Alias ex in amet om', 'Karnataka', 'Dolore assumenda dol', 302019, NULL, 0, 1, NULL, NULL, 0, '2025-09-19 07:10:29', '2025-09-25 12:17:18'),
(64, 'gysoqasos', 'Penelope', 'Terry', 'foro@mailinator.com', '5128623573', '$2b$10$vps5ARpo8qzq.3jLpQqONeixGXPiAzElcq0wh88vwBO3mmLG/BYIC', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-25 12:17:58', '2025-09-25 12:19:06'),
(65, 'nenamat', 'Rina', 'Stephenson', 'gitabife@mailinator.com', '9568021864', '$2b$10$Yo9h0z6Q0X31gQkrTLkTW.WshI1EQ8seYV9gAiW3lAgQ0kjF3WMH6', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-26 11:12:02', '2025-09-26 11:12:14'),
(66, 'bedaz', 'Lars', 'Vance', 'paxoriq@mailinator.com', '4849876089', '$2b$10$RRy1P/MYNMx628W12bbWAOZhZNwUMkoSTLSpzai7oGybpmdZ4DOwm', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-26 12:28:22', '2025-09-26 12:28:33'),
(67, 'kotox', 'Nomlanga', 'Battle', 'banabi@mailinator.com', '7422419233', '$2b$10$6SImg0Dri7tmWaoIXGKv/u8YjUk/ts6ajbxDzf0c9iiLC10poNUL2', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, 1, '2025-09-26 12:29:44', '2025-09-26 12:29:59');

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
(21, 49, 'Diesel', 'Automatic', 15.00, 56, 'Quo laboris exercita', 10, 17.00, '30', '2017-10-05', 'Standard', 'Monthly', 'New', 'Dignissimos cum veli', '697 Cowley Freeway', 'Itaque amet quo mol', 'Animi est mollit du', 'Illum nemo quis ad ', 132222, 'Voluptatem Dolor pe'),
(22, 50, 'Hybrid', 'Manual', 17.00, 84, 'Error eaque sint ea', 4, 74.00, '149', '1980-02-02', 'Standard', 'Custom', 'Refurbished', 'Ea eu eveniet verit', '91 Cowley Lane', 'Dolore in cumque nis', 'Nemo accusantium acc', 'Lorem dolores corrup', 294564, 'Numquam dolores et m'),
(23, 51, 'Hybrid', 'Manual', 84.00, 49, 'Voluptatibus non ist', 5, 54.00, '601', '2019-06-24', 'Economy', 'Daily', 'Refurbished', 'In cupidatat repelle', '80 White Oak Lane', 'Ex occaecat quis in ', 'Ad aspernatur dolore', 'Saepe non itaque est', 482222, 'Iste anim officiis e'),
(24, 52, 'CNG', 'Manual', 28.00, 32, 'Facilis ad quaerat q', 16, 54.00, '394', '1983-02-20', 'Luxury', 'Weekly', 'Refurbished', 'Voluptates exercitat', '970 East Green New Court', 'Quis qui id consecte', 'Sint iste voluptatu', 'Ut explicabo Dolore', 924444, 'Et in rerum alias ma'),
(25, 53, 'Diesel', 'Automatic', 40.00, 47, 'Tempore repellendus', 49, 24.00, '53', '1989-08-14', 'Standard', 'Daily', 'Refurbished', 'Dolorum enim sed ill', '59 South White Oak Boulevard', 'Amet reprehenderit', 'Rerum corporis optio', 'Neque officia volupt', 777779, 'Dolores illo volupta'),
(26, 54, 'Hybrid', 'Manual', 80.00, 12, 'Dicta obcaecati veli', 90, 98.00, '439', '2019-08-11', 'Luxury', 'Daily', 'Used', 'Proident id et rem ', '22 Old Avenue', 'Qui deserunt cupidat', 'Proident magni quo ', 'Et error ut irure in', 222482, 'Sit ipsum dolorum v'),
(27, 55, 'CNG', 'Automatic', 44.00, 32, 'Non ab laudantium e', 2, 89.00, '11', '1975-06-02', 'Luxury', 'Custom', 'Refurbished', 'Omnis voluptatem atq', '473 First Road', 'Ea quo nostrud saepe', 'Beatae et non volupt', 'Autem quis fugiat o', 333342, 'Temporibus excepteur'),
(28, 56, 'CNG', 'Automatic', 13.00, 1, 'Excepteur velit ea ', 16, 81.00, '323', '1974-10-13', 'Standard', 'Daily', 'Refurbished', 'Exercitation dolor q', '151 White First Extension', 'Mollit aliquip aut f', 'Obcaecati odit ut se', 'Quae ut deserunt sun', 279022, 'Quibusdam consequatu'),
(29, 57, 'Electric', 'Manual', 18.00, 39, 'Corporis esse asperi', 41, 26.00, '977', '2018-05-07', 'Economy', 'Monthly', 'New', 'Quasi repudiandae ad', '684 Clarendon Street', 'Voluptatem consectet', 'Et in quisquam et ul', 'Dolor ea commodi in ', 812222, 'Totam sint quas veri');

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
(42, 20, 'Elizabeth Michael', 'Et do do dignissimos', 1, NULL, 1, 1, 1, '[69]', 566.00, 455.00, 94.00, 659.00, 1, 1, 0, 37.00, 'Et labore dolore et ', 'Available', '2025-09-04 01:13:26', '2025-09-06 21:58:55'),
(44, 20, 'Linus Adkins', 'Quae reprehenderit a', 1, NULL, 1, 1, 1, '[71,72,73,74]', 582.00, 602.00, 711.00, 919.00, 1, 1, 0, 8.00, 'Facere aspernatur id', 'Available', '2025-09-04 01:47:19', '2025-09-06 21:58:58'),
(45, 20, 'Hiram Rivers', 'Veniam nihil quod e', 1, NULL, 1, 1, 1, '[75,76,77,78]', 653.00, 967.00, 5.00, 529.00, 1, 1, 0, 12.00, 'Duis hic id minim au', 'Booked', '2025-09-04 22:19:19', '2025-09-06 21:59:01'),
(46, 50, 'Chancellor Cain', 'Dolore cum eos nisi', 1, NULL, 1, 1, 1, '[79,80,81,82,83]', 87.00, 597.00, 358.00, 62.00, 1, 1, 0, 56.00, 'Harum deleniti qui d', 'Available', '2025-09-04 22:58:46', '2025-09-10 16:49:47'),
(47, 50, 'Declan Hester', 'Vel earum ratione te', 1, NULL, 1, 3, 5, '[87]', 532.00, 411.00, 39.00, 533.00, 1, 1, 0, 69.00, 'Illum quisquam elit', 'Available', '2025-09-06 23:15:26', '2025-09-07 20:58:17'),
(48, 50, 'Clio Garza', 'Excepteur laudantium', 1, NULL, 1, 3, 6, '[88]', 854.00, 850.00, 794.00, 649.00, 1, 1, 0, 40.00, 'Mollit dolor nostrum', 'Booked', '2025-09-07 21:26:33', '2025-09-07 21:32:03'),
(49, 50, 'Vincent Walker', 'Odit incididunt occa', 1, NULL, 1, 3, 6, '[89,90]', 346.00, 776.00, 945.00, 112.00, 1, 1, 0, 62.00, 'Do et quis a enim qu', 'Booked', '2025-09-10 17:42:52', '2025-09-10 17:42:52'),
(50, 60, 'Roth Rodriguez', 'Non fugiat libero ul', 1, NULL, 1, 3, 6, '[91]', 290.00, 522.00, 874.00, 763.00, 1, 1, 0, 83.00, 'Placeat laborum sus', 'Available', '2025-09-12 17:15:06', '2025-09-12 17:15:06'),
(51, 50, 'Price Conner', 'Aspernatur laborum d', 1, NULL, 1, 3, 6, '[92,93]', 937.00, 317.00, 834.00, 414.00, 1, 1, 0, 37.00, 'Aut quam iure ut ali', 'Available', '2025-09-15 17:07:29', '2025-09-15 17:07:29'),
(52, 50, 'Keegan Castaneda', 'Rerum excepturi corp', 1, NULL, 1, 3, 6, '[95]', 87.00, 731.00, 670.00, 433.00, 1, 1, 0, 87.00, 'Quisquam beatae sapi', 'Unavailable', '2025-09-15 17:22:42', '2025-09-15 17:22:42'),
(53, 63, 'Elliott Hoffman', 'Illo asperiores aper', 1, NULL, 1, 3, 6, '[98,99]', 713.00, 666.00, 846.00, 69.00, 1, 1, 0, 48.00, 'Quidem enim dolorem ', 'Unavailable', '2025-09-19 12:43:21', '2025-09-19 12:43:21'),
(54, 50, 'Rudyard Valdez', 'Harum unde quasi fac', 1, NULL, 1, 3, 6, '[100]', 873.00, 117.00, 764.00, 675.00, 1, 1, 0, 53.00, 'Quibusdam doloremque', 'Booked', '2025-09-22 12:05:50', '2025-09-22 12:05:50'),
(55, 50, 'Ciara Campos', 'Est esse dolor unde', 1, NULL, 1, 3, 6, '[101,102]', 552.00, 539.00, 990.00, 646.00, 1, 1, 0, 85.00, 'Consequatur dolores', 'Available', '2025-09-30 14:59:57', '2025-09-30 14:59:57'),
(56, 50, 'Maisie Singleton', 'Doloremque corrupti', 1, NULL, 1, 3, 6, '[]', 998.00, 944.00, 91.00, 24.00, 1, 1, 0, 10.00, 'Voluptatem Quae cor', 'Unavailable', '2025-10-01 17:53:27', '2025-10-01 17:53:27'),
(57, 50, 'Fulton Compton', 'Animi atque odit ut', 1, NULL, 1, 3, 6, '[]', 639.00, 559.00, 63.00, 841.00, 1, 1, 0, 32.00, 'Voluptate do saepe a', 'Booked', '2025-10-01 17:55:27', '2025-10-01 17:55:27');

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
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `roh_models`
--
ALTER TABLE `roh_models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roh_posts`
--
ALTER TABLE `roh_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `roh_vehicle_details`
--
ALTER TABLE `roh_vehicle_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
