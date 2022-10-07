CREATE SCHEMA mysqljs_db;
USE mysqljs_db;
CREATE TABLE `account` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY `user`(`id`)
  );

  INSERT INTO `account`(`email`, `password`, `is_admin`) 
  VALUES('admin@admin.com', 'admin123', 1), 
  ('test@test.com', 'test123', 0);