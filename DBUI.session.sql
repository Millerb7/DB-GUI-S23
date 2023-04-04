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

CREATE TABLE IF NOT EXISTS courses(
    course_id     INT AUTO_INCREMENT PRIMARY KEY,
    course_name  VARCHAR(255) NOT NULL,
);

INSERT INTO courses (course_name, course_id)
VALUES
('English I', 123),
('History II', 111),
('Calculus I', 110),
('Spanish II', 100);
