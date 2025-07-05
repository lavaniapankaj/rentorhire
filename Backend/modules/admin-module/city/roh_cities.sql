-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2025 at 09:00 PM
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
-- Indexes for dumped tables
--

--
-- Indexes for table `roh_cities`
--
ALTER TABLE `roh_cities`
  ADD PRIMARY KEY (`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roh_cities`
--
ALTER TABLE `roh_cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
