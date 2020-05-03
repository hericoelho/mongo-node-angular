-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Tempo de geração: 03/05/2020 às 02:46
-- Versão do servidor: 8.0.20
-- Versão do PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mysql_node_angular`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Patients`
--

CREATE TABLE `Patients` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `sex` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Procedures`
--

CREATE TABLE `Procedures` (
  `id` int NOT NULL,
  `cod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Despejando dados para a tabela `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20200502234941-create-users.js'),
('20200503000807-create-procedures.js'),
('20200503000844-create-patients.js'),
('20200503001732-create-solicitations.js'),
('20200503002312-create-technical-advices.js');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Solicitations`
--

CREATE TABLE `Solicitations` (
  `id` int NOT NULL,
  `result` tinyint(1) NOT NULL DEFAULT '0',
  `patientId` int NOT NULL,
  `procedureId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Technical_advices`
--

CREATE TABLE `Technical_advices` (
  `id` int NOT NULL,
  `agent` varchar(255) NOT NULL,
  `allowed` tinyint(1) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `solicitaionId` int NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birth_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `Users`
--

INSERT INTO `Users` (`id`, `name`, `cpf`, `email`, `password`, `birth_date`, `createdAt`, `updatedAt`) VALUES
(2, 'Herivelton Coelho', '06269398959', 'hericoelho@gmail.com', 'Teste@123', NULL, '2020-05-03 02:24:04', '2020-05-03 02:24:04');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `Patients`
--
ALTER TABLE `Patients`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `Procedures`
--
ALTER TABLE `Procedures`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices de tabela `Solicitations`
--
ALTER TABLE `Solicitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patientId` (`patientId`),
  ADD KEY `procedureId` (`procedureId`);

--
-- Índices de tabela `Technical_advices`
--
ALTER TABLE `Technical_advices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitaionId` (`solicitaionId`);

--
-- Índices de tabela `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `Patients`
--
ALTER TABLE `Patients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Procedures`
--
ALTER TABLE `Procedures`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Solicitations`
--
ALTER TABLE `Solicitations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Technical_advices`
--
ALTER TABLE `Technical_advices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `Solicitations`
--
ALTER TABLE `Solicitations`
  ADD CONSTRAINT `Solicitations_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `Patients` (`id`),
  ADD CONSTRAINT `Solicitations_ibfk_2` FOREIGN KEY (`procedureId`) REFERENCES `Procedures` (`id`);

--
-- Restrições para tabelas `Technical_advices`
--
ALTER TABLE `Technical_advices`
  ADD CONSTRAINT `Technical_advices_ibfk_1` FOREIGN KEY (`solicitaionId`) REFERENCES `Solicitations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
