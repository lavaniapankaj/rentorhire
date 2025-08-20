-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 20, 2025 at 09:16 PM
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
(4, 'Volkswagen', 2, 0, 1, 1, 1, '2025-08-19 14:30:53', '2025-08-19 14:30:53');

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
(1, 'Vehicle', 'A broad category that includes all types of transport modes, such as cars, bikes, trucks, and recreational vehicles. Vehicles are essential for personal, commercial, and leisure travel, offering diverse options for different purposes, from daily commuting to long-distance journeys and business logistics.', 'vehicle', NULL, 1, 1, 1, '2025-08-05 17:11:45', '2025-08-05 17:21:24'),
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
(20, 'vishnu-2-2.jpeg', '/media/users/profile/', 'jpeg', 1, '2025-08-01 17:18:25', '2025-08-02 16:13:18');

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
(1, 'Altroz', 1, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(2, 'Punch', 1, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(3, 'Baleno', 2, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(4, 'Swift', 2, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(5, 'Scorpio S11 Classic', 3, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(6, 'ScorpioN', 3, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(7, 'Virtus', 4, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25'),
(8, 'Taigun', 4, 0, 1, 1, 1, '2025-08-19 14:33:25', '2025-08-19 14:33:25');

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
  `address_1` varchar(100) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `authorize_code` varchar(7) DEFAULT NULL,
  `verified` int(5) NOT NULL,
  `add_id` int(11) DEFAULT NULL,
  `edit_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `add_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `edit_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roh_users`
--

INSERT INTO `roh_users` (`user_id`, `user_name`, `first_name`, `last_name`, `email`, `phone_number`, `password_hash`, `user_role_id`, `profile_picture_url`, `address_1`, `landmark`, `state`, `city`, `pincode`, `authorize_code`, `verified`, `add_id`, `edit_id`, `active`, `add_date`, `edit_date`) VALUES
(1, 'Super Admin', 'Super', 'Admin', 'superadmin@gmail.com', '9012345678', '$2b$10$xdm/c.8Yh4o9VBQnAqvZW.GImjKMS3tYM/YMIJDsTRqv5YkQyKUcC', 1, '25', 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 1, 19, 1, '2025-07-13 11:26:08', '2025-08-12 17:24:12'),
(2, 'Service Provider', 'Service', 'Provider', 'serviceprovider@gmail.com', '9012345678', '$2b$10$VswYxyPGRuYuU/1IFkMS1uAgYybZCvHIwhb93CFUtmyHUZyddYFf.', 2, '', 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, 1, 1, 1, 1, '2025-07-13 11:27:31', '2025-08-12 17:24:15'),
(18, 'lavaniapankaj', 'Pankaj ', 'Verma', 'lavaniapankaj@gmail.com', '9876543210', '$2b$10$fwpmVvn/RVr3d/cbedmo8eTTxBebn0XhKtfXQt4dHk32IkBZFw8bG', 1, '1', '13th Street', '47 W 13th St, New York, NY 10011, USA', 'New York', 'CT', 10011, NULL, 1, 1, 0, 1, '2025-07-29 18:19:15', '2025-08-12 17:24:19'),
(19, 'ecmascript', 'Vishnu', 'Kumawat', 'ecmascript.php@gmail.com', '9783457008', '$2b$10$bVzM.eJjjhU7boZzNEE8aul7iycXabXaDmIuQAB9CXMTfDLP/v8hC', 1, '2', 'Stuyvesant 14th St & 1st Ave ', '238 1st Ave, New York, NY 10009, USA', 'New York', 'CT', 10009, NULL, 1, 1, 0, 1, '2025-07-29 18:32:46', '2025-08-12 17:24:21'),
(20, 'rajtailor9694', 'Raj', 'Tailor', 'rajtailor9694@gmail.com', '9694453829', '$2b$10$9CqGEjQCtkD9W1HI0cUFT.iHNyJNozCtDaucVM4lMkYDeBIT0DwMa', 1, '3', 'Stuyvesant 14th St & Ave ', 'C 690 E 14th St, New York, NY 10009, USA', 'Nwy York', 'CT', 10009, NULL, 1, 1, 0, 1, '2025-07-29 18:38:25', '2025-08-12 17:24:23'),
(44, 'rudrax', 'Raymond', 'Foster', 'bowijen@mailinator.com', '9999999999', '$2b$10$qchWQg.7/f.OvDEqes6MqeulRouWGrswPU5IFWhE4Ablj/rmdKIqq', 3, NULL, '', '', '', '', 123456, NULL, 1, NULL, NULL, 1, '2025-08-13 15:40:33', '2025-08-15 18:12:07');

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
-- Indexes for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
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
-- AUTO_INCREMENT for table `roh_categories`
--
ALTER TABLE `roh_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roh_cities`
--
ALTER TABLE `roh_cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `roh_media_gallery`
--
ALTER TABLE `roh_media_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `roh_roles`
--
ALTER TABLE `roh_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `roh_vehicle_attributes`
--
ALTER TABLE `roh_vehicle_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roh_vehicle_details`
--
ALTER TABLE `roh_vehicle_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
