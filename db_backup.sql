-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: laravel
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Zunayed Iqbal Shahed','zishahed25@gmail.com','01767595560','$2y$12$JG2r4XdogvJERMgpq5XxpeirANU0ziOSTj3mxhc0Wl0a2OGscBed2','2025-11-22 09:13:58','2025-11-22 09:13:58','31pEGukThkqo8IjxzTKzvTjZDqEgpvwUvhhw6xEWj7MpPfEf9Z0FvOPeyM8F'),(2,'Taqi Tahmid','taqi@student.bup.edu.bd','01973337044','$2y$12$vpOWGBazD6W.8B2ofXUfUODbQR.BNbhvaDdjTIDRVgHE.rJyPFKVu','2025-11-27 16:37:20','2025-11-27 16:37:20','NpY26bt3Nnu7dpR6OeWTuNHXqp11NeCIlk2DUUPQSJkURdN168SQedR0pNsf');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `expense_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `purchase_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `expenses_purchase_id_foreign` (`purchase_id`),
  KEY `expenses_product_id_foreign` (`product_id`),
  CONSTRAINT `expenses_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `expenses_purchase_id_foreign` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_orders` (`purchase_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,3,16,1,209.99,'2025-11-29 00:34:41','2025-11-29 00:34:41'),(2,4,51,10,1199.99,'2025-11-29 00:36:18','2025-11-29 00:36:18'),(3,5,16,1,209.99,'2025-11-30 04:15:30','2025-11-30 04:15:30'),(4,6,1,5,589.99,'2025-11-30 04:17:36','2025-11-30 04:17:36');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incomes`
--

DROP TABLE IF EXISTS `incomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incomes` (
  `income_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`income_id`),
  KEY `incomes_order_id_foreign` (`order_id`),
  KEY `incomes_product_id_foreign` (`product_id`),
  CONSTRAINT `incomes_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `sales_orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `incomes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incomes`
--

LOCK TABLES `incomes` WRITE;
/*!40000 ALTER TABLE `incomes` DISABLE KEYS */;
INSERT INTO `incomes` VALUES (1,4,94,1,94.99,'2025-11-28 08:26:04','2025-11-28 08:26:04'),(2,5,16,1,209.99,'2025-11-28 09:01:53','2025-11-28 09:01:53'),(3,5,94,1,94.99,'2025-11-28 09:01:53','2025-11-28 09:01:53'),(4,6,95,1,139.99,'2025-11-28 09:28:30','2025-11-28 09:28:30'),(5,7,15,1,159.99,'2025-11-28 13:23:41','2025-11-28 13:23:41'),(6,8,15,1,159.99,'2025-11-28 13:26:37','2025-11-28 13:26:37'),(7,9,94,1,94.99,'2025-11-28 14:40:01','2025-11-28 14:40:01'),(8,10,86,2,69.99,'2025-11-28 16:27:20','2025-11-28 16:27:20'),(9,11,93,1,179.99,'2025-11-30 13:46:18','2025-11-30 13:46:18'),(10,12,105,2,129.99,'2025-11-30 13:59:44','2025-11-30 13:59:44');
/*!40000 ALTER TABLE `incomes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_11_21_091615_create_suppliers_table',1),(5,'2025_11_21_091616_create_customers_table',1),(6,'2025_11_21_091616_create_staffs_table',1),(7,'2025_11_21_091617_create_products_table',1),(8,'2025_11_21_091617_create_purchase_orders_table',1),(9,'2025_11_21_091618_create_sales_orders_table',1),(10,'2025_11_21_091618_create_transactions_table',1),(11,'2025_11_21_091619_create_expenses_table',1),(12,'2025_11_21_091619_create_incomes_table',1),(13,'2025_11_21_091622_create_sales_transactions_table',1),(14,'2025_11_21_091623_create_purchase_transactions_table',1),(15,'2025_11_21_175449_add_password_to_customers_table',2),(16,'2025_11_28_035336_make_created_by_nullable_in_transactions_table',3),(17,'2025_11_28_082449_add_checkout_fields_to_sales_orders_table',4),(18,'2025_11_29_002044_add_total_amount_to_purchase_orders_table',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `low_stock_alert_created_at` datetime DEFAULT NULL,
  `low_stock_alert_resolved_at` datetime DEFAULT NULL,
  `low_stock_alert_resolved_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  KEY `products_low_stock_alert_resolved_by_foreign` (`low_stock_alert_resolved_by`),
  CONSTRAINT `products_low_stock_alert_resolved_by_foreign` FOREIGN KEY (`low_stock_alert_resolved_by`) REFERENCES `staffs` (`staff_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Intel Core i9-13900K','CPU-INT-001','Processor',589.99,20,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-30 04:17:36'),(2,'AMD Ryzen 9 7950X','CPU-AMD-001','Processor',699.99,8,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(3,'ASUS ROG Strix Z790-E','MB-ASUS-001','Motherboard',459.99,12,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(4,'MSI MAG B650 TOMAHAWK','MB-MSI-001','Motherboard',249.99,10,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(5,'Corsair Vengeance 32GB DDR5','RAM-COR-001','RAM',159.99,25,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(6,'G.Skill Trident Z5 RGB 32GB','RAM-GSK-001','RAM',179.99,20,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(7,'NVIDIA RTX 4090','GPU-NVI-001','GPU',1599.99,5,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(8,'AMD Radeon RX 7900 XTX','GPU-AMD-001','GPU',999.99,7,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(9,'Samsung 990 PRO 2TB NVMe','SSD-SAM-001','Storage',199.99,30,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(10,'WD Black SN850X 1TB','SSD-WD-001','Storage',129.99,25,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(11,'Corsair RM850x 850W','PSU-COR-001','PSU',139.99,18,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(12,'EVGA SuperNOVA 1000W','PSU-EVG-001','PSU',179.99,12,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(13,'NZXT Kraken X73 RGB','COOL-NZX-001','Cooling',179.99,10,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(14,'Noctua NH-D15','COOL-NOC-001','Cooling',109.99,15,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(15,'Lian Li O11 Dynamic','CASE-LIA-001','Case',159.99,6,'2025-11-28 13:23:41',NULL,NULL,'2025-11-22 09:46:09','2025-11-28 13:41:04'),(16,'Fractal Design Torrent','CASE-FRA-001','Case',209.99,10,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-30 04:15:30'),(17,'LG 27\" 4K Gaming Monitor','MON-LG-001','Monitor',449.99,14,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(18,'ASUS ROG Swift 32\" 1440p','MON-ASUS-001','Monitor',599.99,8,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(19,'Logitech G Pro X Keyboard','KB-LOG-001','Peripherals',149.99,20,NULL,NULL,NULL,'2025-11-22 09:46:09','2025-11-22 09:46:09'),(20,'Logitech G Pro Superlight','MS-LOG-001','Peripherals',139.99,22,NULL,NULL,NULL,'2025-11-22 09:46:12','2025-11-22 09:46:12'),(21,'Intel Core i7-13700K','CPU-INT-002','Processor',409.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(22,'Intel Core i5-13600KF','CPU-INT-003','Processor',289.99,22,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(23,'Intel Core i3-13100F','CPU-INT-004','Processor',119.99,30,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(24,'AMD Ryzen 7 7800X3D','CPU-AMD-002','Processor',449.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(25,'AMD Ryzen 5 7600X','CPU-AMD-003','Processor',249.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(26,'AMD Ryzen 5 5600','CPU-AMD-004','Processor',139.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(27,'Intel Core i9-14900K','CPU-INT-005','Processor',659.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(28,'Intel Core i7-14700F','CPU-INT-006','Processor',379.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(29,'AMD Ryzen 9 9900X','CPU-AMD-005','Processor',549.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(30,'AMD Ryzen 3 4100','CPU-AMD-006','Processor',89.99,35,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(31,'ASUS TUF Gaming Z690-Plus','MB-ASUS-002','Motherboard',229.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(32,'ASUS Prime B660M-A','MB-ASUS-003','Motherboard',139.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(33,'MSI MPG Z790 Carbon WiFi','MB-MSI-002','Motherboard',399.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(34,'MSI PRO B650M-A WiFi','MB-MSI-003','Motherboard',159.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(35,'Gigabyte Z790 AORUS Elite','MB-GIG-001','Motherboard',309.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(36,'Gigabyte B650 AORUS Pro','MB-GIG-002','Motherboard',219.99,14,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(37,'ASRock Z790 Steel Legend','MB-ASR-001','Motherboard',269.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(38,'ASRock B550 Phantom Gaming','MB-ASR-002','Motherboard',149.99,22,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(39,'Biostar B660MX-E Pro','MB-BIO-001','Motherboard',89.99,35,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(40,'ASUS ROG Strix B550-F Gaming','MB-ASUS-004','Motherboard',179.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(41,'Corsair Vengeance 16GB DDR5','RAM-COR-002','RAM',99.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(42,'Corsair Vengeance 64GB DDR5','RAM-COR-003','RAM',299.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(43,'G.Skill Ripjaws S5 32GB DDR5','RAM-GSK-002','RAM',149.99,22,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(44,'G.Skill Trident Z5 64GB DDR5','RAM-GSK-003','RAM',329.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(45,'Kingston Fury Beast 16GB DDR4','RAM-KIN-001','RAM',59.99,50,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(46,'Kingston Fury Renegade 32GB DDR5','RAM-KIN-002','RAM',159.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(47,'TeamGroup T-Force Delta 32GB DDR5','RAM-TFG-001','RAM',139.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(48,'TeamGroup Vulcan Z 16GB DDR4','RAM-TFG-002','RAM',44.99,60,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(49,'Patriot Viper Steel 32GB DDR4','RAM-PAT-001','RAM',89.99,30,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(50,'Crucial Pro 32GB DDR5','RAM-CRU-001','RAM',129.99,28,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(51,'NVIDIA RTX 4080','GPU-NVI-002','GPU',1199.99,16,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-29 00:36:18'),(52,'NVIDIA RTX 4070 Ti','GPU-NVI-003','GPU',799.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(53,'NVIDIA RTX 4060','GPU-NVI-004','GPU',299.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(54,'AMD Radeon RX 7800 XT','GPU-AMD-002','GPU',499.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(55,'AMD Radeon RX 7700 XT','GPU-AMD-003','GPU',449.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(56,'Intel Arc A770','GPU-INTL-001','GPU',349.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(57,'Intel Arc A580','GPU-INTL-002','GPU',199.99,22,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(58,'NVIDIA RTX 4050','GPU-NVI-005','GPU',249.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(59,'AMD Radeon RX 7600','GPU-AMD-004','GPU',269.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(60,'NVIDIA RTX 4070 Super','GPU-NVI-006','GPU',699.99,11,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(61,'Samsung 870 EVO 1TB SATA','SSD-SAM-002','Storage',79.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(62,'Samsung 990 PRO 1TB NVMe','SSD-SAM-003','Storage',149.99,30,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(63,'Crucial P5 Plus 2TB NVMe','SSD-CRU-001','Storage',169.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(64,'Crucial MX500 500GB SATA','SSD-CRU-002','Storage',49.99,50,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(65,'WD Blue SN570 1TB','SSD-WD-002','Storage',69.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(66,'WD Black SN770 2TB','SSD-WD-003','Storage',149.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(67,'Kingston NV2 1TB NVMe','SSD-KIN-001','Storage',49.99,60,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(68,'Kingston KC3000 2TB NVMe','SSD-KIN-002','Storage',159.99,22,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(69,'Seagate FireCuda 520 1TB','SSD-SEA-001','Storage',119.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(70,'Seagate Barracuda 4TB HDD','SSD-SEA-002','Storage',89.99,35,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(71,'Cooler Master MWE 750W','PSU-CM-001','PSU',99.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(72,'Cooler Master V850 Gold','PSU-CM-002','PSU',159.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(73,'Corsair RM750x','PSU-COR-002','PSU',129.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(74,'Corsair HX1000','PSU-COR-003','PSU',229.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(75,'EVGA 600 BR','PSU-EVG-002','PSU',49.99,30,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(76,'EVGA SuperNOVA 750 G6','PSU-EVG-003','PSU',159.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(77,'Seasonic Focus GX-850','PSU-SEA-001','PSU',149.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(78,'Seasonic Prime Titanium 1000W','PSU-SEA-002','PSU',299.99,8,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(79,'Thermaltake Smart 600W','PSU-TMT-001','PSU',44.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(80,'Thermaltake Toughpower 850W','PSU-TMT-002','PSU',149.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(81,'NZXT Kraken Z73 LCD','COOL-NZX-002','Cooling',269.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(82,'NZXT Kraken 240 RGB','COOL-NZX-003','Cooling',139.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(83,'Cooler Master Hyper 212 Black','COOL-CM-001','Cooling',44.99,35,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(84,'Cooler Master ML360R RGB','COOL-CM-002','Cooling',159.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(85,'DeepCool LT720 360mm','COOL-DC-001','Cooling',129.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(86,'DeepCool AK620 Air Cooler','COOL-DC-002','Cooling',69.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-28 16:27:20'),(87,'Arctic Liquid Freezer II 360','COOL-ARC-001','Cooling',119.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(88,'Arctic Freezer 34 eSports','COOL-ARC-002','Cooling',39.99,40,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(89,'Noctua NH-U14S','COOL-NOC-002','Cooling',79.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(90,'BeQuiet! Dark Rock Pro 4','COOL-BQ-001','Cooling',99.99,16,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(91,'Lian Li Lancool III','CASE-LIA-002','Case',169.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(92,'Lian Li O11 Air Mini','CASE-LIA-003','Case',129.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(93,'Fractal Design Meshify 2','CASE-FRA-002','Case',179.99,9,'2025-11-30 13:46:18',NULL,NULL,'2025-11-27 14:31:27','2025-11-30 13:46:18'),(94,'Corsair 4000D Airflow','CASE-COR-001','Case',94.99,23,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-28 14:40:20'),(95,'NZXT H7 Flow','CASE-NZX-001','Case',139.99,17,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-28 09:28:30'),(96,'Samsung Odyssey G7 32\"','MON-SAM-001','Monitor',699.99,10,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(97,'Samsung Odyssey G5 27\"','MON-SAM-002','Monitor',299.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(98,'Acer Predator XB323QK 32\"','MON-ACE-001','Monitor',799.99,8,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(99,'Dell S2721DGF 27\"','MON-DEL-001','Monitor',329.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(100,'Gigabyte M28U 28\"','MON-GIG-001','Monitor',449.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(101,'Razer BlackWidow V4 Keyboard','KB-RAZ-001','Peripherals',179.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(102,'Razer Huntsman Mini Keyboard','KB-RAZ-002','Peripherals',119.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(103,'Corsair K95 RGB Platinum','KB-COR-001','Peripherals',199.99,12,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(104,'Logitech MX Master 3S Mouse','MS-LOG-002','Peripherals',99.99,30,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(105,'Razer Viper Ultimate Mouse','MS-RAZ-001','Peripherals',129.99,20,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-30 13:59:44'),(106,'SteelSeries Apex Pro TKL','KB-STE-001','Peripherals',199.99,15,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(107,'SteelSeries Aerox 3 Mouse','MS-STE-001','Peripherals',59.99,28,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(108,'HyperX Alloy Origins Core','KB-HYX-001','Peripherals',89.99,25,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(109,'HyperX Pulsefire FPS Pro','MS-HYX-001','Peripherals',49.99,35,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27'),(110,'Logitech G733 Wireless Headset','ACC-LOG-001','Peripherals',129.99,18,NULL,NULL,NULL,'2025-11-27 14:31:27','2025-11-27 14:31:27');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `purchase_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` bigint unsigned NOT NULL,
  `purchase_date` date NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `purchase_orders_supplier_id_foreign` (`supplier_id`),
  CONSTRAINT `purchase_orders_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (3,3,'2025-11-29','completed',209.99,'2025-11-29 00:34:41','2025-11-29 00:34:41'),(4,2,'2025-11-29','completed',11999.90,'2025-11-29 00:36:18','2025-11-29 00:36:18'),(5,1,'2025-11-30','completed',209.99,'2025-11-30 04:15:30','2025-11-30 04:15:30'),(6,3,'2025-11-30','completed',2949.95,'2025-11-30 04:17:36','2025-11-30 04:17:36');
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_transactions`
--

DROP TABLE IF EXISTS `purchase_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_transactions` (
  `transaction_id` bigint unsigned NOT NULL,
  `purchase_id` bigint unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `purchase_transactions_purchase_id_foreign` (`purchase_id`),
  CONSTRAINT `purchase_transactions_purchase_id_foreign` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_orders` (`purchase_id`) ON DELETE CASCADE,
  CONSTRAINT `purchase_transactions_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_transactions`
--

LOCK TABLES `purchase_transactions` WRITE;
/*!40000 ALTER TABLE `purchase_transactions` DISABLE KEYS */;
INSERT INTO `purchase_transactions` VALUES (8,3,209.99,'2025-11-29 00:34:41','2025-11-29 00:34:41'),(9,4,11999.90,'2025-11-29 00:36:18','2025-11-29 00:36:18'),(10,5,209.99,'2025-11-30 04:15:30','2025-11-30 04:15:30'),(11,6,2949.95,'2025-11-30 04:17:36','2025-11-30 04:17:36');
/*!40000 ALTER TABLE `purchase_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_orders`
--

DROP TABLE IF EXISTS `sales_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_orders` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL DEFAULT '0.00',
  `shipping` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `sales_orders_customer_id_foreign` (`customer_id`),
  CONSTRAINT `sales_orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_orders`
--

LOCK TABLES `sales_orders` WRITE;
/*!40000 ALTER TABLE `sales_orders` DISABLE KEYS */;
INSERT INTO `sales_orders` VALUES (4,1,'2025-11-28','completed','123',94.99,9.50,10.00,114.49,'2025-11-28 08:26:04','2025-11-28 08:26:04'),(5,1,'2025-11-28','completed','123',304.98,30.50,0.00,335.48,'2025-11-28 09:01:53','2025-11-28 09:01:53'),(6,2,'2025-11-28','completed','hello',139.99,14.00,0.00,153.99,'2025-11-28 09:28:30','2025-11-28 09:28:30'),(7,2,'2025-11-28','completed','Workshop',159.99,16.00,0.00,175.99,'2025-11-28 13:23:41','2025-11-28 13:23:41'),(8,1,'2025-11-28','cancelled','Mirpur 2',159.99,16.00,0.00,175.99,'2025-11-28 13:26:37','2025-11-28 13:41:04'),(9,2,'2025-11-28','cancelled','Workshop Road',94.99,9.50,10.00,114.49,'2025-11-28 14:40:01','2025-11-28 14:40:20'),(10,1,'2025-11-28','completed','Mirpur',139.98,14.00,0.00,153.98,'2025-11-28 16:27:20','2025-11-30 04:18:19'),(11,1,'2025-11-30','completed','123',179.99,18.00,0.00,197.99,'2025-11-30 13:46:18','2025-11-30 13:46:58'),(12,2,'2025-11-30','pending','Workshop',259.98,26.00,0.00,285.98,'2025-11-30 13:59:44','2025-11-30 13:59:44');
/*!40000 ALTER TABLE `sales_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_transactions`
--

DROP TABLE IF EXISTS `sales_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_transactions` (
  `transaction_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `sales_transactions_order_id_foreign` (`order_id`),
  CONSTRAINT `sales_transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `sales_orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `sales_transactions_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_transactions`
--

LOCK TABLES `sales_transactions` WRITE;
/*!40000 ALTER TABLE `sales_transactions` DISABLE KEYS */;
INSERT INTO `sales_transactions` VALUES (1,4,114.49,'2025-11-28 08:26:04','2025-11-28 08:26:04'),(2,5,335.48,'2025-11-28 09:01:53','2025-11-28 09:01:53'),(3,6,153.99,'2025-11-28 09:28:30','2025-11-28 09:28:30'),(4,7,175.99,'2025-11-28 13:23:41','2025-11-28 13:23:41'),(5,8,175.99,'2025-11-28 13:26:37','2025-11-28 13:26:37'),(6,9,114.49,'2025-11-28 14:40:01','2025-11-28 14:40:01'),(7,10,153.98,'2025-11-28 16:27:20','2025-11-28 16:27:20'),(12,11,197.99,'2025-11-30 13:46:18','2025-11-30 13:46:18'),(13,12,285.98,'2025-11-30 13:59:44','2025-11-30 13:59:44');
/*!40000 ALTER TABLE `sales_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('lZhiias0iyukNgALj5D3mNBJPyLzdYUj3KP9bZDM',2,'172.18.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoibldYMTcxSHN5ZEQwZGtvQm5ZeEE5RVViM3ppem5xdjlOSFowaU5vYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJuZXciO2E6MDp7fXM6Mzoib2xkIjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly9sb2NhbGhvc3QvcHJvZHVjdHMiO3M6NToicm91dGUiO3M6MTQ6InByb2R1Y3RzLmluZGV4Ijt9czo1NToibG9naW5fY3VzdG9tZXJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=',1764511189);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffs`
--

DROP TABLE IF EXISTS `staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffs` (
  `staff_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staffs_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffs`
--

LOCK TABLES `staffs` WRITE;
/*!40000 ALTER TABLE `staffs` DISABLE KEYS */;
INSERT INTO `staffs` VALUES (1,'John Manager','manager','manager@trackandtrade.com','$2y$12$PF6CJO/WcZNxswtJikn1eOWzf/jp4kR9VeQ4LMSNWxrJaJdOrnGSm',NULL,'2025-11-21 16:27:08','2025-11-21 16:27:08'),(2,'Jane Staff','sales','sales@trackandtrade.com','$2y$12$gNHY6GiUyC0bk4Ox46W0/.MwT/ta5M5xXBDlYhJNQu1mZvpSkjMii',NULL,'2025-11-21 16:27:09','2025-11-21 16:27:09'),(3,'Bob Inventory','inventory','inventory@trackandtrade.com','$2y$12$LwUwuGtPt4lVCklC83Vel.pfMHzLSl1c.zJLD0tSG1d9T.Ya.dIj2',NULL,'2025-11-21 16:27:09','2025-11-21 16:27:09'),(6,'Adeeb','inventory','adeb@gmail.com','$2y$12$RXW5bWxJtY28NdamQ/grS.poKeJ7xtEVSUoKpg60DlWfP7ag21V9W',NULL,'2025-11-27 17:49:34','2025-11-27 17:49:34'),(7,'shahed','sales','shahed@gmail.com','$2y$12$bCXSbFfj0ngPHFoxy8fFq.DClhNf1WmVenHevH0FnP5zp9JjddyjW',NULL,'2025-11-27 17:53:03','2025-11-27 17:53:03');
/*!40000 ALTER TABLE `staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `suppliers_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'TechZone Components','sales@techzone.com','01755-112233','Rafiul Karim','Level 5, Shop 23, IDB Bhaban, Dhaka',NULL,NULL),(2,'Binary Hardware Supply','support@binaryhardware.com','01844-998877','Nayeem Hossain','32/1 Mirpur Road, Dhaka',NULL,NULL),(3,'CoreLogic Distributors','contact@corelogicbd.com','01977-556677','Tamanna Islam','12 Station Road, Chattogram',NULL,NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_date` date NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `transactions_created_by_foreign` (`created_by`),
  CONSTRAINT `transactions_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `staffs` (`staff_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'2025-11-28','card',NULL,'sales','2025-11-28 08:26:04','2025-11-28 08:26:04'),(2,'2025-11-28','cash',NULL,'sales','2025-11-28 09:01:53','2025-11-28 09:01:53'),(3,'2025-11-28','bank_transfer',NULL,'sales','2025-11-28 09:28:30','2025-11-28 09:28:30'),(4,'2025-11-28','card',NULL,'sales','2025-11-28 13:23:41','2025-11-28 13:23:41'),(5,'2025-11-28','card',NULL,'sales','2025-11-28 13:26:37','2025-11-28 13:26:37'),(6,'2025-11-28','cash',NULL,'sales','2025-11-28 14:40:01','2025-11-28 14:40:01'),(7,'2025-11-28','bank_transfer',NULL,'sales','2025-11-28 16:27:20','2025-11-28 16:27:20'),(8,'2025-11-29','cash',1,'purchase','2025-11-29 00:34:41','2025-11-29 00:34:41'),(9,'2025-11-29','cash',1,'purchase','2025-11-29 00:36:18','2025-11-29 00:36:18'),(10,'2025-11-30','bank_transfer',1,'purchase','2025-11-30 04:15:30','2025-11-30 04:15:30'),(11,'2025-11-30','cash',1,'purchase','2025-11-30 04:17:36','2025-11-30 04:17:36'),(12,'2025-11-30','cash',NULL,'sales','2025-11-30 13:46:18','2025-11-30 13:46:18'),(13,'2025-11-30','bank_transfer',NULL,'sales','2025-11-30 13:59:44','2025-11-30 13:59:44');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 17:20:34
