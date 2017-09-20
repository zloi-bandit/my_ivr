-- MySQL dump 10.14  Distrib 5.5.56-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: my_ivr
-- ------------------------------------------------------
-- Server version	5.5.56-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `my_ivr`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `my_ivr` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `my_ivr`;

--
-- Table structure for table `actions_table`
--

DROP TABLE IF EXISTS `actions_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions_table` (
  `action_id` int(11) NOT NULL,
  `web_action_name` varchar(256) NOT NULL,
  `function_handler_name` varchar(256) NOT NULL,
  `allowed_for_this_menu` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions_table`
--

LOCK TABLES `actions_table` WRITE;
/*!40000 ALTER TABLE `actions_table` DISABLE KEYS */;
INSERT INTO `actions_table` VALUES (1,'Play Announcement','background',1),(3,'Play And Ignore Input','playback',1),(6,'Check Balance','say_balance',0),(7,'Change Tariff','change_tariff',0),(8,'Callback','call_back',0);
/*!40000 ALTER TABLE `actions_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing_info`
--

DROP TABLE IF EXISTS `billing_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billing_info` (
  `subscriber` varchar(32) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT '0',
  `current_tariff` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`subscriber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_info`
--

LOCK TABLES `billing_info` WRITE;
/*!40000 ALTER TABLE `billing_info` DISABLE KEYS */;
INSERT INTO `billing_info` VALUES ('111',58,'6');
/*!40000 ALTER TABLE `billing_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ivr_actions`
--

DROP TABLE IF EXISTS `ivr_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ivr_actions` (
  `varchar_ivr_id` varchar(128) NOT NULL,
  `priority` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `action_args` varchar(256) NOT NULL DEFAULT '',
  `if_failed_ivr_id` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`varchar_ivr_id`,`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_actions`
--

LOCK TABLES `ivr_actions` WRITE;
/*!40000 ALTER TABLE `ivr_actions` DISABLE KEYS */;
INSERT INTO `ivr_actions` VALUES ('1',1,2,'10',''),('1_1',1,6,'',''),('1_2',1,7,'',''),('1_3',1,8,'','');
/*!40000 ALTER TABLE `ivr_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ivr_map`
--

DROP TABLE IF EXISTS `ivr_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ivr_map` (
  `varchar_ivr_id` varchar(128) NOT NULL,
  `extension` varchar(32) NOT NULL,
  `next_ivr_id` varchar(128) NOT NULL,
  PRIMARY KEY (`varchar_ivr_id`,`extension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_map`
--

LOCK TABLES `ivr_map` WRITE;
/*!40000 ALTER TABLE `ivr_map` DISABLE KEYS */;
INSERT INTO `ivr_map` VALUES ('1','1','1_1'),('1','2','1_2'),('1','3','1_3');
/*!40000 ALTER TABLE `ivr_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ivr_names`
--

DROP TABLE IF EXISTS `ivr_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ivr_names` (
  `int_ivr_id` int(11) NOT NULL,
  `ivr_name` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`int_ivr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_names`
--

LOCK TABLES `ivr_names` WRITE;
/*!40000 ALTER TABLE `ivr_names` DISABLE KEYS */;
INSERT INTO `ivr_names` VALUES (1,'Test IVR');
/*!40000 ALTER TABLE `ivr_names` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-21  0:04:31
