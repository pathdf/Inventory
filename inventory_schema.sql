DROP TABLE IF EXISTS `inventory`.`items`;
CREATE TABLE  `inventory`.`items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_name` (`item_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `inventory`.`vendors`;
CREATE TABLE  `inventory`.`vendors` (
  `vendor_id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `vendor_name` (`vendor_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `inventory`.`item_vendor_assn`;
CREATE TABLE  `inventory`.`item_vendor_assn` (
  `item_vendor_assn_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_item_id` int(11) NOT NULL,
  `fk_vendor_id` int(11) NOT NULL,
  PRIMARY KEY (`item_vendor_assn_id`),
  KEY `fk_item_id` (`fk_item_id`),
  KEY `fk_vendor_id` (`fk_vendor_id`),
  CONSTRAINT `item_vendor_assn_ibfk_1` FOREIGN KEY (`fk_item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `item_vendor_assn_ibfk_2` FOREIGN KEY (`fk_vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `inventory`.`user`;
CREATE TABLE  `inventory`.`user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  `status` varchar(10) DEFAULT 'Active',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `max_tries` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `inventory`.`user_roles`;
CREATE TABLE  `inventory`.`user_roles` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role` varchar(30) NOT NULL,
  PRIMARY KEY (`user_role_id`),
  UNIQUE KEY `user_role` (`user_role`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `inventory`.`user_user_role_assn`;
CREATE TABLE  `inventory`.`user_user_role_assn` (
  `user_user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user_id` int(11) NOT NULL,
  `fk_user_role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_user_role_id`),
  KEY `fk_user_id` (`fk_user_id`),
  KEY `fk_user_role_id` (`fk_user_role_id`),
  CONSTRAINT `user_user_role_assn_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `user_user_role_assn_ibfk_2` FOREIGN KEY (`fk_user_role_id`) REFERENCES `user_roles` (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `inventory`.`purchase`;
CREATE TABLE  `inventory`.`purchase` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_item_vendor_assn_id` int(11) NOT NULL,
  `price_per_quantity` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `fk_item_vendor_assn_id` (`fk_item_vendor_assn_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`fk_item_vendor_assn_id`) REFERENCES `item_vendor_assn` (`item_vendor_assn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `inventory`.`persistent_logins`;
CREATE TABLE  `inventory`.`persistent_logins` (
  `username` varchar(64) NOT NULL,
  `series` varchar(64) NOT NULL,
  `token` varchar(64) NOT NULL,
  `last_used` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`series`)
) ENGINE=InnoDB AUTO_INCREMENT=1DEFAULT CHARSET=latin1;

