export class Course {
    constructor(course_id, course_name, semester, year, completed, professor_name, student_id){
        this.course_id = course_id;
        this.course_name = course_name;
        this.semester = semester;
        this.year = year
        this.completed = completed;
        this.professor_name = professor_name;
        this.student_id = student_id;
    }
}