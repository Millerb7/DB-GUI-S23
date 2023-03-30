CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;
CREATE TABLE IF NOT EXISTS users(
    user_id     INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    age         INT,
    admin       BOOLEAN NOT NULL DEFAULT FALSE,
    courses     INT,
    totalAssigns INT,
    completedAssigns INT
);
