import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textfield } from "../components/Textfield";
import { CheckboxField } from "../components/CheckboxField";
import { addCourse, editCourse, getCourseById } from "src/api/coursePageApi";
import { Button } from "@mui/material";

export const CourseEditor = () => {
    const [ course, setCourse ] = useState(undefined);

    const navigate = useNavigate();
    const params = useParams();

    const mergeAccount = delta => setCourse({ ...course, ...delta });

    const handleSave = () => {
        if (params.id) {
            editCourse(course.id, course);
        } else {
            addCourse(course);
        }
    };

    useEffect(() => {
        if (params.course_id) {
            getCourseById(params.course_id).then(x => setCourse(x));
        } else {
            setCourse({ course_id: '', course_name: '', semester: '', year: '', course_completed: false });
        }
    }, [params.course_id]);

    if (!course) {
        return <>Loading...</>;
    }

    return <>
        <div>
            <h1>Course Editor</h1>
            <Textfield  id="student_id"
                        label="Student ID"
                        value={course.student_id}
                        setValue={value => mergeAccount({ student_id: value })}
                        />
            <Textfield  id="course_name" 
                        label="Course Name"
                        value={course.course_name}
                        setValue={value => mergeAccount({ course_name: value })} />
            <Textfield  id="professor_name"
                        label="Professor Name"
                        value={course.professor_name}
                        setValue={value => mergeAccount({ professor_name: value })} />
            <Textfield  id="semester"
                        label="Semester"
                        value={course.semester}
                        setValue={value => mergeAccount({ semester: value })} />
            <Textfield  id="year"
                        label="Year"
                        value={course.year}
                        setValue={value => mergeAccount({ year: value })} />
            <CheckboxField  id="course_completed"
                            label="Completed"
                            checked={course.course_completed}
                            setChecked={value => mergeAccount({ course_completed: value })} />

            <Button type="button"
                className="btn btn-primary btn-lg col-12 mt-4"
                onClick={() => {
                    handleSave();
                    navigate('/dashboard/courses');
                 }}
            >Submit</Button>

        </div>
    </>;
}