CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;
CREATE TABLE IF NOT EXISTS users(
    user_id     INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    age         INT,
    admin       BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (first_name, last_name, age, admin) 
VALUES 
('james', 'bench', 33, false),
('marley', 'wine', 45, true),
('mort', 'lemur', 7, false),
('bat', 'man', 20, true);
