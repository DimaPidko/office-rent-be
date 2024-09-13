-- --------------------------------------------------------

CREATE TABLE `Office` (
  `Id` int NOT NULL,
  `Name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Count` int NOT NULL,
  `Price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Office` (`Id`, `Name`, `Count`, `Price`) VALUES
(1, 'Office A', 50, 2000),
(2, 'Office B', 100, 3500),
(3, 'Office B', 30, 1500);

-- --------------------------------------------------------

CREATE TABLE `OfficeOrder` (
  `Id` int NOT NULL,
  `TimeFrom` varchar(5) NOT NULL,
  `TimeTo` varchar(5) NOT NULL,
  `Date` date NOT NULL,
  `OfficeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `OfficeOrder` (`Id`, `TimeFrom`, `TimeTo`, `Date`, `OfficeId`) VALUES
(1, '12:00', '15:00', '2024-09-13', 1),
(2, '09:00', '12:00', '2024-09-16', 2),
(3, '18:00', '21:00', '2024-09-20', 3);

-- ------------------------------------------------------

CREATE TABLE `OrderService` (
  `Id` int NOT NULL,
  `OrderId` int NOT NULL,
  `ServiceId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `OrderService` (`Id`, `OrderId`, `ServiceId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 1),
(5, 3, 3),
(6, 3, 3);

-- -------------------------------------------------------

CREATE TABLE `Service` (
  `Id` int NOT NULL,
  `Name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Service` (`Id`, `Name`, `Price`) VALUES
(1, 'wifi', 300),
(2, 'projector', 500),
(3, 'music', 700);

ALTER TABLE `Office`
  ADD PRIMARY KEY (`Id`) USING BTREE;

ALTER TABLE `OfficeOrder`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `OfficeId` (`OfficeId`);

ALTER TABLE `OrderService`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ServiceId` (`ServiceId`);

ALTER TABLE `Service`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `Office`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `OfficeOrder`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `OrderService`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `Service`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `OfficeOrder`
  ADD CONSTRAINT `officeorder_ibfk_1` FOREIGN KEY (`OfficeId`) REFERENCES `Office` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `OrderService`
  ADD CONSTRAINT `orderservice_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `Office` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orderservice_ibfk_2` FOREIGN KEY (`ServiceId`) REFERENCES `Service` (`Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;
