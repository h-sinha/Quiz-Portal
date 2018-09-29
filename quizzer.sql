-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 27, 2018 at 12:08 AM
-- Server version: 5.7.23-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizzer`
--

-- --------------------------------------------------------

--
-- Table structure for table `attempteds`
--

CREATE TABLE `attempteds` (
  `uid` int(11) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attempteds`
--

INSERT INTO `attempteds` (`uid`, `score`, `name`) VALUES
(1, '15', 'Harry-Potter1'),
(1, '10', 'Harry-Potter1'),
(1, '20', 'Harry-Potter1'),
(1, '25', 'Maths-1'),
(5, '15', 'Image-1');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cid` int(11) NOT NULL,
  `category` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`cid`, `category`) VALUES
(2, 'Basic Maths'),
(1, 'Harry Potter'),
(3, 'Image-Quiz');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `q_id` int(10) UNSIGNED NOT NULL,
  `cid` varchar(11) NOT NULL DEFAULT '3',
  `question` varchar(1024) DEFAULT NULL,
  `correct` varchar(11) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `multimedia` varchar(2048) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`q_id`, `cid`, `question`, `correct`, `choice1`, `choice2`, `choice3`, `choice4`, `multimedia`) VALUES
(1, '1', ' In Harry Potter who plays Ron Weasley in the movie?', '4', 'Macaulay Culkin ', 'Robin Pinter ', 'Robert Grant ', 'Rupert Grint', ''),
(2, '1', 'In \'Goblet of Fire\', who gave Harry the Gillyweed?', '4', 'Dobby ', 'Hermione ', 'Prof. Sprout ', 'Neville', ''),
(4, '1', 'Who were the part of Dumbledore\'s Army?', '1,4', 'Harry Potter', 'Draco Malfoy', 'Lord Voldemort', 'Hermione Granger', ''),
(5, '1', 'In the \'Prisoner of Azkaban\', who is sleeping in the train compartment when Harry, Hermione and Ron enters?', '4', 'Professor Snape ', 'Professor Sprout ', 'Professor Dumbledore ', 'Professor Lupin', ''),
(6, '1', 'In \'Goblet of Fire\', who did Krum save in the second task?', '1', 'Hermione ', 'Igor Karkaoff ', 'His brother', 'Ron', ''),
(8, '1', 'What is this creature called?', '1', 'Dementor', 'Patronus', 'Ghost', 'Snake', 'https://images.pottermore.com/bxd3o8b291gf/7cfnB7zFJuaQsq6AKii26s/f3596b3409ef0480f37a1d07fce20a80/Dementors_PM_B3C9M1_DementorsAtQudditchMatch_Moment.jpg?w=320&h=240&fit=thumb&f=left&q=85'),
(45, '2', 'What is square root of 64?', '1,2', '8', '2^3', '16', '4', ''),
(46, '2', '3+3=?', '1', '6', '1', '2', '9', ''),
(47, '2', '(12*3) modulo 5', '1', '1', '2', '3', '4', ''),
(48, '2', 'Angles of an equilateral triangle?', '1', '60', '90', '180', '360', ''),
(49, '2', 'Number of factors of 36?', '3', '10', '8', '9', '2', ''),
(50, '3', 'Name of this footballer?', '2', 'Cristiano Ronaldo', 'Lionel Messi', 'Lucas Varane', 'Luca Modric', 'https://images.performgroup.com/di/library/GOAL/9a/c2/lionel-messi-barcelona-2018-19_1ceb47w4godcm1v2and9zkxbri.jpg?t=175471814&quality=90&w=1280'),
(51, '3', 'Where is this place situated?', '1', 'Delhi', 'Mumbai', 'Kolkata', 'Hyderabad', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg/240px-Forecourt%2C_Rashtrapati_Bhavan_-_1.jpg'),
(52, '3', 'What is this place called?', '4', 'Oxford', 'Harvard', 'MIT', 'Hogwarts', 'https://images.pottermore.com/bxd3o8b291gf/4j6x7iMI88aicYasciiMsm/c581d5f9a424f664cd6f19dbb4c5dee0/HogwartsCastle_WB_F5_HogwartsCastleIllustration_Illust_080615_Land.jpg?w=320&h=320&fit=thumb&f=center&q=85'),
(53, '3', 'Name of this cricketer?', '2', 'Shane Warne', 'Michael Clarke', 'Shane Watson', 'Ricky Ponting', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjNqG2usYV_E4fjBrM_CsgOecTIVtkt3FEiG61iTZIepVTWREm2Q'),
(54, '3', 'What is the name of this stadium?', '3', 'Camp Nou', 'Eden Gardens', 'Santiago Bernabeu', 'Old Trafford', 'https://www.realmadrid.com/img/horizontal_940px/horizontal3estadio_3am4761.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_sts`
--

CREATE TABLE `quiz_sts` (
  `zid` int(11) NOT NULL,
  `cid` varchar(11) NOT NULL,
  `q1id` varchar(11) NOT NULL,
  `q2id` varchar(11) NOT NULL,
  `q3id` varchar(11) NOT NULL,
  `q4id` varchar(11) NOT NULL,
  `q5id` varchar(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quiz_sts`
--

INSERT INTO `quiz_sts` (`zid`, `cid`, `q1id`, `q2id`, `q3id`, `q4id`, `q5id`, `name`) VALUES
(1, '1', '1', '8', '4', '5', '6', 'Harry-Potter1'),
(2, '2', '45', '46', '47', '48', '49', 'Maths-1'),
(3, '3', '50', '51', '52', '53', '54', 'Image-1');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `uid` int(10) UNSIGNED NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `cid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`uid`, `score`, `cid`) VALUES
(1, 45, 1),
(1, 25, 2),
(1, 0, 3),
(5, 0, 2),
(5, 0, 1),
(5, 15, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `super` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `password`, `super`) VALUES
(1, 'Harsh', '$2a$04$y8.rJ7cw.59jNZPEnro0Q.vheIa/ygkFW4iDWsrBsDfz/gQRi36Z2', 1),
(5, 'user', '$2a$04$3E0yMrcsZy/kF0j4YSaJounY8PJRsP.C3ASSbtACfF4tRa80/rum6', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `category` (`category`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`q_id`),
  ADD KEY `q_id` (`q_id`);

--
-- Indexes for table `quiz_sts`
--
ALTER TABLE `quiz_sts`
  ADD PRIMARY KEY (`zid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_2` (`uid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `uid` (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `q_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `quiz_sts`
--
ALTER TABLE `quiz_sts`
  MODIFY `zid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
