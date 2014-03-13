CREATE DATABASE  IF NOT EXISTS `agile_man_system` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `agile_man_system`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: agile_man_system
-- ------------------------------------------------------
-- Server version	5.6.14

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
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boards` (
  `brd_id` int(11) NOT NULL AUTO_INCREMENT,
  `brd_wf_id` int(11) NOT NULL,
  `brd_name` varchar(45) DEFAULT NULL,
  `brd_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `brd_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`brd_id`),
  UNIQUE KEY `brd_id_UNIQUE` (`brd_id`),
  KEY `fk_brd_wf_id_idx` (`brd_wf_id`),
  CONSTRAINT `fk_brd_wf_id` FOREIGN KEY (`brd_wf_id`) REFERENCES `workflows` (`wf_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores boards implementing the workflow';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stories` (
  `str_id` int(11) NOT NULL AUTO_INCREMENT,
  `str_name` varchar(150) NOT NULL,
  `str_description` text,
  `str_strt_id` int(11) NOT NULL,
  `str_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `str_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `str_points` int(11) DEFAULT NULL,
  `str_estimation` int(11) DEFAULT NULL,
  `str_brd_id` int(11) NOT NULL,
  `str_wfst_id` int(11) NOT NULL,
  PRIMARY KEY (`str_id`),
  UNIQUE KEY `str_id_UNIQUE` (`str_id`),
  KEY `fk_str_wfst_id_idx` (`str_wfst_id`),
  KEY `fk_brd_id_idx` (`str_brd_id`),
  KEY `fk_str_strt_id_idx` (`str_strt_id`),
  CONSTRAINT `fk_str_brd_id` FOREIGN KEY (`str_brd_id`) REFERENCES `boards` (`brd_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_str_strt_id` FOREIGN KEY (`str_strt_id`) REFERENCES `story_types` (`strt_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_str_wfst_id` FOREIGN KEY (`str_wfst_id`) REFERENCES `workflow_stages` (`wfst_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Defines Stories, which placed on board';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories_assignees`
--

DROP TABLE IF EXISTS `stories_assignees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stories_assignees` (
  `stra_str_id` int(11) NOT NULL,
  `stra_usr_id` int(11) NOT NULL,
  KEY `fk_stra_usr_id_idx` (`stra_usr_id`),
  KEY `fk_stra_str_id_idx` (`stra_str_id`),
  CONSTRAINT `fk_stra_str_id` FOREIGN KEY (`stra_str_id`) REFERENCES `stories` (`str_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_stra_usr_id` FOREIGN KEY (`stra_usr_id`) REFERENCES `users` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Helper table, Story - Users tables many-to-many relation.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories_assignees`
--

LOCK TABLES `stories_assignees` WRITE;
/*!40000 ALTER TABLE `stories_assignees` DISABLE KEYS */;
/*!40000 ALTER TABLE `stories_assignees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_comments`
--

DROP TABLE IF EXISTS `story_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story_comments` (
  `strc_id` int(11) NOT NULL AUTO_INCREMENT,
  `strc_str_id` int(11) NOT NULL,
  `strc_text` text NOT NULL,
  `strc_usr_id` int(11) NOT NULL,
  `strc_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `strc_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`strc_id`),
  UNIQUE KEY `strc_id_UNIQUE` (`strc_id`),
  KEY `fk_strc_str_id_idx` (`strc_str_id`),
  KEY `fk_strc_usr_id_idx` (`strc_usr_id`),
  CONSTRAINT `fk_strc_str_id` FOREIGN KEY (`strc_str_id`) REFERENCES `stories` (`str_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_strc_usr_id` FOREIGN KEY (`strc_usr_id`) REFERENCES `users` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Comments for stories.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_comments`
--

LOCK TABLES `story_comments` WRITE;
/*!40000 ALTER TABLE `story_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `story_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_steps`
--

DROP TABLE IF EXISTS `story_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story_steps` (
  `strs_id` int(11) NOT NULL AUTO_INCREMENT,
  `strs_str_id` int(11) NOT NULL,
  `strs_description` varchar(300) NOT NULL,
  `strs_completed` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`strs_id`),
  UNIQUE KEY `strs_id_UNIQUE` (`strs_id`),
  KEY `fk_strs_str_id_idx` (`strs_str_id`),
  CONSTRAINT `fk_strs_str_id` FOREIGN KEY (`strs_str_id`) REFERENCES `stories` (`str_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Small steps to complete the Story.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_steps`
--

LOCK TABLES `story_steps` WRITE;
/*!40000 ALTER TABLE `story_steps` DISABLE KEYS */;
/*!40000 ALTER TABLE `story_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `story_types`
--

DROP TABLE IF EXISTS `story_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `story_types` (
  `strt_id` int(11) NOT NULL AUTO_INCREMENT,
  `strt_name` varchar(45) NOT NULL,
  PRIMARY KEY (`strt_id`),
  UNIQUE KEY `strt_id_UNIQUE` (`strt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Defines Types of Stories on Board';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `story_types`
--

LOCK TABLES `story_types` WRITE;
/*!40000 ALTER TABLE `story_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `story_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_email` char(50) NOT NULL,
  `usr_first_name` varchar(50) DEFAULT NULL,
  `usr_last_name` varchar(100) DEFAULT NULL,
  `usr_password_salt` varchar(45) NOT NULL,
  `usr_password_hash` varchar(45) NOT NULL,
  PRIMARY KEY (`usr_id`,`usr_email`),
  UNIQUE KEY `usr_id_UNIQUE` (`usr_id`),
  UNIQUE KEY `usr_email_UNIQUE` (`usr_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Users of Agile Management System';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vorobyovmark@gmail.com','Mark','Vorobyov','1','1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_stages`
--

DROP TABLE IF EXISTS `workflow_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_stages` (
  `wfst_id` int(11) NOT NULL AUTO_INCREMENT,
  `wfst_wf_id` int(11) NOT NULL,
  `wfst_name` varchar(45) NOT NULL,
  `wfst_description` varchar(45) NOT NULL DEFAULT '',
  `wfst_type` tinyint(4) NOT NULL DEFAULT '0',
  `wfst_parent` int(11) DEFAULT NULL,
  PRIMARY KEY (`wfst_id`),
  UNIQUE KEY `wfst_id_UNIQUE` (`wfst_id`),
  KEY `fk_wfst_wf_id_idx` (`wfst_wf_id`),
  CONSTRAINT `fk_wfst_wf_id` FOREIGN KEY (`wfst_wf_id`) REFERENCES `workflows` (`wf_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='Stores stages of agile processes workflows';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_stages`
--

LOCK TABLES `workflow_stages` WRITE;
/*!40000 ALTER TABLE `workflow_stages` DISABLE KEYS */;
INSERT INTO `workflow_stages` VALUES (1,1,'Backlog','',2,NULL),(2,1,'Development','',0,NULL),(3,1,'QA','',0,NULL),(4,1,'Deployment','',0,NULL),(5,1,'In progress','',1,2),(6,1,'In progress','',1,3),(7,1,'In progress','',1,4),(8,1,'Ready','',2,2),(9,1,'Ready','',2,3),(10,1,'Ready','',2,4),(11,1,'Implemented','',2,NULL);
/*!40000 ALTER TABLE `workflow_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflows`
--

DROP TABLE IF EXISTS `workflows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflows` (
  `wf_id` int(11) NOT NULL AUTO_INCREMENT,
  `wf_name` varchar(45) NOT NULL DEFAULT '',
  `wf_date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `wf_creator` int(11) NOT NULL,
  PRIMARY KEY (`wf_id`),
  UNIQUE KEY `wf_id_UNIQUE` (`wf_id`),
  KEY `fk_wf_creator_idx` (`wf_creator`),
  CONSTRAINT `fk_wf_creator` FOREIGN KEY (`wf_creator`) REFERENCES `users` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Workflow defines stages of agile process';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflows`
--

LOCK TABLES `workflows` WRITE;
/*!40000 ALTER TABLE `workflows` DISABLE KEYS */;
INSERT INTO `workflows` VALUES (1,'Basic SCRUM process','2014-03-13 21:45:05',1);
/*!40000 ALTER TABLE `workflows` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-14  0:59:49
