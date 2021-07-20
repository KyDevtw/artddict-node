-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 20 日 19:26
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ARTDDICT`
--

-- --------------------------------------------------------

--
-- 資料表結構 `proComments`
--

CREATE TABLE `proComments` (
  `comId` int(15) NOT NULL,
  `proNum` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `starValue` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `proComments`
--

INSERT INTO `proComments` (`comId`, `proNum`, `userId`, `comments`, `starValue`, `created_at`) VALUES
(229, '100', '暢', '所謂無，關鍵是無需要如何解讀。米南德曾說過，俗知憂能老，為視鏡中絲。這句話反映了問題的急切性。若到今天結束時我們都還無法釐清無的意義，那想必我們昨天也無法釐清。若能夠欣賞到無的美，相信我們一定會對無改觀。動機，可以說是最單純的力量。', '4', '2021-07-20'),
(230, '100', '小灰貓', '哈囉哈囉\n', '4.5', '2021-07-20');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `proComments`
--
ALTER TABLE `proComments`
  ADD PRIMARY KEY (`comId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `proComments`
--
ALTER TABLE `proComments`
  MODIFY `comId` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
