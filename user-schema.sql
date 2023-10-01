CREATE TABLE
    `Cyranaiusermanagement`.`user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `first_name` VARCHAR(45) NOT NULL,
        `last_name` VARCHAR(45) NOT NULL,
        `email` VARCHAR(45) NOT NULL,
        `phone` VARCHAR(45) NOT NULL,
        `comments` TEXT NOT NULL,
        `status` VARCHAR(10) NOT NULL DEFAULT 'active',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- phpMyAdmin SQL Dump

-- version 5.2.1

-- https://www.phpmyadmin.net/

--

-- Host: 127.0.0.1:3306

-- Generation Time: Jul 12, 2023 at 08:07 PM

-- Server version: 8.0.33

-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!40101 SET NAMES utf8mb4 */

;

--

-- Database: `Cyranaiusermanagement`

--

-- --------------------------------------------------------

--

-- Table structure for table `user`

--

CREATE TABLE
    `user` (
        `id` int NOT NULL,
        `first_name` varchar(45) NOT NULL,
        `last_name` varchar(45) NOT NULL,
        `email` varchar(45) NOT NULL,
        `phone` varchar(45) NOT NULL,
        `comments` text NOT NULL,
        `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--

-- Dumping data for table `user`

--

INSERT INTO
    `user` (
        `id`,
        `first_name`,
        `last_name`,
        `email`,
        `phone`,
        `comments`,
        `status`
    )
VALUES (
        1,
        'Tanishq',
        'Ranjan',
        'asca@gmail.com',
        '1234567890',
        'test-1',
        'active'
    ), (
        2,
        'Jeff',
        'Amazon',
        'jeff@amazon.com',
        '1234567890',
        'CEO of Amazon',
        'active'
    ), (
        3,
        'Elon',
        'Tesla',
        'elon@tesla.com',
        '9876543210',
        'CEO of Tesla',
        'active'
    ), (
        4,
        'Satya',
        'Microsoft',
        'satya@microsoft.com',
        '1231234567',
        'CEO of Microsoft',
        'active'
    ), (
        5,
        'Tim',
        'Apple',
        'tim@apple.com',
        '9879876543',
        'CEO of Apple',
        'active'
    ), (
        6,
        'Sundar',
        'Google',
        'sundar@google.com',
        '7654321098',
        'CEO of Google',
        'active'
    ), (
        7,
        'Mark',
        'Facebook',
        'mark@facebook.com',
        '5432109876',
        'CEO of Facebook',
        'active'
    ), (
        8,
        'Mary',
        'General Motors',
        'mary@gm.com',
        '7890123456',
        'CEO of General Motors',
        'active'
    ), (
        9,
        'Brian',
        'Airbnb',
        'brian@airbnb.com',
        '4567890123',
        'CEO of Airbnb',
        'active'
    ), (
        10,
        'Reed',
        'Netflix',
        'reed@netflix.com',
        '2109876543',
        'CEO of Netflix',
        'active'
    ), (
        11,
        'Satya',
        'LinkedIn',
        'satya@linkedin.com',
        '8901234567',
        'CEO of LinkedIn',
        'active'
    ), (
        12,
        'Jamie',
        'JPMorgan Chase',
        'jamie@jpmorgan.com',
        '2345678901',
        'CEO of JPMorgan Chase',
        'active'
    ), (
        13,
        'Ginni',
        'IBM',
        'ginni@ibm.com',
        '6789012345',
        'Former CEO of IBM',
        'removed'
    ), (
        14,
        'Arvind',
        'IBM',
        'arvind@ibm.com',
        '4321098765',
        'CEO of IBM',
        'active'
    ), (
        15,
        'Ajay',
        'Mastercard',
        'ajay@mastercard.com',
        '7890123456',
        'Former CEO of Mastercard',
        'removed'
    ), (
        16,
        'Michael',
        'Citigroup',
        'michael@citi.com',
        '6543210987',
        'Former CEO of Citigroup',
        'removed'
    ), (
        17,
        'David',
        'Goldman Sachs',
        'david@goldmansachs.com',
        '2109876543',
        'CEO of Goldman Sachs',
        'active'
    ), (
        18,
        'Sheryl',
        'Facebook',
        'sheryl@facebook.com',
        '5432109876',
        'COO of Facebook',
        'active'
    ), (
        19,
        'Jamie',
        'JPMorgan Chase',
        'jamie@jpmorgan.com',
        '8901234567',
        'CEO of JPMorgan Chase',
        'active'
    ), (
        20,
        'Satya',
        'LinkedIn',
        'satya@linkedin.com',
        '2345678901',
        'CEO of LinkedIn',
        'active'
    ), (
        21,
        'Larry',
        'Google',
        'larry@google.com',
        '9876543210',
        'Co-founder of Google',
        'active'
    ), (
        22,
        'Mark',
        'Oracle',
        'mark@oracle.com',
        '1231234567',
        'Former CEO of Oracle',
        'removed'
    ), (
        23,
        'Virginia',
        'IBM',
        'virginia@ibm.com',
        '9879876543',
        'Former CEO of IBM',
        'removed'
    ), (
        24,
        'Marc',
        'Salesforce',
        'marc@salesforce.com',
        '7654321098',
        'CEO of Salesforce',
        'active'
    ), (
        25,
        'Satya',
        'Microsoft',
        'satya@microsoft.com',
        '5432109876',
        'CEO of Microsoft',
        'active'
    );

--

-- Indexes for dumped tables

--

--

-- Indexes for table `user`

--

ALTER TABLE `user` ADD PRIMARY KEY (`id`);

--

-- AUTO_INCREMENT for dumped tables

--

--

-- AUTO_INCREMENT for table `user`

--

ALTER TABLE
    `user` MODIFY `id` int NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 36;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;