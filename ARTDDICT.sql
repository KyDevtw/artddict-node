-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 07 月 09 日 15:08
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
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者帳號',
  `pwd` char(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者密碼',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理者帳號';

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`id`, `username`, `pwd`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', '2021-05-01 12:26:14', '2021-05-02 13:10:40'),
(2, 'test', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', '2021-05-01 12:26:14', '2021-05-02 13:10:40'),
(3, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '2021-05-01 12:26:14', '2021-05-02 13:10:40');

-- --------------------------------------------------------

--
-- 資料表結構 `aucbuyerinfo`
--

CREATE TABLE `aucbuyerinfo` (
  `Sid` int(11) NOT NULL COMMENT '流水號',
  `Member_Id` int(10) NOT NULL COMMENT '會員編號',
  `auction_id` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品編號',
  `Price` int(15) NOT NULL COMMENT '出價額度',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '新增時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `aucbuyerinfo`
--

INSERT INTO `aucbuyerinfo` (`Sid`, `Member_Id`, `auction_id`, `Price`, `created_at`) VALUES
(2, 1, '1111', 200, '2021-07-06 17:02:03'),
(5, 3, '1112', 400, '2021-07-06 17:02:03');

-- --------------------------------------------------------

--
-- 資料表結構 `auctionitems`
--

CREATE TABLE `auctionitems` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `aucClass` int(20) DEFAULT NULL COMMENT '競拍產品類別',
  `aucName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品名稱',
  `aucDes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '競拍產品描述',
  `aucId` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '競拍產品編號',
  `aucPriceStart` int(11) DEFAULT NULL COMMENT '商品價格',
  `aucPriceNow` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '初始價格',
  `aucDeadline` datetime DEFAULT NULL COMMENT '截止日期',
  `aucImg` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品照片路徑',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品列表';

--
-- 傾印資料表的資料 `auctionitems`
--

INSERT INTO `auctionitems` (`id`, `aucClass`, `aucName`, `aucDes`, `aucId`, `aucPriceStart`, `aucPriceNow`, `aucDeadline`, `aucImg`, `created_at`, `updated_at`) VALUES
(8, 1, '奔跑吧', '不可告人的祕密', '1111', 66, '5000', '2021-07-21 14:11:24', 'auc_20210512145813.jpg', '2021-05-08 13:41:26', '2021-07-06 16:49:19'),
(11, 2, '覺醒的你', '暢銷書及', '1112', 69, '6000', NULL, 'auc_20210508075950.jpg', '2021-05-08 13:59:50', '2021-07-06 17:08:05'),
(14, 4, '天啊好難', '我在幹嘛', 'A3A', 99, '9000', NULL, 'auc_20210508155906.jpg', '2021-05-08 21:59:06', '2021-07-06 14:28:21'),
(15, 3, '水壺好喝', '甚至可以喝到牛肉湯', 'A4A', 99, '2500', NULL, 'auc_20210508160003.jpg', '2021-05-08 22:00:03', '2021-07-06 14:28:24'),
(16, 3, '我好想睡覺', '可是為什麼跑不動', 'A5A', 5, '3000', NULL, 'auc_20210508192625.jpg', '2021-05-09 01:26:25', '2021-07-06 14:28:27'),
(17, 3, '是不是要成功了?', '漂亮的髮夾', 'A6A', 666, '2000', NULL, 'auc_20210508192803.jpg', '2021-05-09 01:28:03', '2021-07-06 14:28:29'),
(18, 3, '拜託讓我成功吧', '漂亮的髮夾', 'A7A', 5, '6523', NULL, 'auc_20210508192821.jpg', '2021-05-09 01:28:21', '2021-07-06 14:28:31'),
(19, 3, '一定要成功阿', '漂亮的髮夾', 'A8A', 6, '5400', NULL, 'auc_20210508192838.jpg', '2021-05-09 01:28:38', '2021-07-06 14:28:34'),
(20, 1, '奔跑吧2', '漂亮的髮夾', 'A9A', 5, '6300', NULL, 'auc_20210512143023.jpg', '2021-05-12 20:30:23', '2021-07-06 14:28:37'),
(21, 2, '好熱', '漂亮的髮夾', 'A10A', 1, '9400', NULL, 'auc_20210512145845.jpg', '2021-05-12 20:58:45', '2021-07-06 14:28:40');

-- --------------------------------------------------------

--
-- 資料表結構 `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL COMMENT '流水號',
  `categoryName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '類別名稱',
  `categoryParentId` int(11) DEFAULT 0 COMMENT '上層編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `categoryParentId`, `created_at`, `updated_at`) VALUES
(1, '休閒娛樂', 0, '2021-05-10 14:25:05', '2021-05-10 14:25:05'),
(2, '股票類', 0, '2021-05-10 14:25:05', '2021-05-10 14:25:05'),
(3, '居家類', 0, '2021-05-10 14:25:05', '2021-05-10 14:25:05'),
(4, '遊戲類', 0, '2021-05-10 14:25:05', '2021-05-10 14:25:05'),
(5, '時尚類', 0, '2021-05-10 14:25:05', '2021-05-10 14:25:05');

-- --------------------------------------------------------

--
-- 資料表結構 `city`
--

CREATE TABLE `city` (
  `cityId` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cityName` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `city`
--

INSERT INTO `city` (`cityId`, `cityName`) VALUES
('CHA', '彰化縣'),
('CYI', '嘉義市'),
('CYQ', '嘉義縣'),
('HSQ', '新竹縣'),
('HSZ', '新竹市'),
('HUA', '花蓮縣'),
('ILA', '宜蘭縣'),
('KEE', '基隆市'),
('KHH', '高雄市'),
('KIN', '金門縣'),
('LIE', '連江縣'),
('MIA', '苗栗縣'),
('NAN', '南投縣'),
('NWT', '新北市'),
('PEN', '澎湖縣'),
('PIF', '屏東縣'),
('TAO', '桃園市'),
('TNN', '臺南市'),
('TPE', '臺北市'),
('TTT', '臺東縣'),
('TXG', '臺中市'),
('YUN', '雲林縣');

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `name` varchar(9999) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(999) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` varchar(999) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proId` varchar(999) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` varchar(999) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `comments`
--

INSERT INTO `comments` (`id`, `name`, `content`, `rating`, `proId`, `created_at`) VALUES
(1, '123', '123', '5', '101 ', '999'),
(9, '123', '123', '4', '101 ', ''),
(15, '1', '1', '1', '101 ', ''),
(20, '111', '111', '3', '101 ', '');

-- --------------------------------------------------------

--
-- 資料表結構 `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `eventClass` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品類別',
  `eventId` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動編號',
  `eventName` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動名稱',
  `eventDescription` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動描述',
  `eventDateStart` date NOT NULL COMMENT '活動開始日期',
  `eventDateEnd` date NOT NULL COMMENT '活動結束日期',
  `eventPrice` int(11) NOT NULL COMMENT '活動價格',
  `eventImg` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動圖片',
  `eventCity` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '活動城市',
  `museumId` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '舉辦館別',
  `userId` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '建立活動的使用者',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '新增時間',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '修改時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `event`
--

INSERT INTO `event` (`id`, `eventClass`, `eventId`, `eventName`, `eventDescription`, `eventDateStart`, `eventDateEnd`, `eventPrice`, `eventImg`, `eventCity`, `museumId`, `userId`, `created_at`, `updated_at`) VALUES
(1, 'C', '001', 'WHAAAAAT’S', '第二屆WHAAAAAT’S展會將於2021年5月7-9日再次盛大舉行，選址於台北喜來登大飯店。自2020年2月始，一場疫症改變了人與人之間的距離，更改變了你我所熟悉的藝術生態。本屆展會主題為「我們的時代」，我們一定要懷抱希望、保持樂觀；期許藉由藝術家們精彩的創作，為我們所處的時代發聲，用美好的創作，為自己說話也溫暖他人，用正向熱情的創作，喚起大眾對自身時代的認同與重視，將藝術的愛傳遞給每一人。<br /> ', '2021-06-01', '2021-06-14', 100, '001.jpg', 'TAO', '', '', '2021-05-10 05:59:13', '2021-05-10 05:59:13'),
(2, 'C', '002', '新一代設計展YODEX', '新一代設計展」自1981年開辦以來，致力將展覽朝品牌化、專業化、國際化之方向推進，今年邁入第40年，目前已是全球最具規模之設計科系學生主題聯展。展覽內容橫跨產品與工藝設計、視覺傳達設計、數位多媒體設計、空間與建築設計、服裝與時尚設計、跨領域整合設計等等多元領域。今年有全台66校、144系、約12,000位設計新秀、4,000件作品參與展出。 除展覽外，另結合金點新秀設計獎、新一代產學合作專案，廣邀企業參與，是台灣發掘優秀設計人才與傑出創意之重要平台。 ', '2021-06-10', '2021-06-29', 250, '002.jpg', 'TPE', '1', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(3, 'C', '003', 'What is TEDxDongWuU？\r\n', 'TED為美國一個國際性非營利組織，秉持著好點子值得傳遞(Ideas worthspreading)的精神，從1984年創立以來，逐步將全世界各個角落的好點子，匯集在網路平台，實踐了知識傳遞之目的。TED每年舉辦為期一週的大型年會，邀請眾多講者以簡報的方式傳達想法與知識，搭配精心營造的年會氣氛，讓傳遞點子變得輕鬆有趣。\r\n而著名的TEDTalk簡報，包含TED與TEDx的演講內容，以18分鐘為限，並且搭配無數生動的故事，成為全世界最啟發人心的簡報方式。TED官方網站將這些TEDTalk免費提供全球點閱，並翻譯成多國語言，使知識無國界，讓好點子遍佈全球。\r\nTEDxEvent是延續TED的精神，結合地方社群特色與需求的獨立組織，讓人們不只坐在電腦前看影片，也能走出家中，體驗TED conference獨有的現場氣氛，讓每個人能夠參與其中，並且與有共同熱忱的人分享、交流。\r\nWhat is TEDxDongWuU？\r\n', '2021-06-23', '2021-06-28', 350, '003.jpg', 'TPE', '1', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(4, 'C', '004', 'INITIATION', '國立臺灣師範大學美術系成立於1947年8月，為臺灣第一所大專院校成立的美術相關科系，匯聚自中國與留學日本返臺的名師，推動臺灣基礎美育，培育出多面向創作思維的藝術家，繼而影響臺灣藝壇動向。而臺師大設立於現今的古亭，清朝舊名為「鼓亭莊」，是瑠公圳的重要樞紐，過去滋潤的是大地的農產；臺師大在此地建校後，變成教育的源泉，源源不絕的將智慧向四處傳播、蔓延開來。\r\n \r\n「引藝領潮——1947・鼓亭莊聯展」透過曾就學及授教於臺師大美術系、現今為藝術界中各領域翹楚的部分作品，策畫面向公眾的展覽；透過教育單位或館舍的典藏，具體而微的組構出這塊土地上饒具特色的藝文歷史脈絡。\r\n', '2021-06-23', '2021-07-08', 80, '004.jpg', 'TXG', '', '', '2021-05-05 13:05:17', '2021-05-05 13:05:17'),
(5, 'C', '005', '紙膠帶的100種可能', '【紙膠帶的100種可能】 創意紙膠帶拼貼創作競賽\r\n由大年印刷x大米創意所主辦的「紙給你膠帶」系列活動已邁入第三年，為了擴大活動參與的廣度，更期望透過活動讓民眾體驗紙膠帶的無限可能，本屆將以跨年度系列活動方式，舉辦兩階段的紙膠帶創意競賽，讓民眾可從參與紙膠帶設計，到實際應用紙膠帶創作，一同進入紙膠帶的歡樂世界。', '2021-06-24', '2021-07-05', 50, '005.jpg', 'TNN', '', '', '2021-05-05 13:11:03', '2021-05-05 13:11:03'),
(6, 'C', '006', '解碼雲端', '2014年，牯嶺街小劇場憑藉著跨越時代的建物歷史，以及它從軍警機構轉變成劇場的文化內涵，冊列為台北市的歷史建築。2020年，完成歷史建築整修、重新整裝出發的牯嶺街小劇場將推出「重啟城中之心」計畫，期待透過新一波的展演創作單元與歷史空間相互對話，打開一個全新的生活交流場域，進而支持表演藝術工作者探索更具挑戰性的視野，為重新開放的小劇場增添新能量！\r\n', '2021-06-29', '2021-07-15', 150, '006.jpg', 'CHA', '', '', '2021-05-08 07:05:01', '2021-05-08 07:05:01'),
(7, 'C', '007', '探索臺北城', '台北文青小旅行再解鎖! 鬧區中心的自來水博物館，竟然埋著屬於台北人的地下宮殿! ! 地下水宮殿像好酒一樣私藏的越陳越香，有著台北天堂路的新生南路竟然有這麼多故事，文藝選染著城中的色彩，是時候來個文青小旅行了!', '2021-06-28', '2021-07-07', 150, '007.jpg', 'TPE', '1', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(8, 'C', '008', '塑象-動物雕塑體驗', '藝術家將在沒有專業美術背景的前題之下，教導大家如何以簡單、有效果的方式捏塑一個動物頭像！ 這次課程的主題為-大象，在4小時的課程時間中，藝術家將帶領參與學員瞭解雕塑家如何思考造型，並以簡單明瞭的方式帶大家進行親手實踐。\r\n', '2021-07-01', '2021-07-15', 400, '008.jpg', 'KHH', '', '', '2021-05-05 13:29:02', '2021-05-05 13:29:02'),
(9, 'C', '009', '巷弄之間-尋找藏達人計畫', '活動多於戶外進行，請自備防曬用品/雨具。\r\n環保愛地球，請參加者自行攜帶飲用水。\r\n出發當天請準時報到，逾時不候，亦不退費。\r\n出發日前 8 日退費需收取10%手續費\r\n出發日前 8 日至當日內不接受取消，並不予退回款項。\r\n如因天災等不可抗力因素，主辦單位將主動聯繫延期或退款。\r\n若人數不足無法成行，主辦單位將於7日前另行通知改期或全額退費。\r\n主辦單位保有調整、修改活動之權利。\r\n', '2021-07-02', '2021-07-04', 250, '009.jpg', 'HSZ', '', '', '2021-05-07 16:50:20', '2021-05-07 16:50:20'),
(10, 'C', '010', '臺博館建築再發現', '《臺博館建築再發現－談臺博館及其建築師野村一郎》\r\n臺灣博物館本館是臺灣唯一一座不僅保留了其原本歷史主義建築形式，而且繼續履行其最初展覽館功能的日治時期官方建築。\r\n在這場座談中，講者除了分析臺博館建築物的形式和結構外，也將聚焦於臺博館的設計師野村一郎( Ichirō Nomura，1868－1942)在1910年前往歐美，尤其是倫敦和紐約的旅程中，可能看到過哪些建築物及城市景觀而成為影響臺博館建築設計的參考原型。', '2021-07-14', '2021-07-21', 150, '010.jpg', 'HSZ', '', '', '2021-05-07 16:50:23', '2021-05-07 16:50:23'),
(11, 'C', '011', '故宮南院戶外美術館-藝術方舟ARK OF ART', '藝術的方舟Ark of Art，故宮南院匯聚了當代與傳統，如同一艘行駛於歷史長河上的方舟，承載著藝術傳承的使命，包容文化與歷史的的多元，貯存、典藏所有的藝術生命，憑藉戶外美術館的成立，期許在自由的公共藝術空間中，滿足人們探索藝文人文的渴望，並建立生命與情感之連結 蒐集人類的足跡，航向世界的藝術烏托邦。\r\n', '2021-07-22', '2021-08-12', 200, '011.jpg', 'CYI', '', '', '2021-05-10 08:20:41', '2021-05-10 08:20:41'),
(12, 'D', '101', '品牌視覺設計研究工坊', '本課程由瘋設計與大象設計 Elephant Design負責人王胤卓設計師 共同企劃，透過五週的課程解說與工作坊操作帶領學員進入專業品牌視覺設計工作。從品牌的視覺設計切入，融入創意思考方式，延伸到品牌延伸應用物甚至到空間設計，建立完整設計概念輸出之邏輯訓練 ， 以達視覺形式與傳達精神能恰如其分的精準設計成果 。', '2021-05-20', '2021-05-19', 1500, '101.jpg', 'KHH', '', '', '2021-05-05 13:41:34', '2021-05-05 13:41:34'),
(13, 'D', '102', '想像吧！假如瑞芳是個主題樂園！', '瑞芳的勇者，讓我們一邊打怪一邊幫城市升級！！！！！我們發起了一場遊戲，等你來挑戰！！！！！！我們會帶的你走遍大瑞芳地區，由你來發現感動人心的小角落，讓這些特別的時刻紀錄成瑞芳藏寶圖！', '2021-05-13', '2021-05-19', 1500, '102.jpg', 'TPE', '2', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(14, 'D', '103', '家物事HOUSING THINGS', '「家物事：一場發生在藝術空間的聚落與實踐」是一場正在臺藝大有章藝術博物館展出的，關於策展情境、藝術再現、公眾參與，以及空間歷史的展覽。而這場藝術家工作坊，將由五組藝術家主導，和參與者們一同在展場間駐留、移動，討論各種「家」、「物」、「事」的聚落與實踐。', '2021-05-18', '2021-05-24', 700, '103.jpg', 'TXG', '', '', '2021-05-05 13:41:34', '2021-05-05 13:41:34'),
(15, 'D', '104', '品牌設計實戰工作坊', '視覺設計是帶給消費者的第一印象，以及產生記憶點最佳的方式，但在製作設計之前更需要了解品牌的市場及價值。為擴大三創成效、爭取外部資源，本校與高雄市政府青年局合作辦理「品牌設計實戰工作坊」。本工作坊旨在學習品牌策略及視覺發展，從無到有建構品牌，嚴謹的品牌分析、品牌策略擬定到企業識別規劃，迅速建立對品牌的認知，讓學員學習了解視覺設計與品牌之間的關聯性，並期許學員運用在自身領域，並培育不同領域之專業與創新創業能力。', '2021-05-18', '2021-05-31', 2500, '104.jpg', 'TXG', '', '', '2021-05-05 17:46:37', '2021-05-05 17:46:37'),
(16, 'D', '105', '歌仔戲工作坊', '上班族如何在忙碌工作中進修？面對日常壓力時，內心總是感到焦慮煩躁嗎？來歌劇院充電吧！邁入第二年的「藝術動一動」以「身體律動」、「歌仔戲」與「音樂劇」三大主題，讓您在打卡下班後、轉換心情，從輕食、暖身開始，以沉浸、體驗舒展身心靈，享受精彩充電夜。', '2021-05-19', '2021-05-31', 2000, '105.jpg', 'TPE', '2', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(21, 'C', '012', '紀曜邦摺紙攝影展', '摺紙，優雅且靜心，陪伴許多紀曜邦的獨處時光。透過摺紙層疊、折線、成形的創作，化作各式各樣的立體符號，在紛擾的時光中找到片刻療癒。 課程將與您一起實作，摺出心中一塊靜謐。—紀曜邦‧摺紙課程。\r\n', '2021-07-22', '2021-08-12', 200, '012.png', 'CHA', '', '', '2021-05-14 01:50:26', '2021-05-14 01:50:26'),
(22, 'D', '106', '消消防災　BLOCK DISASTER', '台灣設計館《消消防災》防災設計展—展覽系列活動！ 四月起至七月，每週末台灣設計館將展開防災遊戲闖關大挑戰！ 跟著設計館防災小尖兵，從八關遊戲體驗中學習實用防災知識， 只要70分鐘就能成為防災小達人。 有玩有保庇，快揪家人朋友一起來闖關成功！', '2021-05-19', '2021-05-31', 2000, '106.jpg', 'TPE', '2', '', '2021-07-07 02:19:50', '2021-07-07 02:19:50'),
(23, 'C', '013', '悸動──無所遁逃的不確定性', '「聲音」成立的前提是「身體」的辨認──包含了「聽覺」以及雙耳因此產生的「平衡感」與「空間方位感」。毫不意外地，數位科技持續地撼動身體慣有的感知能力，聲響與影像的對應關係亦早在電影問世後便不合邏輯、充滿幻術。「悸動──調變王福瑞」展覽的三件VR作品，則在虛擬技術中挑釁著感知：當身體進入虛擬空間中而不見肉身，更不見若遠似近、飛速竄動的聲源；當身體的移動觸發聲音與影像隨機產生，也意味著失去了藉由聆聽而錨定方位之力；當聲源只在VR視鏡中顯影而肉眼所見反倒如「虛擬」般隱形於現實世界。又更或者，當「影像巨大而迫近」所產生「異於日常」的歧異性，幾乎無異於觀看影廳巨型投影幕時的震撼與盲動欲力──既無從預料，亦無所遁逃。\r\n', '2021-07-27', '2021-09-09', 200, '013.jpg', 'NWT', '', '', '2021-05-14 01:28:58', '2021-05-14 01:28:58'),
(24, 'D', '107', 'HCD 工作坊', '設計服務大部分的時間，是在減少客戶的不安。提案─是設計師踏入市場必要學習的環節，是一份難以在案例成果中解讀的「看不見的工作」。好的提案能將內容說清楚，以明快節奏區別訊息的主賓；更好的提案，帶有一種表演性質，融入設計師人格的特殊性，令客戶與合作夥伴留下正面印象，建立讓人信賴的專業形象。\r\n第一期 HCD 工作坊〈提案溝通學〉，將透過為期兩天，連續 16 小時的密集訓練，陪伴初入業界與即將進入市場的設計工作者，依據主要設計項目與作品風格，建立個人化的提案流程模組，從獨立接案到創業自由活用。\r\nStudioPros 設計總監 李宜軒，曾任職於 Bito、IBM 等重視設計管理的工作團隊。她將分享多年經驗，以實際發表專案的簡報為例，說明專案在溝通過程所克服的困難以及解決方案。也將依據學員自身的提案經驗，指出簡報中的矛盾與盲點，站在觀看者的立場，理解提案被質疑的原因，完整提案內容的全面性。', '2021-05-19', '2021-05-21', 2000, '107.png', 'TXG', '', '', '2021-05-14 01:50:01', '2021-05-14 01:50:01'),
(25, 'C', '014', '見證時代-森山大道國際攝影展', '森山大道，被譽為當代街頭攝影的代表人物，自1959年起，進入當時著名攝影家岩宮武二的工作室擔任助理後便與攝影有了不解之緣。至今2021，走過62個年頭，森山大道見證了日本自戰後至現代的社會變遷，其作品等同見證了日本發展的過程與重新定義街頭影像。這個展覽。【見證時代】，是森山大道的故事，也會是你的攝影故事... 異角藝術Art Angle 年度攝影展覽，重新定義攝影與見證這個時代。', '2021-07-28', '2021-09-09', 200, '014.png', 'TXG', '', '', '2021-05-14 01:49:49', '2021-05-14 01:49:49'),
(26, 'D', '108', 'VERSE Forum 旅遊之夜', 'VERSE在第五期（2021/4月號）開始討論讓旅行成為重新認識這座島嶼文化與歷史的方法。我們想要邀請大家一起踏上台灣無比豐盛的文化路徑， 讓歷史與記憶進入文化與空間重建，看到旅行台灣的新起點。\r\n這些旅行可能並不輕鬆，需要對這些地點的過去與未來有更多一點的理解與好奇，需要多一點的思索與感受。\r\n本次講座邀請到前文化部長鄭麗君與自然生態作家劉克襄，一同帶領大家踏上「台灣」這條路，深度體驗屬於我們自身的在地風景，更進一步認識這塊土地的身世。讓歷史與記憶進入生命的脈絡，文化與空間重建我們的思維，重新看見旅行台灣的新起點。', '2021-05-19', '2021-05-21', 2000, '108.jpg', 'CHA', '', '', '2021-05-14 01:28:30', '2021-05-14 01:28:30'),
(27, 'D', '109', 'Ｎiusclub-螢光奇幻作畫實驗室', '課程沒有任何規則 就要你盡情\"潑灑\" \"丟顏料\" 在最放鬆舒服的狀態下創作 潑灑你的創意 解放你的內心世界 課程將教大家如何運用如螢光顏料、紙膠帶等不同媒材。 就算沒有規則，也能創作出一幅精美畫作', '2021-05-19', '2021-05-21', 2000, '109.jpg', 'TXG', '', '', '2021-05-14 01:28:22', '2021-05-14 01:28:22'),
(28, 'C', '015', '【尋 找】主題展', '在這一場【尋找】主題展的創作者一日活動中，包含了「展覽導覽」「個性似顏繪」與「互動藝術體驗」三個面向的內容，豐富精彩！僅有八個名額，請把握機會搶下名額！', '2021-07-28', '2021-09-09', 200, '015.jpg', 'TNN', '', '', '2021-05-14 01:28:12', '2021-05-14 01:28:12');

-- --------------------------------------------------------

--
-- 資料表結構 `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL COMMENT '流水號',
  `itemName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品名稱',
  `itemImg` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品照片路徑',
  `itemPrice` int(11) NOT NULL COMMENT '商品價格',
  `itemQty` tinyint(3) NOT NULL COMMENT '商品數量',
  `itemCategoryId` int(11) NOT NULL COMMENT '商品種類編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `items`
--

INSERT INTO `items` (`itemId`, `itemName`, `itemImg`, `itemPrice`, `itemQty`, `itemCategoryId`, `created_at`, `updated_at`) VALUES
(0, '南街殷賑', '20210512112351.png', 1200, 8, 1, '2021-05-10 14:23:56', '2021-05-12 12:09:19'),
(5, 'David Shrigley 撲克牌', 'item_20210512142106.jpeg', 350, 20, 1, '2021-05-12 14:21:06', '2021-05-12 15:39:54'),
(6, '陳澄波桌遊', 'item_20210512143353.png', 1500, 30, 1, '2021-05-12 14:33:53', '2021-05-12 14:33:53'),
(7, '太極疊疊樂', 'item_20210512143631.jpeg', 350, 15, 1, '2021-05-12 14:36:31', '2021-05-12 14:36:31');

-- --------------------------------------------------------

--
-- 資料表結構 `item_lists`
--

CREATE TABLE `item_lists` (
  `multipleImageId` int(11) NOT NULL COMMENT '流水號',
  `multipleImageImg` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '圖片名稱',
  `itemId` int(11) NOT NULL COMMENT '商品編號',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `location`
--

CREATE TABLE `location` (
  `location` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地區',
  `city` text COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '城市'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `location`
--

INSERT INTO `location` (`location`, `city`) VALUES
('北部', 'TPE'),
('北部', 'NWT'),
('北部', 'KEE'),
('北部', 'TAO'),
('北部', 'HSZ'),
('北部', 'HSQ'),
('中部', 'MIA'),
('中部', 'TXG'),
('中部', 'CHA'),
('中部', 'NAN'),
('中部', 'YUN'),
('南部', 'CYI'),
('南部', 'CYQ'),
('南部', 'TNN'),
('南部', 'KHH'),
('南部', 'PIF'),
('北部', 'ILA'),
('東部及離島', 'HUA'),
('東部及離島', 'TTT'),
('東部及離島', 'PEN'),
('東部及離島', 'KIN'),
('東部及離島', 'LIE');

-- --------------------------------------------------------

--
-- 資料表結構 `museum`
--

CREATE TABLE `museum` (
  `id` int(10) NOT NULL COMMENT '流水號',
  `musId` int(10) DEFAULT NULL COMMENT '博物館編號',
  `musName` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '博物館名稱',
  `musCity` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '縣市編號',
  `musImg` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '圖片路徑',
  `Px` double DEFAULT NULL COMMENT '經度',
  `Py` double DEFAULT NULL COMMENT '緯度',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `update_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更改時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `museum`
--

INSERT INTO `museum` (`id`, `musId`, `musName`, `musCity`, `musImg`, `Px`, `Py`, `created_at`, `update_at`) VALUES
(1, 1, '臺北市立美術館', 'TPE', '001.jpg', 25.072615859459205, 121.52481019741808, '2021-05-10 09:21:10', '2021-07-06 23:39:07'),
(2, 2, '臺北市立忠泰美術館', 'TPE', '003.jpg', 25.0458544232279, 121.53737516751512, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(3, 3, '順益台灣美術館', 'TPE', '004.jpg', 25.046671942330583, 121.51092876818518, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(4, 4, '楊英風美術館', 'TPE', '006.jpg', 25.032399974008143, 121.5144721970202, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(5, 5, '北師美術館', 'TPE', '007.jpg', 25.02487207743551, 121.54456405469068, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(6, 6, '國立臺灣師範大學美術館', 'TPE', '008.jpg', 25.027971612384086, 121.53009879702014, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(7, 7, '長流美術館', 'TPE', '009.jpg', 25.03915276316819, 121.53037077480313, '2021-05-10 09:21:10', '2021-07-07 09:44:54'),
(8, 8, '國際藝術村', 'TPE', '010.jpg', 25.048784415371607, 121.52240970476439, '2021-05-10 09:21:10', '2021-07-07 09:46:12'),
(9, 9, '天使美術館', 'TPE', '011.jpg', 25.03397159338461, 121.53498149702023, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(10, 10, '巫登益美術館', 'TPE', '012.jpg', 25.0337041662231, 121.56487683934938, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(11, 11, '鳳甲美術館', 'TPE', '013.jpg', 25.125276889370223, 121.49905466449204, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(12, 12, '蘇荷兒童美術館', 'TPE', '014.jpg', 25.117946126685933, 121.52465799702215, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(13, 13, '關渡美術館', 'TPE', '015.jpg', 25.133570809935, 121.47155972585794, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(14, 14, '花博公園美術', 'TPE', '016.jpg', 25.07075213472045, 121.52486821051494, '2021-05-10 09:21:10', '2021-07-06 23:43:53'),
(15, 15, '國立臺灣美術館', 'TXG', '002.jpg', 24.142425526816282, 120.66327197390653, '2021-07-06 23:51:21', '2021-07-06 23:51:21'),
(16, 16, '晶美術館', 'TXG', '017.jpg', 24.16292823325435, 120.64573264182737, '2021-07-06 23:51:21', '2021-07-06 23:51:21'),
(17, 17, '亞洲大學現代美術館', 'TXG', '018.jpg', 24.048828481572784, 120.68847639336789, '2021-07-06 23:54:24', '2021-07-06 23:54:24'),
(18, 18, '朱魯青美術館', 'TXG', '019.jpg', 24.154181875491535, 120.66284617723205, '2021-07-06 23:54:24', '2021-07-06 23:54:24');

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `orderId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '訂單編號',
  `userMail` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員帳號/信箱',
  `orderPay` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '信用卡別',
  `userName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員姓名',
  `userPhone` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '會員手機號碼	',
  `userAddress` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '通訊地址',
  `orderShip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '寄送方式',
  `created_at` date NOT NULL DEFAULT current_timestamp() COMMENT '新增時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `userMail`, `orderPay`, `userName`, `userPhone`, `userAddress`, `orderShip`, `created_at`) VALUES
(1, '001', '123@abc.com', 'VISA', '王小明', '0912333444', '台北市北投區大馬路', '宅配到府 - 運費：NT$ 80', '2021-07-08');

-- --------------------------------------------------------

--
-- 資料表結構 `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `orderId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '訂單編號',
  `orderQty` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '訂單產品數量',
  `proId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品編號'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `id` int(100) NOT NULL COMMENT '流水編號',
  `proName` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品名稱',
  `proId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品編號',
  `proPrice` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品價格',
  `proQty` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品數量',
  `proClass` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品種類',
  `proDes` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品描述',
  `proImg` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '產品圖片',
  `museumId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '博物館別'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`id`, `proName`, `proId`, `proPrice`, `proQty`, `proClass`, `proDes`, `proImg`, `museumId`) VALUES
(230, '海天藍的交響 藝術提袋', '101', '2500', '200', '服飾類', '袋子', '20210510115402.webp', ''),
(231, '海舞 藝術提袋', '102', '2500', '200', '服飾類', '袋子', '20210510115506.webp', ''),
(234, '梵谷畫像 T恤', '104', '2500', '5000', '服飾類', '衣服', '20210510130126.jpeg', ''),
(235, '莫內 睡蓮 T恤', '106', '8888', '77', '服飾類', '衣服', '20210510131839.jpeg', ''),
(238, '喵', '123', '123', '200', '貓類', '描述', '20210511115710.jpeg', '');

-- --------------------------------------------------------

--
-- 資料表結構 `share`
--

CREATE TABLE `share` (
  `shareId` int(11) NOT NULL,
  `eventNum` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '活動編號',
  `userId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用者帳號',
  `shareComment` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分享留言',
  `shareImg` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[]' COMMENT '分享圖片',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '新增時間',
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `share`
--

INSERT INTO `share` (`shareId`, `eventNum`, `userId`, `shareComment`, `shareImg`, `created_at`, `update_at`) VALUES
(1, '13', 'test', '瑞芳的勇者，讓我們一邊打怪一邊幫城市升級！！！！！我們發起了一場遊戲，等你來挑戰！！！！！！我們會帶的你走遍大瑞芳地區，由你來發現感動人心的小角落，讓這些特別的時刻紀錄成瑞芳藏寶圖！', '[\"001.jpg\"]', '2021-07-08 07:54:04', '2021-07-08 07:54:04'),
(2, '14', 'Kurt', '瑞芳的勇者，讓我們一邊打怪一邊幫城市升級！！！！！我們發起了一場遊戲，等你來挑戰！！！！！！我們會帶的你走遍大瑞芳地區，由你來發現感動人心的小角落，讓這些特別的時刻紀錄成瑞芳藏寶圖！', '[\"001.jpg\",\"002.jpg\",\"003.jpg\",\"004.jpg\"]', '2021-07-08 05:31:28', '2021-07-08 05:31:28'),
(32, '15', 'Kurt', '瑞芳的勇者，讓我們一邊打怪一邊幫城市升級！！！！！我們發起了一場遊戲，等你來挑戰！！！！！！我們會帶的你走遍大瑞芳地區，由你來發現感動人心的小角落，讓這些特別的時刻紀錄成瑞芳藏寶圖！', '[\"001.jpg\",\"002.jpg\",\"003.jpg\",\"004.jpg\"]', '2021-07-08 03:17:22', '2021-07-08 03:17:22'),
(37, '16', 'Kurt', '瑞芳的勇者，讓我們一邊打怪一邊幫城市升級！！！！！我們發起了一場遊戲，等你來挑戰！！！！！！我們會帶的你走遍大瑞芳地區，由你來發現感動人心的小角落，讓這些特別的時刻紀錄成瑞芳藏寶圖！', '[\"001.jpg\",\"002.jpg\",\"003.jpg\",\"004.jpg\"]', '2021-07-08 05:31:41', '2021-07-08 05:31:41'),
(65, '22', 'NULL', '123123', '[\"IMG_0007.JPG\",\"gplus1912772378.jpg\",\"gplus2005976625.jpg\",\"gplus1731430276.jpg\"]', '2021-07-09 11:25:11', '2021-07-09 11:25:11');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT '流水號',
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '帳號',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密碼',
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '性別',
  `mobile` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手機號碼',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '通訊地址',
  `userImg` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '圖片',
  `userfav` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '追蹤清單',
  `userCoupon` int(50) DEFAULT NULL COMMENT '優惠券',
  `login` int(11) NOT NULL DEFAULT 0 COMMENT '開通狀況',
  `createdDate` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updatedDate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='會員資料表';

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `gender`, `mobile`, `birthday`, `address`, `userImg`, `userfav`, `userCoupon`, `login`, `createdDate`, `updatedDate`) VALUES
(1, 'user01@artddict.com', 'Chun', '123456', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2021-07-09 19:37:28', '2021-07-09 19:37:28');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `aucbuyerinfo`
--
ALTER TABLE `aucbuyerinfo`
  ADD PRIMARY KEY (`Sid`);

--
-- 資料表索引 `auctionitems`
--
ALTER TABLE `auctionitems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aucId` (`aucId`),
  ADD KEY `aucId_2` (`aucId`);

--
-- 資料表索引 `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- 資料表索引 `city`
--
ALTER TABLE `city`
  ADD UNIQUE KEY `cityId` (`cityId`);

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

--
-- 資料表索引 `item_lists`
--
ALTER TABLE `item_lists`
  ADD PRIMARY KEY (`multipleImageId`);

--
-- 資料表索引 `museum`
--
ALTER TABLE `museum`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`shareId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userMail` (`username`),
  ADD KEY `userName` (`username`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `aucbuyerinfo`
--
ALTER TABLE `aucbuyerinfo`
  MODIFY `Sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `auctionitems`
--
ALTER TABLE `auctionitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=22;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=79;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `items`
--
ALTER TABLE `items`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `item_lists`
--
ALTER TABLE `item_lists`
  MODIFY `multipleImageId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `museum`
--
ALTER TABLE `museum`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=31;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT COMMENT '流水編號', AUTO_INCREMENT=242;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share`
--
ALTER TABLE `share`
  MODIFY `shareId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
