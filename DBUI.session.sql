DROP DATABASE IF EXISTS DBUI;
CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;

CREATE TABLE IF NOT EXISTS users
(
    user_id    INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password)
VALUES ('james', 'bench', 'james@gmail.com', '1234'),
       ('marley', 'wine', 'marley@email.com', '456'),
       ('mort', 'lemur', 'mort@lemur.com', 'moveit'),
       ('bat', 'man', 'brucew@batmail.com','scout4ever');

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

INSERT INTO courses (course_name, professor_name, year, semester, course_completed, student_id)
VALUES ('Mathematical Biology', 'Mr. James', 2023, 'Fall', false, 1),
       ('History II', 'Mrs. Teach', 2023, 'Spring', false, 1),
       ('Calculus I', 'Mr. Yuko', 2022, 'Fall', true, 1),
       ('Spanish II', 'Ms. Hiyla', 2023, 'Fall', false, 1),
       ('English III', 'Ms. Miyagi', 2022, 'Spring', true, 1),
       ('Algebra II', 'Mr. Romeo', 2021, 'Fall', true, 1),
       ('History I', 'Ms .Hitory', 2020, 'Spring', true, 1),
       ('Differential Equations', 'Ms .Maf', 2023, 'Spring', false, 1),
       ('Spanish I', 'Ms. Hiyla', 2022, 'Fall', true, 1),
       ('Graphical User Interface', 'Sir Lawrimore', 2023, 'Spring', false, 1),
       ('Algorithms', 'Mr. Lin', 2023, 'Spring', false, 1);


-- DROP TABLE assignments;

CREATE TABLE IF NOT EXISTS assignments
(
    assignment_id           INT AUTO_INCREMENT PRIMARY KEY,
    assignment_name         VARCHAR(255) NOT NULL,
    assignment_due_date     DATE NOT NULL,
    assignment_work_date    DATE,
    course_id               INT,
    assignment_description  VARCHAR(1000),
    overdue                 boolean,
    student_number          INT,
    FOREIGN KEY (student_number) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO assignments (assignment_name, assignment_due_date, assignment_work_date, course_id, assignment_description, overdue, student_number)
VALUES ('Homework 3', '2023-04-27', '2000-03-28', 10, 'Assignment Description', false, 1),
       ('Unit Circle', '2023-04-26', '2022-03-20', 8, 'Draw the unit circle!', false, 1),
       ('Lab 4', '2023-04-01', '2000-03-28', 4, 'Assignment Description', true, 1),
        ('Program 5', '2023-04-30', '2000-03-28', 11, 'Write a recursive program to find fibonacci numbers', true, 1),
        ('American Revolution Essay', '2023-05-01', '2000-03-28', 2, 'Assignment Description', false, 1),
        ('Quiz 6', '2023-04-08', '2000-03-28', 11, 'Assignment Description', true, 1),
        ('Talk Abroad', '2023-04-29', '2000-03-28', 4, 'Pick an article about epidemiology and write a review', false, 1),
        ('Assignment 10', '2023-05-03', '2000-03-28', 1, 'Assignment Description', true, 1);


