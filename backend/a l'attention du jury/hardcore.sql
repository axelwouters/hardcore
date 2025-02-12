-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 12 fév. 2025 à 18:31
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hardcore`
--

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `story` longtext NOT NULL,
  `receipt_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `statut` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = message non lu, 1 = message lu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `story`, `receipt_date`, `statut`) VALUES
(9, 'lyro', 'lyro@gmail.com', 'coucou', '2025-01-28 20:05:09', 1),
(10, 'jorge', 'jorge@gmail.com', 'coucou', '2025-01-28 20:05:16', 0),
(11, 'aicha', 'aicha@gmail.com', 'coucou', '2025-01-28 20:05:21', 0),
(14, 'axel', 'axel@gmail.com', 'coucou', '2025-01-28 20:13:33', 0),
(15, 'test1', 'test1@gmail.com', 'coucou', '2025-01-28 20:32:07', 0),
(16, 'test2', 'test2@gmail.com', 'coucou', '2025-01-30 19:40:03', 1),
(17, 'leon', 'leon@yahoo.com', 'cccc', '2025-02-01 21:39:49', 0),
(20, 'leon', 'leon@yahoo.com', 'hhhhhhhhhfeibgfiezgfieg', '2025-02-01 22:51:46', 0);

-- --------------------------------------------------------

--
-- Structure de la table `hardcores`
--

CREATE TABLE `hardcores` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `hardcores`
--

