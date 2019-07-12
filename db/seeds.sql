-- USE initiative_db;

-- DROP TABLE IF EXISTS Users;
-- CREATE TABLE Users (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `email` VARCHAR (50)
-- , `password` VARCHAR (50)
-- , `admin` BOOLEAN
-- , PRIMARY KEY(`id`)
-- );

-- DROP TABLE IF EXISTS Games;
-- CREATE TABLE Games (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `name` VARCHAR (250)
-- , PRIMARY KEY(`id`)
-- );

-- DROP TABLE IF EXISTS Characters;
-- CREATE TABLE Characters (
--   `id` INT AUTO_INCREMENT NOT NULL
-- , `name` VARCHAR (250)
-- , `initiative` INT
-- , `armorClass` INT
-- , `hitPoints` INT
-- , `image` VARCHAR (250)
-- , PRIMARY KEY(`id`)
-- );

-- =======================================================================

USE initiative_db;

INSERT INTO Users (`email`, `password`, `admin`, createdAt, updatedAt)
VALUES
('jon@gmail.com', 'password', 1, CURDATE(), CURDATE());

INSERT INTO Games (`name`, createdAt, updatedAt, UserId)
VALUES
('My First D&D Game', CURDATE(), CURDATE(), 1);

INSERT INTO Characters (`name`, `initiative`, `armorClass`, `hitPoints`, `image`, createdAt, updatedAt, GameId)
VALUES
('Ront', 12, 17, 68, './images/orc.png', CURDATE(), CURDATE(), 1);
