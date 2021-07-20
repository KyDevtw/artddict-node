-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 20 日 21:58
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
-- 資料表結構 `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `orderId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '訂單編號',
  `orderSpec` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '產品規格',
  `orderQty` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '訂單產品數量',
  `eventId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '活動編號\r\n',
  `proId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品編號',
  `aucId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '拍賣編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `order_details`
--

INSERT INTO `order_details` (`id`, `orderId`, `orderSpec`, `orderQty`, `eventId`, `proId`, `aucId`) VALUES
(49, '1626769619050', '敬老票', '2', '102', '', ''),
(50, '1626769619050', '成人票', '4', '107', '', ''),
(51, '1626786035643', '', '1', '', '65001', ''),
(52, '1626786035643', 'L', '2', '', '65088', '');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
