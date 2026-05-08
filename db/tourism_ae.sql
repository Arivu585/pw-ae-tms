-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 07, 2026 at 12:25 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tourism_ae`
--
CREATE DATABASE IF NOT EXISTS `tourism_ae` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tourism_ae`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(100) NOT NULL,
  `amail` varchar(100) NOT NULL,
  `apass` varchar(100) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`aid`, `aname`, `amail`, `apass`) VALUES
(1, 'Admin', 'admin@mail.com', 'admin'),
(2, 'admin1', 'admin1@mail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking`
--

CREATE TABLE IF NOT EXISTS `tbl_booking` (
  `bkid` int(11) NOT NULL AUTO_INCREMENT,
  `pkid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `fdate` date NOT NULL,
  `tdate` date NOT NULL,
  `remarks` varchar(1000) NOT NULL,
  PRIMARY KEY (`bkid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_booking`
--

INSERT INTO `tbl_booking` (`bkid`, `pkid`, `uid`, `fdate`, `tdate`, `remarks`) VALUES
(1, 2, 2, '2024-08-19', '2024-08-19', '-');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enquiry`
--

CREATE TABLE IF NOT EXISTS `tbl_enquiry` (
  `eqid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`eqid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_enquiry`
--

INSERT INTO `tbl_enquiry` (`eqid`, `uid`, `subject`, `content`, `date`) VALUES
(1, 2, 'IV for kerala', 'we want buses for IV and have more 500 students . How may buses may need for ?', '2024-08-19');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_packages`
--

CREATE TABLE IF NOT EXISTS `tbl_packages` (
  `pkid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` double(10,2) NOT NULL,
  `descp` varchar(1000) NOT NULL,
  `feature` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`pkid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `tbl_packages`
--

INSERT INTO `tbl_packages` (`pkid`, `name`, `type`, `location`, `price`, `descp`, `feature`, `image`) VALUES
(6, 'Mettur Express', 'Family', 'salem', 12000.00, 'wonderful trip', '-', 'Package-1724653605787.jpg'),
(7, 'Z Express', 'friends', 'yercard', 15000.00, 'wonderful Trip', '-', 'Package-1724653756114.jpg'),
(8, 'Komban', 'College', 'Salem', 10000.00, '-', '-', 'Package-1724658223000.jpg'),
(9, 'Vetri Express', 'Family', 'Thirchy', 7000.00, '-', '-', 'Package-1724658277404.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pages`
--

CREATE TABLE IF NOT EXISTS `tbl_pages` (
  `pgid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `content` varchar(10000) NOT NULL,
  PRIMARY KEY (`pgid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_pages`
--

INSERT INTO `tbl_pages` (`pgid`, `type`, `image`, `content`) VALUES
(2, 'about', 'Page-1724653386973.jpeg', 'tourism Management System is a comprehensive software designed for the travel industry. It is a dynamic and responsive system that addresses issues such as document management, lost records due to human error, etc. The goal is to create a system that handles all aspects of travel, such as scheduling, excursions, etc.'),
(3, 'contact', 'Page-1724653397168.jpeg', 'tourism Management System is a comprehensive software designed for the travel industry. It is a dynamic and responsive system that addresses issues such as document management, lost records due to human error, etc. The goal is to create a system that handles all aspects of travel, such as scheduling, excursions, etc.');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`uid`, `uname`, `pass`, `contact`, `mail`) VALUES
(1, 'user', 'user', '86877687687', 'user@mail.com'),
(2, 'tst', '1234', '57567766', 'tst@tst.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
