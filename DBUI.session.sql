CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;

CREATE TABLE IF NOT EXISTS users
(
    user_id    INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    age        INT,
    admin      BOOLEAN      NOT NULL DEFAULT FALSE

INSERT INTO users (first_name, last_name, age,  admin)
VALUES ('james', 'bench', 33, ,33, false),
       ('marley', 'wine', 45, true),
       ('mort', 'lemur', 7, false),
       ('bat', 'man', 20, true);


CREATE TABLE IF NOT EXISTS courses
(
    course_id        INT AUTO_INCREMENT PRIMARY KEY,
    course_name      VARCHAR(255) NOT NULL,
    professor_name   VARCHAR(255),
    year             INT          NOT NULL,
    semester         VARCHAR(255) NOT NULL,
    course_completed BOOLEAN      NOT NULL DEFAULT FALSE,
    student_id       INT,
    FOREIGN KEY (student_id) REFERENCES users (user_id)
);

INSERT INTO courses (course_name, course_id, professor_name, year, semester, course_completed, student_id)
VALUES ('English I', 123, 'Mr.James', 2023, 'Fall', true, 1),
       ('History II', 111, 'Mrs.Teach', 2023, 'Spring', false, 2),
       ('Calculus I', 110, 'Mr.Yuko', 2023, 'Fall', false, 3),
       ('Spanish II', 100, 'Ms.Hiyla', 2023, 'Fall', false, 1);
