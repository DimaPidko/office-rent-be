

CREATE TABLE `allOffices` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(40) NOT NULL,
`count` int NOT NULL,
`timeFrom` varchar(5) NOT NULL,
`timeTo` varchar(5) NOT NULL,
`baseRentPrice` int NOT NULL,
`discount` varchar(10) NOT NULL DEFAULT 'standart',
`services` text NOT NULL,
`isReserv` tinyint(1) NOT NULL DEFAULT '0',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci