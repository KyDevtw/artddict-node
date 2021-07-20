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
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `orderId` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '訂單編號',
  `userId` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員id',
  `orderPay` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '信用卡別',
  `cardNumber` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '信用卡卡號',
  `cardExpdate` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '有效期限',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員姓名',
  `userPhone` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員手機號碼	',
  `userAddress` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '通訊地址',
  `orderShip` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '寄送方式',
  `orderStatus` int(1) NOT NULL COMMENT '訂單狀態',
  `orderPrice` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '訂單總價',
  `orderType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '訂單種類',
  `created_at` date NOT NULL DEFAULT current_timestamp() COMMENT '新增時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `userId`, `orderPay`, `cardNumber`, `cardExpdate`, `username`, `userPhone`, `userAddress`, `orderShip`, `orderStatus`, `orderPrice`, `orderType`, `created_at`) VALUES
(29, '1626786035643', '3', 'MASTER', '9877666655553333', '02/2023', '王小明', '0977333555', '台北市萬華區大馬路', '宅配到府（隔日）- 運費：NT$ 200', 0, '1750', 'a', '2021-07-20');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
