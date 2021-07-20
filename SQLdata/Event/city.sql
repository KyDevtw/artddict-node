-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 20 日 21:47
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
-- 資料表結構 `city`
--

CREATE TABLE `city` (
  `cityId` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cityName` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cityFullName` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `city`
--

INSERT INTO `city` (`cityId`, `cityName`, `cityFullName`) VALUES
('CHA', '彰化縣', 'Changhua'),
('CYI', '嘉義市', 'Chiayi'),
('CYQ', '嘉義縣', 'Chiayi'),
('HSQ', '新竹縣', 'Hsinchu'),
('HSZ', '新竹市', 'Hsinchu'),
('HUA', '花蓮縣', 'Hualien'),
('ILA', '宜蘭縣', 'Yilan'),
('KEE', '基隆市', 'Keelung'),
('KHH', '高雄市', 'Kaohsiung'),
('KIN', '金門縣', 'Xiamen'),
('LIE', '連江縣', 'Taipei'),
('MIA', '苗栗縣', 'Miaoli'),
('NAN', '南投縣', 'Nantou'),
('NWT', '新北市', 'New Taipei'),
('PEN', '澎湖縣', 'Penghu'),
('PIF', '屏東縣', 'Pingtung'),
('TAO', '桃園市', 'Taoyuan'),
('TNN', '臺南市', 'Tainan'),
('TPE', '臺北市', 'Taipei'),
('TTT', '臺東縣', 'Taitung'),
('TXG', '臺中市', 'Taichung'),
('YUN', '雲林縣', 'Yunlin');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `city`
--
ALTER TABLE `city`
  ADD UNIQUE KEY `cityId` (`cityId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
