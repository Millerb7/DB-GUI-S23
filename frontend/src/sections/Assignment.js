
export class Assignment {
    constructor(id, assignmentName, dueDate, course, description, overDue){
        this.id = id;
        this.assignmentName = assignmentName;
        this.dueDate = dueDate;
        this.course = course;
        this.description = description;
        this.overDue = false;
    }
} 