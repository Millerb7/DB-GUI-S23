CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;

CREATE TABLE IF NOT EXISTS users
(
    user_id    INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    age        INT,
    admin      BOOLEAN      NOT NULL DEFAULT FALSE

INSERT INTO users (first_name, last_name, age, admin)
VALUES ('james', 'bench', 33, false),
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

CREATE TABLE assignments
(
    assignment_name         VARCHAR(255) NOT NULL,
    assignment_id           INT NOT NULL,
    assignment_due_date     DATE NOT NULL,
    assignment_work_date    DATE,
    course_number              INT,
    FOREIGN KEY (course_number) REFERENCES courses(course_id),
    assignment_description  VARCHAR(1000),
    overdue                 boolean,
    student_number          INT,
    FOREIGN KEY (student_number) REFERENCES users(user_id)
);

INSERT INTO assignments (assignment_name, assignment_id, assignment_due_date, assignment_work_date, course_number, assignment_description, overdue, student_number)
VALUES ('Test Assignment', 234, '2000-03-24', NULL, 123, 'Assignment Description', false, 1)
