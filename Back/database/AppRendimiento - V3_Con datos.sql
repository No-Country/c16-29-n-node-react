-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: sql10.freemysqlhosting.net
-- Tiempo de generación: 19-02-2024 a las 06:29:48
-- Versión del servidor: 5.5.62-0ubuntu0.14.04.1
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sql10684703`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Attendances`
--

CREATE TABLE `Attendances` (
  `id` int(11) NOT NULL,
  `type` enum('NON_ATTENDANCE','DELAYED') DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subjects_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Attendances`
--

INSERT INTO `Attendances` (`id`, `type`, `date`, `teacher_id`, `student_id`, `subjects_id`) VALUES
(1, 'DELAYED', '2024-02-18 10:15:00', 4, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Banns`
--

CREATE TABLE `Banns` (
  `id` int(11) NOT NULL,
  `score` enum('EXPELLED','SUSPENDED','WARNING') NOT NULL,
  `note` varchar(255) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Banns`
--

INSERT INTO `Banns` (`id`, `score`, `note`, `subject_id`, `student_id`, `teacher_id`) VALUES
(1, 'EXPELLED', 'No trajo el libro de practica', 1, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Marks`
--

CREATE TABLE `Marks` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `subject_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Marks`
--

INSERT INTO `Marks` (`id`, `score`, `note`, `subject_id`, `student_id`, `teacher_id`, `created_at`, `updated_at`) VALUES
(1, 90, 'Examen 1T', 1, 4, 2, '2024-02-18 21:00:00', '2024-02-18 21:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notes`
--

CREATE TABLE `Notes` (
  `id` int(11) NOT NULL,
  `note` varchar(255) NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Notes`
--

INSERT INTO `Notes` (`id`, `note`, `is_public`, `teacher_id`, `student_id`, `subject_id`) VALUES
(1, 'Excelente participacion en clase', 1, 2, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `StudentsTutors`
--

CREATE TABLE `StudentsTutors` (
  `student_id` int(11) DEFAULT NULL,
  `tutor_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `StudentsTutors`
--

INSERT INTO `StudentsTutors` (`student_id`, `tutor_id`, `id`) VALUES
(4, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `StundetSubjects`
--

CREATE TABLE `StundetSubjects` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `StundetSubjects`
--

INSERT INTO `StundetSubjects` (`id`, `subject_id`, `student_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Subjects`
--

CREATE TABLE `Subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `divition` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Subjects`
--

INSERT INTO `Subjects` (`id`, `name`, `grade`, `divition`) VALUES
(1, 'Biologia', '9', 'b1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TeacherSubjects`
--

CREATE TABLE `TeacherSubjects` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `TeacherSubjects`
--

INSERT INTO `TeacherSubjects` (`id`, `subject_id`, `teacher_id`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL COMMENT 'DNI',
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` enum('PRINCIPAL','TEACHER','TUTOR','STUDENT') DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `first_name`, `last_name`, `role`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'isflores', 'comono', 'isaac', 'flores', 'PRINCIPAL', 'prueba@prueba.com', '123456789', '2024-02-19 04:20:55', '2024-02-18 23:36:37'),
(2, 'n2', '1234', 'est1', 'estap', 'TEACHER', 'est1@gmail.com', '00000000', '2024-02-19 00:00:01', '2024-02-19 00:09:01'),
(3, 'n3', '1235', 'tutor1', 'tutop', 'TUTOR', 'tuto1@gmail.com', '00000000', '2024-02-19 00:00:01', '2024-02-19 00:09:01'),
(4, 'n4', '1236', 'profe1', 'profep', 'STUDENT', 'profe1@gmail.com', '00000000', '2024-02-19 00:00:01', '2024-02-19 00:09:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Attendances`
--
ALTER TABLE `Attendances`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Banns`
--
ALTER TABLE `Banns`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Marks`
--
ALTER TABLE `Marks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Notes`
--
ALTER TABLE `Notes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `StudentsTutors`
--
ALTER TABLE `StudentsTutors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indices de la tabla `StundetSubjects`
--
ALTER TABLE `StundetSubjects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Subjects`
--
ALTER TABLE `Subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `TeacherSubjects`
--
ALTER TABLE `TeacherSubjects`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Attendances`
--
ALTER TABLE `Attendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Banns`
--
ALTER TABLE `Banns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Marks`
--
ALTER TABLE `Marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Notes`
--
ALTER TABLE `Notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `StudentsTutors`
--
ALTER TABLE `StudentsTutors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `StundetSubjects`
--
ALTER TABLE `StundetSubjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `Subjects`
--
ALTER TABLE `Subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `TeacherSubjects`
--
ALTER TABLE `TeacherSubjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `StudentsTutors`
--
ALTER TABLE `StudentsTutors`
  ADD CONSTRAINT `StudentsTutors_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `StudentsTutors_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
