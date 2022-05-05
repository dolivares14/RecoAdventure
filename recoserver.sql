-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2021 a las 02:27:56
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recoserver`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elem` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `difficulty` varchar(10) DEFAULT 'Easy',
  `category` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elem`, `name`, `difficulty`, `category`) VALUES
(1, 'Computadora', 'Normal', 'Tecnologia'),
(2, 'Telefono', 'Easy', 'Tecnologia'),
(3, 'Aire Acondicionado', 'Normal', 'Tecnologia'),
(4, 'Router', 'hard', 'Tecnologia'),
(5, 'Monitor', 'normal', 'Tecnologia'),
(7, 'Audifonos', 'Easy', 'Tecnologia'),
(8, 'Mesa', 'Easy', 'Muebles'),
(9, 'Cocina', 'Easy', 'Muebles'),
(10, 'Papel de baño', 'Easy', 'Limpieza'),
(11, 'Lapiz', 'Easy', 'Utensilios'),
(12, 'Corta Uña', 'normal', 'Herramientas'),
(13, 'Boligrafo', 'normal', 'Utensilios'),
(14, 'Silla', 'Easy', 'Muebles'),
(15, 'teclado', 'normal', 'Tecnologia'),
(16, 'Ducha', 'normal', 'Limpieza'),
(17, 'Bombillo', 'hard', 'Tecnologia'),
(18, 'Ventilador', 'normal', 'Tecnologia'),
(19, 'Bicicleta', 'hard', 'Transporte'),
(20, 'Sofa', 'VeryHard', 'Muebles'),
(21, 'Rosario', 'hard', 'Herramientas'),
(22, 'Wii', 'VeryHard', 'Tecnologia'),
(23, 'PlayStation', 'hard', 'Tecnologia'),
(24, 'Juego de Mesa', 'hard', 'Juguetes'),
(25, 'Closet', 'hard', 'Muebles'),
(26, 'AutoMovil', 'normal', 'Transporte'),
(28, 'Vaso', 'easy', 'Utensilios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id_player` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `playerhash` varchar(200) NOT NULL,
  `playercountsolo` int(10) UNSIGNED DEFAULT 0,
  `playercountmulti` int(10) UNSIGNED DEFAULT 0,
  `highscoresolo` double UNSIGNED DEFAULT 0,
  `highscorenormal` double UNSIGNED DEFAULT 0,
  `highscoreeasy` double NOT NULL DEFAULT 0,
  `highscorehard` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id_player`, `username`, `playerhash`, `playercountsolo`, `playercountmulti`, `highscoresolo`, `highscorenormal`, `highscoreeasy`, `highscorehard`) VALUES
(1, 'prueba', 'hashprueba', 0, 0, 0, 0, 0, 0),
(2, 'prueba2', 'pruebahash2', 0, 0, 0, 0, 0, 0),
(8, 'dan2020', 'ca43e95e3bb0005cada39b25eb949059869175f2', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `id_elems` int(11) DEFAULT NULL,
  `name_tag` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`id_tag`, `id_elems`, `name_tag`) VALUES
(7, 7, 'Headphones'),
(8, 7, 'Headset'),
(9, 3, 'Air Conditioner'),
(10, 26, 'Car'),
(11, 26, 'Vehicle'),
(12, 26, 'Automobile'),
(13, 26, 'Sports Car'),
(14, 19, 'Bicycle'),
(15, 19, 'Bike'),
(16, 19, 'Mountain Bike'),
(17, 13, 'Pen'),
(18, 13, 'Fountain Pen'),
(19, 17, 'Light'),
(20, 17, 'Lightbulb'),
(21, 25, 'Walk-In Closet'),
(22, 25, 'Closet'),
(23, 25, 'Wardrobe'),
(24, 25, 'Dressing Room'),
(25, 9, 'Kitchen'),
(26, 1, 'Pc'),
(27, 1, 'Computer'),
(28, 1, 'Computer Hardware'),
(29, 1, 'Desktop'),
(30, 12, 'Razor'),
(31, 12, 'Sink Faucet'),
(32, 12, 'Scissors'),
(33, 16, 'Shower'),
(34, 16, 'Shower Faucet'),
(35, 24, 'Chess'),
(36, 24, 'Game'),
(37, 11, 'Pencil'),
(38, 8, 'Table'),
(39, 8, 'Coffee Table'),
(40, 8, 'Desk'),
(41, 8, 'Tabletop'),
(42, 5, 'LCD Screen'),
(43, 5, 'Monitor'),
(44, 5, 'Screen'),
(45, 5, 'Display'),
(46, 10, 'Paper'),
(47, 10, 'Towel'),
(48, 10, 'Paper Towel'),
(49, 10, 'Tissue'),
(50, 10, 'Toilet Paper'),
(51, 23, 'Electronics'),
(52, 21, 'Bead'),
(53, 21, 'Bead Necklace'),
(54, 21, 'Necklace'),
(55, 21, 'Prayer Beads'),
(56, 21, 'Rosary'),
(57, 4, 'Router'),
(58, 4, 'Modem'),
(59, 14, 'Chair'),
(60, 20, 'Couch'),
(61, 20, 'Cushion'),
(62, 15, 'Computer Keyboard'),
(63, 15, 'Keyboard'),
(64, 2, 'Phone'),
(65, 2, 'Mobile Phone'),
(66, 2, 'Cell Phone'),
(67, 28, 'Glass'),
(68, 18, 'Electric Fan'),
(69, 22, 'Electronics');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elem`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id_player`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `playerhash` (`playerhash`);

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elem` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id_player` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
