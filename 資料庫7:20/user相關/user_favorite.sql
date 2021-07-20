-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 20 日 16:43
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `artddict`
--

-- --------------------------------------------------------

--
-- 資料表結構 `user_favorite`
--

CREATE TABLE `user_favorite` (
  `id` int(10) NOT NULL COMMENT '流水號',
  `userId` int(10) NOT NULL COMMENT '會員id',
  `eventId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `user_favorite`
--

INSERT INTO `user_favorite` (`id`, `userId`, `eventId`) VALUES
(29, 1, '008'),
(31, 1, '010'),
(32, 1, '011'),
(33, 1, '101'),
(36, 2, '003'),
(39, 2, '008'),
(40, 1, '104'),
(41, 1, '009'),
(52, 1, '106'),
(56, 1, '102'),
(57, 1, '002');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user_favorite`
--
ALTER TABLE `user_favorite`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_favorite`
--
ALTER TABLE `user_favorite`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
