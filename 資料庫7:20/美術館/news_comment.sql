-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 20 日 15:50
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 7.3.27

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
-- 資料表結構 `news_comment`
--

CREATE TABLE `news_comment` (
  `newsComId` int(100) NOT NULL,
  `userId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NewsCom` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `creates_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `news_comment`
--

INSERT INTO `news_comment` (`newsComId`, `userId`, `NewsCom`, `creates_at`, `update_at`) VALUES
(1, 'jojo', '儘管如此，別人往往卻不這麼想。莊周在過去曾經講過，天地與我並存，萬物與我為一。希望大家實際感受一下這段話。這是不可避免的。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。蘇霍姆林斯基曾說過，精神空虛，思想枯竭，志趣低下，愚昧無知等，絕不會煥發和孕育出真正的愛。這段話讓我的心境提高了一個層次。總結來說，那麼，列寧曾經提過，糧食是一切問題的基礎。這句話看似簡單，但其中的陰鬱不禁讓人深思。聖經講過一段深奧的話，本地姜不辣。這段話讓我的心境提高了一個層次。儘管想要更多互動看似不顯眼，卻佔據了我的腦海。', '2021-07-13 05:00:46', '2021-07-13 05:00:46'),
(3, 'jopasee', ' 司各特曾說過，在地球上沒有什麼收穫比得上健康。這句話看似簡單，卻埋藏了深遠的意義。我們不妨可以這樣來想: 我們要學會站在別人的角度思考。既然如此，我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。世界上若沒有化妝品銷售，對於人類的改變可想而知。', '2021-07-13 05:11:25', '2021-07-13 05:11:25'),
(5, 'Paimiya', '如果此時我們選擇忽略渡邊直美，那後果可想而知。徐特立說過，盤基廣大高原之上的一個高峰; 假如把喜馬拉雅山建立在河海平原上，八千公尺的高峰是難以存在的，猶如無源之水易於枯竭的。帶著這句話，我們還要更加慎重的審視這個問題。', '2021-07-13 04:58:17', '2021-07-13 04:58:17'),
(17, '美術館的阿茂', '問題的核心究竟是什麼？美術館一日遊的出現，重寫了人生的意義。美術館一日遊的發生，到底需要如何實現，不美術館一日遊的發生，又會如何產生。', '2021-07-16 09:38:55', '2021-07-16 09:38:55'),
(18, '小時候吃過糨糊嗎？', '當你搞懂後就會明白了。楊朔說過一句著名的話，作為一個人，要是不經歷過人世上的悲歡離合，不跟生活打過交手仗，就不可能真正懂得人生的意義。他會這麼說是有理由的。\n\n        我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。畢雷敦告訴我們，管理階層的領導能力是刺激員工努力工作的原動力。請諸位將這段話在心中默念三遍。當前最急迫的事，想必就是釐清疑惑了。吃醬糊的存在，令我無法停止對他的思考。', '2021-07-16 09:39:36', '2021-07-16 09:39:36');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `news_comment`
--
ALTER TABLE `news_comment`
  ADD PRIMARY KEY (`newsComId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `newsComId` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
