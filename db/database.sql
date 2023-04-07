-- MySQL Script generated by MySQL Workbench
-- Sun Mar 26 19:23:53 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema linktree
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema linktree
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `linktree` DEFAULT CHARACTER SET utf8 ;
USE `linktree` ;

-- -----------------------------------------------------
-- Table `linktree`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `linktree`.`headers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`headers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `headline` TEXT NULL DEFAULT NULL,
  `active` TINYINT NULL DEFAULT '0',
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_header_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_header_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `linktree`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `linktree`.`links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(45) NOT NULL,
  `active` TINYINT NULL DEFAULT '0',
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_links_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_links_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `linktree`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `linktree`.`photo_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`photo_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_photo_user` VARCHAR(200) NULL DEFAULT NULL,
  `photo_url` VARCHAR(255) NULL DEFAULT 'https://res.cloudinary.com/dcyv3nzsg/image/upload/v1677472724/linktree/photo_users/user_sw5krn.jpg',
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_photo_user_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_photo_user_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `linktree`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `linktree`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bio` VARCHAR(80) NULL DEFAULT NULL,
  `profile_title` VARCHAR(45) NULL DEFAULT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_profile_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `linktree`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `linktree`.`security_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `linktree`.`security_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `verify` TINYINT NULL DEFAULT '0',
  `forgot_password` TINYINT NULL DEFAULT '0',
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_verify_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_verify_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `linktree`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb3;

USE `linktree`;

DELIMITER $$
USE `linktree`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `linktree`.`users_AFTER_INSERT_photo_users`
AFTER INSERT ON `linktree`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO photo_users (users_id) VALUES (new.id);
END$$

USE `linktree`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `linktree`.`users_AFTER_INSERT_profile`
AFTER INSERT ON `linktree`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO profile (users_id) VALUES (new.id);
END$$

USE `linktree`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `linktree`.`users_AFTER_INSERT_security_users`
AFTER INSERT ON `linktree`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO security_users (token, users_id) VALUES (UUID(), new.id);
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
