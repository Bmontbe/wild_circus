CREATE TABLE `customer` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `firstname` varchar(255),
  `mail` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `orders` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_customer` INT NOT NULL,
  `id_show` INT NOT NULL,
  `adult_place` INT,
  `child_place` INT,
  FOREIGN KEY (`id_show`) REFERENCES `shows`(`id`),
  FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id`)
);

CREATE TABLE `orderswithoutidcustomer` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_show` INT NOT NULL,
  `adult_place` INT,
  `child_place` INT,
  FOREIGN KEY (`id_show`) REFERENCES `shows`(`id`)
);

CREATE TABLE `shows` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `city` varchar(255),
  `date_show` DATE,
  `num_places` INT,
  `price_adult` INT,
  `price_child` INT
);

CREATE TABLE `comment` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_customer` INT NOT NULL,
  `customer_comment` TEXT,
  `score` INT,
  FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id`)
);

CREATE TABLE `commentwithoutidcustomer` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) NOT NULL,
  `customer_comment` TEXT,
  `score` INT
);

ALTER TABLE `show`
ADD code_postal VARCHAR(5)
-- ALTER TABLE `event` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `orders` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;