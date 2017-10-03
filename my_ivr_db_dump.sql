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
  `web_action_name` varchar(128) NOT NULL,
  `function_handler_name` varchar(128) NOT NULL,
  `allowed_for_this_menu` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions_table`
--

LOCK TABLES `actions_table` WRITE;
/*!40000 ALTER TABLE `actions_table` DISABLE KEYS */;
INSERT INTO `actions_table` VALUES (1,'play_announcement','background',1),(2,'terminate_call','terminate',1),(3,'play_and_ignore_input','playback',1),(5,'wait_extension','waitexten',1),(6,'go_to_another_menu','goto_ivr',0),(7,'change_tariff','change_tariff',0),(8,'call_back','call_back',0),(9,'check_balance','say_balance',0);
/*!40000 ALTER TABLE `actions_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audiofiles_table`
--

DROP TABLE IF EXISTS `audiofiles_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audiofiles_table` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(512) NOT NULL DEFAULT '',
  `language` varchar(32) NOT NULL DEFAULT '',
  `audio_format` varchar(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audiofiles_table`
--

LOCK TABLES `audiofiles_table` WRITE;
/*!40000 ALTER TABLE `audiofiles_table` DISABLE KEYS */;
INSERT INTO `audiofiles_table` VALUES (1,'added.alaw','ru','alaw'),(2,'beep.alaw','ru','alaw'),(3,'activated.alaw','en','alaw'),(4,'agent-pass.alaw','en','alaw'),(5,'receiving.alaw','kz','alaw'),(6,'registrar.alaw','kz','alaw'),(10,'nope1.alaw','ru','alaw');
/*!40000 ALTER TABLE `audiofiles_table` ENABLE KEYS */;
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
INSERT INTO `billing_info` VALUES ('111',58,'9');
/*!40000 ALTER TABLE `billing_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ivr_actions`
--

DROP TABLE IF EXISTS `ivr_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ivr_actions` (
  `varchar_location_id` varchar(128) NOT NULL,
  `priority` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `action_args` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`varchar_location_id`,`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_actions`
--

LOCK TABLES `ivr_actions` WRITE;
/*!40000 ALTER TABLE `ivr_actions` DISABLE KEYS */;
INSERT INTO `ivr_actions` VALUES ('1',1,5,'10'),('1',2,5,'10'),('1_2',1,9,''),('1_2',2,9,''),('1_8',1,1,'/var/lib/asterisk/sounds/ru/added.alaw;10');
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
  `next_location_id` varchar(128) NOT NULL,
  PRIMARY KEY (`varchar_ivr_id`,`extension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_map`
--

LOCK TABLES `ivr_map` WRITE;
/*!40000 ALTER TABLE `ivr_map` DISABLE KEYS */;
INSERT INTO `ivr_map` VALUES ('1','2','1_2'),('1','8','1_8');
/*!40000 ALTER TABLE `ivr_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ivr_names`
--

DROP TABLE IF EXISTS `ivr_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ivr_names` (
  `varchar_ivr_id` varchar(128) NOT NULL,
  `ivr_name` varchar(256) NOT NULL DEFAULT '',
  PRIMARY KEY (`varchar_ivr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ivr_names`
--

LOCK TABLES `ivr_names` WRITE;
/*!40000 ALTER TABLE `ivr_names` DISABLE KEYS */;
INSERT INTO `ivr_names` VALUES ('1','1');
/*!40000 ALTER TABLE `ivr_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lang_directories`
--

DROP TABLE IF EXISTS `lang_directories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lang_directories` (
  `language` varchar(32) NOT NULL,
  `audio_directory` varchar(512) NOT NULL DEFAULT '',
  PRIMARY KEY (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lang_directories`
--

LOCK TABLES `lang_directories` WRITE;
/*!40000 ALTER TABLE `lang_directories` DISABLE KEYS */;
INSERT INTO `lang_directories` VALUES ('en','/var/lib/asterisk/sounds/en/'),('kz','/var/lib/asterisk/sounds/kz/'),('ru','/var/lib/asterisk/sounds/ru/');
/*!40000 ALTER TABLE `lang_directories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_en`
--

DROP TABLE IF EXISTS `language_en`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_en` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_en`
--

LOCK TABLES `language_en` WRITE;
/*!40000 ALTER TABLE `language_en` DISABLE KEYS */;
INSERT INTO `language_en` VALUES ('call_back','Callback'),('change_tariff','Change tariff'),('check_balance','Check balance'),('go_to_another_menu','Go to menu'),('play_and_ignore_input','Sound message with no input wait'),('play_announcement','Sound message with input wait'),('terminate_call','Terminate call'),('wait_extension','Wait for dial');
/*!40000 ALTER TABLE `language_en` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_kz`
--

DROP TABLE IF EXISTS `language_kz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_kz` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_kz`
--

LOCK TABLES `language_kz` WRITE;
/*!40000 ALTER TABLE `language_kz` DISABLE KEYS */;
INSERT INTO `language_kz` VALUES ('call_back','Кері қоңырау'),('change_tariff','Тарифті ауыстыру'),('check_balance','Балансты тексеру'),('go_to_another_menu','Басқа мәзірге өту'),('play_and_ignore_input','Нөмірді енгізусіз дауыс хабарлама'),('play_announcement','Нөмірді енгізумен дауыс хабарлама'),('terminate_call','Қоңырауын аяқталу'),('wait_extension','Нөмірді тергенін күту');
/*!40000 ALTER TABLE `language_kz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_ru`
--

DROP TABLE IF EXISTS `language_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_ru` (
  `parameter_name` varchar(128) NOT NULL,
  `local_name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_ru`
--

LOCK TABLES `language_ru` WRITE;
/*!40000 ALTER TABLE `language_ru` DISABLE KEYS */;
INSERT INTO `language_ru` VALUES ('call_back','Обратный вызов'),('change_tariff','Смена тарифа'),('check_balance','Проверка баланса'),('go_to_another_menu','Переход в меню'),('play_and_ignore_input','Сообщение без ожидания ввода цифр'),('play_announcement','Сообщение с ожиданием ввода цифр'),('terminate_call','Завершение вызова'),('wait_extension','Ожидание набора');
/*!40000 ALTER TABLE `language_ru` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-03 16:16:56
