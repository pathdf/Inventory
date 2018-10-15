-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.27


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema inventory
--

CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

--
-- Definition of table `item_vendor_assn`
--

DROP TABLE IF EXISTS `item_vendor_assn`;
CREATE TABLE `item_vendor_assn` (
  `item_vendor_assn_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_item_id` int(11) NOT NULL,
  `fk_vendor_id` int(11) NOT NULL,
  PRIMARY KEY (`item_vendor_assn_id`),
  KEY `fk_item_id` (`fk_item_id`),
  KEY `fk_vendor_id` (`fk_vendor_id`),
  CONSTRAINT `item_vendor_assn_ibfk_1` FOREIGN KEY (`fk_item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `item_vendor_assn_ibfk_2` FOREIGN KEY (`fk_vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_vendor_assn`
--

/*!40000 ALTER TABLE `item_vendor_assn` DISABLE KEYS */;
INSERT INTO `item_vendor_assn` (`item_vendor_assn_id`,`fk_item_id`,`fk_vendor_id`) VALUES 
 (15,2,4),
 (16,2,6);
/*!40000 ALTER TABLE `item_vendor_assn` ENABLE KEYS */;


--
-- Definition of table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_name` (`item_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`item_id`,`item_name`,`status`) VALUES 
 (1,'ABC','Active'),
 (2,'Parle-G','Active'),
 (5,'ABCd','Active'),
 (6,'ABCde','Active'),
 (7,'Tiger','Active'),
 (8,'Maggi','Active'),
 (9,'1111111111111111','Active'),
 (10,'hfhg@7687jhg...','Active');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;


--
-- Definition of table `persistent_logins`
--

DROP TABLE IF EXISTS `persistent_logins`;
CREATE TABLE `persistent_logins` (
  `username` varchar(64) NOT NULL,
  `series` varchar(64) NOT NULL,
  `token` varchar(64) NOT NULL,
  `last_used` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`series`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `persistent_logins`
--

/*!40000 ALTER TABLE `persistent_logins` DISABLE KEYS */;
INSERT INTO `persistent_logins` (`username`,`series`,`token`,`last_used`) VALUES 
 ('Pankaj','J+ptN3vO5x61wc4mQ9i10w==','9n29hW+UcsPG317DGI+m5Q==','2018-10-15 01:07:16'),
 ('Deepak','t29A51l4BAp1ncxZKTqOZQ==','2d9HPAwzxijcomgt66OcUw==','2018-10-15 11:49:24');
/*!40000 ALTER TABLE `persistent_logins` ENABLE KEYS */;


--
-- Definition of table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_item_vendor_assn_id` int(11) NOT NULL,
  `price_per_quantity` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `fk_item_vendor_assn_id` (`fk_item_vendor_assn_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`fk_item_vendor_assn_id`) REFERENCES `item_vendor_assn` (`item_vendor_assn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase`
--

/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;


--
-- Definition of table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  `status` varchar(10) DEFAULT 'Active',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `max_tries` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`,`username`,`password`,`enabled`,`status`,`last_login`,`max_tries`) VALUES 
 (1,'Pankaj','pankaj123',1,'Active','2018-09-26 23:06:39',0),
 (2,'Deepak','deepak123',1,'Active','2018-09-26 23:06:39',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


--
-- Definition of table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role` varchar(30) NOT NULL,
  PRIMARY KEY (`user_role_id`),
  UNIQUE KEY `user_role` (`user_role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`user_role_id`,`user_role`) VALUES 
 (1,'Admin'),
 (2,'User');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;


--
-- Definition of table `user_user_role_assn`
--

DROP TABLE IF EXISTS `user_user_role_assn`;
CREATE TABLE `user_user_role_assn` (
  `user_user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user_id` int(11) NOT NULL,
  `fk_user_role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_user_role_id`),
  KEY `fk_user_id` (`fk_user_id`),
  KEY `fk_user_role_id` (`fk_user_role_id`),
  CONSTRAINT `user_user_role_assn_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_user_role_assn_ibfk_2` FOREIGN KEY (`fk_user_role_id`) REFERENCES `user_roles` (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_user_role_assn`
--

/*!40000 ALTER TABLE `user_user_role_assn` DISABLE KEYS */;
INSERT INTO `user_user_role_assn` (`user_user_role_id`,`fk_user_id`,`fk_user_role_id`) VALUES 
 (1,1,1),
 (2,1,2),
 (3,2,1);
/*!40000 ALTER TABLE `user_user_role_assn` ENABLE KEYS */;


--
-- Definition of table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
CREATE TABLE `vendors` (
  `vendor_id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `vendor_name` (`vendor_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendors`
--

/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` (`vendor_id`,`vendor_name`,`address`,`contact_no`,`status`) VALUES 
 (4,'Pankaj','RZ','7845','Active'),
 (6,'Gurjinder','RZ','7845','Active');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
