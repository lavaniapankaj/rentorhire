-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 09, 2025 at 04:59 PM
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
(1, 'wdo_raj', 'WDO', 'Raj', 'wdoraj@gmail.com', '9012345678', '1234@raj', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-07-08 17:41:08', '2025-07-08 17:41:08'),
(2, 'wdo_raj_1', 'WDO', 'Raj', 'wdoraj_1@gmail.com', '9012345678', '1234@raj', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-07-08 17:41:40', '2025-07-08 17:41:40'),
(3, 'wdo_raj_2', 'WDO', 'Raj', 'wdoraj_2@gmail.com', '9012345678', '$2b$10$iwlqdU5/rKJl9.sNJTIhV.3XnuzOl9CrkKmV5YXcOpL84ZrkPACza', 2, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-07-08 17:49:38', '2025-07-08 17:49:38'),
(4, 'wdo_raj_3', 'WDO', 'Raj', 'wdoraj3@gmail.com', '9012345678', '$2b$10$WhkiAU9zYd5qAKfPsGodYuZvgzb0VDaFuCkqyFcAhdD94cCld03SS', 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-07-08 18:38:13', '2025-07-08 18:38:13'),
(5, 'wdo_raj_4', 'WDO', 'Raj', 'wdoraj_3@gmail.com', '9012345678', '$2b$10$sOnRhRfA80xgyiFxTd87NeYECRqqjF9gmGb4x9/goFEuR47IxvI8S', 2, '', 'Test address 1', 'Test landmark', 'jaipur', 'Rajasthan', 302018, NULL, NULL, 1, '2025-07-08 18:52:12', '2025-07-08 18:52:12'),
(6, 'wdo_raj_5', 'WDO', 'Raj', 'wdoraj4@gmail.com', '9012345678', '$2b$10$ntL5kjHu3128No.yUD.3ieP8RxQllL9Hngu2kiINPhFfTcxiBGynC', 3, '', 'Test address 2', 'Test landmark', 'Sikar', 'Rajasthan', 302001, NULL, NULL, 1, '2025-07-08 18:55:14', '2025-07-08 18:55:14');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `roh_users`
--
ALTER TABLE `roh_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
