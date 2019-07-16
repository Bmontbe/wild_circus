INSERT INTO customer (name, firstname, mail,password) VALUES
('Plurien', 'Béatrice', 'bdemontbeillard@gmail.com', 'test'),
('Dupont', 'Paul', 'pauldupont@gmail.com', 'test');

INSERT INTO shows (name, city, code_postal, date_show, num_places, price_adult, price_child) VALUES
('Lion Tour', 'Nantes', '44000', '2019/07/26', '260', '8', '5'),
('Acrobates Tour', 'Angers', '49000', '2019/07/26', '90', '10', '7');

INSERT INTO comment (id_customer, customer_comment, score) VALUES
('1', 'super spectacle, bravo !', '5'),
('1', 'bien mais un peu loin', '3');