INSERT INTO `hardcores` (`id`, `name`, `description`, `price`, `picture`, `quantity`, `created_at`) VALUES
(4, 'bombe aérosol hardcore de couleur blanc-divinite', 'Spray aérosol hardcore de couleur blanc-divinite', 4.2, 'bombe-a-peinture-blanc-divinite.jpg', 30, '2024-08-14 12:32:42'),
(7, 'Bombe aérosol a peinture Hardcore Mauve', 'Spray aérosol Hardcore de couleur Mauve', 4.2, 'bombe-a-peinture-mauve.jpg', 30, '2024-08-14 14:43:46'),
(8, 'Bombe aérosol a peinture de couleur vert kaki', 'Un spray aérosol de la marque hardcore de couleur kaki', 4.2, 'bombe-a-peinture-vert-kaki.jpg', 30, '2024-09-04 10:08:51'),
(9, 'Bombe aérosol a peinture de couleur bleu neptune', 'Spray aérosol hardcore de couleur bleu-neptune', 4.2, 'bombe-a-peinture-bleu-neptune.jpg', 30, '2024-09-04 10:29:57'),
(10, 'Bombe aérosol a peinture de couleur bleu-clair', 'Spray aérosol hardcore de couleur bleu-clair', 4.2, 'bombe-a-peinture-bleu-clair.jpg', 30, '2024-09-04 11:23:51'),
(11, 'Bombe a peinture hardcore de couleur rouge clair', 'Spray aérosol hardcore de couleur rouge clair', 4.2, 'bombe-a-peinture-rouge-clair.jpg', 30, '2024-09-04 12:26:11'),
(12, 'bombe aérosol hardcore de couleur marron-chocolat', 'Spray aérosol hardcore de couleur marron chocolat', 4.2, 'bombe-a-peinture-marron-chocolat.jpg', 30, '2024-09-04 12:31:17'),
(14, 'Bombe aérosol a peinture de couleur noir satin ', 'Spray aérosol Hardcore qui a la couleur Noir Satin', 4.2, 'bombe-a-peinture-noir-satine.jpg', 30, '2024-09-04 15:18:47'),
(15, 'Bombe aérosol a peinture de couleur blanc mat', 'Spray aérosol hardcore de couleur blanc mat', 4.2, 'bombe-a-peinture-blanc-mat.jpg', 30, '2024-09-05 09:31:32'),
(16, 'Bombe aérosol a peinture de couleur Mangue', 'Spray a peinture hardcore de couleur mangue', 4.2, 'bombe-a-peinture-mangue.jpg', 30, '2024-09-06 10:55:38'),
(18, 'Bombe aérosol a peinture de couleur orange', 'Spray aérosol Hardcore de couleur orange', 4.2, 'bombe-a-peinture-orange.jpg', 30, '2024-09-06 11:47:09'),
(22, 'Bombe aérosol de la marque hardcore de couleur vert claire', 'Spray aérosol hardcore de vert claire', 4.2, 'bombe-a-peinture-vert-clair.jpg', 30, '2024-09-14 19:26:57'),
(23, 'Bombe aérosol a peinture de couleur vert-nature', 'Spray aérosol hardcore de couleur vert nature', 4.2, 'bombe-a-peinture-vert-nature.jpg', 30, '2024-09-14 19:32:31'),
(24, 'Bombe aérosol a peinture de couleur rouge vif', 'Spray aérosol de la marque hardcore de couleur rouge vif', 4.2, 'bombe-a-peinture-rouge-vif.jpg', 30, '2024-09-14 19:35:34'),
(26, 'bombe aérosol hardcore de couleur jaune-plage', 'Spray aérosol de la marque hardcore de couleur jaune-plage', 4.2, 'bombe-a-peinture-jaune-plage.jpg', 30, '2024-09-14 19:38:37'),
(28, 'Bombe aérosol a peinture couleur peche', 'Spray a peinture de la marque hardcore de couleur pèche', 4.2, 'bombe-a-peinture-peche.jpg', 30, '2024-09-23 15:56:22'),
(29, 'Bombe aérosol hardcore de couleur jaune-clair', 'Spray aérosol de la marque hardcore de couleur jaune-clair', 4.2, 'bombe-a-peinture-jaune-clair.jpg', 30, '2024-09-24 11:01:25'),
(30, 'Bombe aérosol Hardcore de couleur Gris-Arkalis', 'Spray aérosol de la marque hardcore de couleur gris-arkalis', 4.2, 'bombe-a-peinture-gris-arkalis.jpg', 30, '2024-10-07 11:34:26'),
(32, 'Bombe aérosol a peinture de couleur bleu avatar', 'Spray aérosol de la marque hardcore de couleur bleu avatar', 4.2, 'bombe-a-peinture-bleu-avatar.jpg', 30, '2024-10-18 13:12:08'),
(33, 'bombe aérosol hardcore de couleur rouge madrid', 'spray aérosol de la marque hardcore de couleur rouge-madrid', 4.2, 'bombe-a-peinture-rouge-madrid.jpg', 30, '2024-10-18 13:17:25'),
(34, 'Bombe aérosol a peinture Hardcore Violet', 'Spray aérosol de la marque hardcore de couleur Violet', 4.2, 'bombe-a-peinture-violet.jpg', 30, '2024-10-18 15:04:14'),
(35, 'bombe aérosol hardcore de couleur noir-mat', 'spray aérosol de la marque hardcore de couleur noir-mat', 4.2, 'bombe-a-peinture-noir-mat.jpg', 30, '2024-10-19 16:43:37'),
(37, 'Bombe aérosol Hardcore de couleur blanc-divinite', 'Spray aérosol de la marque hardcore de couleur blanc-divinite', 4.2, 'bombe-a-peinture-blanc-divinite.jpg', 30, '2024-10-20 13:25:10'),
(38, 'Bombe aérosol hardcore de couleur creme', 'Spray aérosol a peinture de la marque hardcore de couleur creme', 4.2, 'bombe-de-peinture-creme.jpg', 30, '2024-10-20 16:49:11'),
(39, 'Bombe aérosol hardcore de couleur abricot', 'Spray aérosol a peinture de la marque hardcore de couleur abricot', 4.2, 'bombe-de-peinture-abricot.jpg', 30, '2024-10-27 11:15:34'),
(40, 'bombe aérosol hardcore de couleur marron-tabac', 'Spray aérosol a peinture de la marque hardcore de couleur marron-tabac', 4.2, 'bombe-de-peinture-marron-tabac.jpg', 30, '2024-10-27 11:38:32'),
(41, 'Bombe a peinture hardcore de couleur orange-pastel', 'Spray aérosol à peinture de la marque hardcore de couleur orange-pastel', 4.2, 'bombe-de-peinture-orange-pastel.jpg', 30, '2024-11-15 19:28:48'),
(42, 'Bombe aérosol hardcore de couleur creme', 'Spray aérosol de couleur creme', 4.2, 'bombe-de-peinture-creme.jpg', 30, '2024-12-17 16:06:05');

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `hardcores_id` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orders_id`, `hardcores_id`, `unit_price`, `quantity`) VALUES
(80, 81, 4, 4.2, 1),
(81, 82, 16, 4.2, 2),
(82, 83, 11, 4.2, 2),
(83, 84, 4, 4.2, 1),
(84, 85, 4, 4.2, 1),
(85, 85, 7, 4.2, 2),
(86, 86, 4, 4.2, 2),
(87, 87, 7, 4.2, 2),
(88, 88, 4, 4.2, 1),
(89, 89, 4, 4.2, 1),
(90, 90, 4, 4.2, 1),
(91, 91, 4, 4.2, 1),
(92, 92, 4, 4.2, 1),
(94, 94, 4, 4.2, 2),
(95, 95, 4, 4.2, 1),
(96, 96, 4, 4.2, 1),
(97, 97, 4, 4.2, 1),
(98, 98, 4, 4.2, 1),
(99, 99, 4, 4.2, 1),
(100, 100, 4, 4.2, 1),
(101, 101, 4, 4.2, 1),
(102, 102, 4, 4.2, 2),
(103, 103, 7, 4.2, 1),
(104, 104, 4, 4.2, 1),
(105, 105, 11, 4.2, 2),
(106, 106, 9, 4.2, 2),
(107, 107, 11, 4.2, 2),
(108, 108, 30, 4.2, 1),
(109, 109, 4, 4.2, 1),
(110, 109, 7, 4.2, 1),
(111, 110, 4, 4.2, 1),
(112, 111, 4, 4.2, 1),
(113, 112, 4, 4.2, 1),
(114, 113, 4, 4.2, 1),
(115, 114, 32, 4.2, 2),
(116, 116, 4, 4.2, 4),
(117, 117, 4, 4.2, 1),
(118, 118, 7, 4.2, 1),
(119, 119, 4, 4.2, 2),
(120, 120, 4, 4.2, 2),
(121, 120, 7, 4.2, 2),
(122, 121, 4, 4.2, 2),
(123, 122, 9, 4.2, 2),
(124, 122, 11, 4.2, 1),
(125, 122, 41, 4.2, 4),
(126, 123, 7, 4.2, 5),
(127, 123, 9, 4.2, 5),
(128, 123, 18, 4.2, 2),
(129, 123, 26, 4.2, 2),
(130, 124, 7, 4.2, 5),
(131, 124, 9, 4.2, 5),
(132, 124, 18, 4.2, 2),
(133, 124, 26, 4.2, 2),
(134, 125, 4, 4.2, 1),
(135, 125, 7, 4.2, 1),
(136, 125, 8, 4.2, 1),
(137, 125, 9, 4.2, 1),
(138, 125, 10, 4.2, 1),
(139, 125, 11, 4.2, 1),
(140, 125, 12, 4.2, 1),
(141, 125, 14, 4.2, 1),
(142, 126, 22, 4.2, 5),
(143, 127, 7, 4.2, 1),
(144, 128, 4, 4.2, 1),
(145, 129, 4, 4.2, 2),
(146, 130, 4, 4.2, 2),
(147, 131, 7, 4.2, 2),
(148, 131, 4, 4.2, 2),
(149, 132, 4, 4.2, 2),
(150, 133, 4, 4.2, 1),
(151, 134, 42, 4.2, 1),
(152, 135, 4, 4.2, 1),
(153, 136, 7, 4.2, 2),
(154, 137, 4, 4.2, 1),
(155, 138, 9, 4.2, 2),
(156, 140, 4, 4.2, 2),
(157, 141, 4, 4.2, 2),
(158, 142, 4, 4.2, 2),
(159, 143, 4, 4.2, 2),
(160, 144, 4, 4.2, 2),
(161, 145, 4, 4.2, 2),
(162, 146, 4, 4.2, 2),
(163, 147, 4, 4.2, 2),
(164, 148, 4, 4.2, 2),
(165, 149, 4, 4.2, 1),
(166, 150, 42, 4.2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `users_id` int(11) DEFAULT NULL,
  `total_amount` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(15) NOT NULL COMMENT 'status possible : payer, en préparation, expédier, terminer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `users_id`, `total_amount`, `created_at`, `status`) VALUES
(81, 41, 4.2, '2024-09-16 18:40:28', 'payed'),
(82, 43, 8.4, '2024-09-16 18:52:44', 'payed'),
(83, 45, 8.4, '2024-09-17 14:59:37', 'payed'),
(84, 45, 4.2, '2024-09-18 12:03:15', 'payed'),
(85, 41, 12.6, '2024-09-25 11:26:35', 'payed'),
(86, 41, 8.4, '2024-09-25 12:48:59', 'payed'),
(87, 41, 8.4, '2024-09-25 22:10:24', 'payed'),
(88, 41, 4.2, '2024-09-26 19:16:54', 'payed'),
(89, 41, 4.2, '2024-09-26 20:52:17', 'payed'),
(90, 41, 4.2, '2024-09-27 10:18:15', 'payed'),
(91, 41, 4.2, '2024-09-27 10:19:20', 'payed'),
(92, 41, 4.2, '2024-09-27 10:21:03', 'payed'),
(94, 41, 8.4, '2024-09-27 13:31:04', 'payed'),
(95, 41, 4.2, '2024-09-27 14:03:50', 'payed'),
(96, 41, 4.2, '2024-09-30 10:55:48', 'payed'),
(97, 41, 4.2, '2024-09-30 10:57:21', 'payed'),
(98, 41, 4.2, '2024-09-30 11:04:13', 'payed'),
(99, 41, 4.2, '2024-09-30 11:04:57', 'payed'),
(100, 41, 4.2, '2024-09-30 11:07:17', 'payed'),
(101, 41, 4.2, '2024-09-30 11:11:02', 'payed'),
(102, 41, 8.4, '2024-09-30 11:58:38', 'payed'),
(103, 41, 4.2, '2024-10-01 13:38:33', 'payed'),
(104, 48, 4.2, '2024-10-04 14:45:09', 'payed'),
(105, 48, 8.4, '2024-10-04 14:46:34', 'payed'),
(106, 43, 8.4, '2024-10-04 17:52:23', 'payed'),
(107, 43, 8.4, '2024-10-04 18:34:38', 'payed'),
(108, 41, 4.2, '2024-10-09 22:06:22', 'payed'),
(109, 41, 8.4, '2024-10-09 22:10:25', 'payed'),
(110, 41, 4.2, '2024-10-09 22:11:35', 'payed'),
(111, 41, 4.2, '2024-10-09 22:11:38', 'payed'),
(112, 41, 4.2, '2024-10-10 15:33:20', 'payed'),
(113, 41, 4.2, '2024-10-16 11:24:04', 'payed'),
(114, 41, 8.4, '2024-10-18 13:12:57', 'payed'),
(115, 41, 0, '2024-10-18 13:18:15', 'payed'),
(116, 41, 16.8, '2024-10-27 11:16:02', 'payed'),
(117, 41, 4.2, '2024-10-27 11:33:47', 'payed'),
(118, 43, 4.2, '2024-10-28 11:43:07', 'payed'),
(119, 41, 8.4, '2024-10-28 13:28:31', 'payed'),
(120, 52, 16.8, '2024-10-28 14:11:07', 'payed'),
(121, 41, 8.4, '2024-11-28 17:18:52', 'payed'),
(122, 53, 29.4, '2024-12-03 11:55:11', 'payed'),
(123, 53, 58.8, '2024-12-03 11:59:02', 'payed'),
(124, 53, 58.8, '2024-12-03 11:59:14', 'payed'),
(125, 53, 33.6, '2024-12-03 12:02:00', 'payed'),
(126, 53, 21, '2024-12-03 12:03:58', 'payed'),
(127, 53, 4.2, '2024-12-03 13:47:04', 'payed'),
(128, 41, 4.2, '2024-12-03 13:50:27', 'payed'),
(129, 41, 8.4, '2024-12-03 14:04:33', 'payed'),
(130, 53, 8.4, '2024-12-17 14:06:33', 'payed'),
(131, 41, 16.8, '2024-12-17 16:03:40', 'payed'),
(132, 41, 8.4, '2024-12-20 17:10:46', 'payed'),
(133, 43, 4.2, '2025-01-02 18:46:41', 'payed'),
(134, 41, 4.2, '2025-01-02 18:55:16', 'payed'),
(135, 43, 4.2, '2025-01-02 18:57:20', 'payed'),
(136, 43, 8.4, '2025-01-02 18:57:54', 'payed'),
(137, 41, 4.2, '2025-01-03 11:42:37', 'payed'),
(138, 54, 8.4, '2025-01-03 11:45:54', 'payed'),
(139, 41, 0, '2025-01-03 16:31:04', 'payed'),
(140, 41, 8.4, '2025-01-03 16:32:00', 'payed'),
(141, 41, 8.4, '2025-01-03 16:32:02', 'payed'),
(142, 41, 8.4, '2025-01-03 16:32:05', 'payed'),
(143, 41, 8.4, '2025-01-03 16:32:43', 'payed'),
(144, 41, 8.4, '2025-01-03 16:32:46', 'payed'),
(145, 41, 8.4, '2025-01-03 16:39:55', 'payed'),
(146, 41, 8.4, '2025-01-03 16:39:56', 'payed'),
(147, 41, 8.4, '2025-01-03 16:39:58', 'payed'),
(148, 41, 8.4, '2025-01-03 16:40:18', 'payed'),
(149, 41, 4.2, '2025-01-03 16:41:25', 'payed'),
(150, 41, 4.2, '2025-01-05 11:40:25', 'payed');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'USER' COMMENT 'Roles possibles: USER/ADMIN',
  `address` varchar(255) NOT NULL,
  `zip` varchar(5) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_connexion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `address`, `zip`, `city`, `phone`, `created_at`, `last_connexion`) VALUES
(41, 'Axel', 'Wouters', 'axel@yahoo.com', '$2a$10$q6w0z4rfEV7ysAbOAZftfuPcvdmlT8B2LxsB.LE2YKm0a8eYdEbuS', 'ADMIN', 'rue des anges', '93370', 'Montfermeil', '0102030405', '2024-09-16 18:38:58', '2025-02-05 18:32:27'),
(43, 'Aicha', 'Fetaissa', 'aicha@yahoo.com', '$2a$10$6ihiM1K4QXNJ/bfLMDX03eEDMmgeBPCcgCDD.zdFdSdwxZ45XlDCK', 'USER', 'rue des anges ', '75000', 'Paris', '0102030405', '2024-09-16 18:51:55', '2025-02-05 18:26:45'),
(44, 'Kait', 'Diaz', 'Diaz@gmail.fr', '$2a$10$gO8wo2V.hTD4yEm8Di7F7eivkRWoqOiUfvhi7SvoY2C8VilvgM6iO', 'USER', 'avenue des héros', '75000', 'Paris', '0102030405', '2024-09-17 14:55:19', '2024-10-04 14:38:43'),
(45, 'Eric', 'Santiago', 'Eric@yahoo.com', '$2a$10$1fR4pnK16LZnGFMLeac.oeySu7LABE2tCI/rfKo.qkhVE.uwxp5e6', 'USER', 'rue des sciences', '75000', 'Paris', '0102030405', '2024-09-17 14:58:36', '2024-09-18 12:58:17'),
(47, 'Naruto', 'Uzumaki', 'naruto@gmail.com', '$2a$10$vFxiq5Niwgg7leeSF7tCCuNn9fC9ie7BXzCdjPZec4NDXHjofVT6.', 'USER', 'rue des ninja', '75000', 'Paris', '0102030405', '2024-09-20 16:11:41', '2024-09-20 23:32:32'),
(48, 'Arnaud', 'Ravions', 'ravion@yahoo.fr', '$2a$10$N2Ttp7daU1eziEL/NoaiGuhJ.PJZ6qcEP9dsB7wq/LwSGqUq9iMfm', 'USER', 'rue des anges', '75000', 'Paris', '0102030405', '2024-10-04 14:09:19', '2024-10-04 14:10:11'),
(49, 'Marcus', 'Fenix', 'fenix@yahoo.com', '$2a$10$hQmnZcNXEX9wcUFmt.Uvyui.fIotBEfINJbeQABUXjpCnTAxGj5Km', 'USER', 'rue des heros', '75000', 'Paris', '0102030405', '2024-10-04 14:51:44', '2024-10-04 14:52:54'),
(51, 'Boruto', 'Uzumaki', 'boruto@yahoo.fr', '$2a$10$wvzr.r6zKmmWrRzPcwCynOMY6qrhW30FtKC.mQD26Emez6ytU/ub6', 'USER', 'rue du hokage', '75000', 'Paris', '0102030405', '2024-10-17 15:42:49', '2024-10-17 15:43:40'),
(52, 'Ema', 'Lion', 'alex@yahoo.com', '$2a$10$.qXqGGzg9XW15wvF6ftoa.TQIbQOQlCX7qOq8TUjMzxsMzjDAfGGy', 'USER', 'rue des safari', '75000', 'Paris', '0102030405', '2024-10-28 14:09:30', '2024-10-28 14:10:09'),
(53, 'Lyro', 'Wouters', 'lyro@gmail.com', '$2a$10$ZFGrJg2Io9QADjSkaNvomuuKiXhc9/F.7ZYa8DhTRIGQoYsGWHcua', 'USER', 'rue des chats', '75000', 'Paris', '0102030405', '2024-12-03 11:51:52', '2024-12-17 14:05:47'),
(54, 'Elodie', 'Mitcheli', 'elodie@yahoo.com', '$2a$10$Q620qgJVDv2AZdOA6kftSe1VOCEYQDrDT1uYaDRA5ZiLGGrbuaccq', 'USER', 'rue des anges', '75000', 'Paris', '0102030405', '2025-01-03 11:44:42', '2025-01-03 17:06:45');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hardcores`
--
ALTER TABLE `hardcores`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_id` (`orders_id`),
  ADD KEY `hardcores_id` (`hardcores_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `hardcores`
--
ALTER TABLE `hardcores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`hardcores_id`) REFERENCES `hardcores` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
