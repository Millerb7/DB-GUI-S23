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

INSERT INTO users (first_name, last_name, age, admin) 
VALUES 
('james', 'bench', 33, false),
('marley', 'wine', 45, true),
('mort', 'lemur', 7, false),
('bat', 'man', 20, true);

CREATE TABLE IF NOT EXISTS courses(
    course_id     INT AUTO_INCREMENT PRIMARY KEY,
    course_name   VARCHAR(255) NOT NULL,
    year          INT NOT NULL,
    semester      VARCHAR(255) NOT NULL,
    course_completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO courses (course_name, course_id, year, semester, course_completed)
VALUES
('English I', 123, 2023, 'Fall', true),
('History II', 111, 2023, 'Spring', false),
('Calculus I', 110, 2023, 'Fall', false),
('Spanish II', 100, 2023, 'Fall', false);
