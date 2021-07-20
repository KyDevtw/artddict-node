-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-07-20 17:16:45
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
-- 資料庫： `artddict`
--

-- --------------------------------------------------------

--
-- 資料表結構 `aucbuyerinfo`
--

CREATE TABLE `aucbuyerinfo` (
  `Sid` int(11) NOT NULL COMMENT '流水號',
  `Member_Id` int(10) NOT NULL COMMENT '會員編號',
  `auction_id` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品編號',
  `Price` int(15) NOT NULL COMMENT '出價額度',
  `aucCreated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '新增時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `aucbuyerinfo`
--

INSERT INTO `aucbuyerinfo` (`Sid`, `Member_Id`, `auction_id`, `Price`, `aucCreated_at`) VALUES
(6, 2, '65003', 910, '2021-07-20 23:13:16'),
(7, 2, '65004', 910, '2021-07-20 23:13:51'),
(8, 2, '65046', 3900, '2021-07-20 23:14:01');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `aucbuyerinfo`
--
ALTER TABLE `aucbuyerinfo`
  ADD PRIMARY KEY (`Sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `aucbuyerinfo`
--
ALTER TABLE `aucbuyerinfo`
  MODIFY `Sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
