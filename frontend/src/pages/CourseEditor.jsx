import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textfield } from "../components/Textfield";
import { CheckboxField } from "../components/CheckboxField";
import { addCourse, editCourse, getCourseById } from "src/api/coursePageApi";
import { Button, FormGroup, Grid } from "@mui/material";

export const CourseEditor = () => {
    const [course, setCourse] = useState(undefined);

    const navigate = useNavigate();
    const params = useParams();

    const mergeAccount = delta => setCourse({ ...course, ...delta });

    const handleSave = () => {
        if (params.course_id) {
            editCourse(params.course_id, course).then(() => navigate('/dashboard/courses'));
        } else {
            addCourse(course).then(() => navigate('/dashboard/courses'));
        }
    };

    useEffect(() => {
        if (params.course_id) {
            getCourseById(params.course_id).then(x => {
                //parse the x array to get the course object
                setCourse(x[0]);
                //debugging
                alert(JSON.stringify(x) + " " + params.course_id);
                //setCourse(x);

            });
        } else {
            setCourse({ course_id: '', course_name: '', semester: '', year: '', course_completed: false });
        }
    }, []);

    if (!course) {
        return <>Loading...</>;
    }

    return <>
        <div>
            <h1 style={{ marginLeft: "2rem" }}>Course Editor</h1>
            <FormGroup sx={{ mt: 2, mx: 4 }}>
                <Textfield id="student_id"
                    label="Student ID"
                    value={course.student_id}
                    setValue={student_id => mergeAccount({ student_id })}/>
                <Textfield id="course_name"
                    label="Course Name"
                    value={course.course_name}
                    setValue={course_name => mergeAccount({ course_name })} />
                <Textfield id="professor_name"
                    label="Professor Name"
                    value={course.professor_name}
                    setValue={professor_name => mergeAccount({ professor_name })} />
                <Textfield id="semester"
                    label="Semester"
                    value={course.semester}
                    setValue={semester => mergeAccount({ semester })} />
                <Textfield id="year"
                    label="Year"
                    value={course.year}
                    setValue={year => mergeAccount({ year })} />
                <CheckboxField id="course_completed"
                    label="Completed"
                    checked={course.course_completed}
                    setChecked={course_completed => mergeAccount({ course_completed })} />
                <Button type="button"
                    onClick={() => { handleSave();}}>
                    Submit
                </Button>
                <Button type="button" color="error"
                    className="btn btn-primary btn-lg col-12 mt-4"
                    onClick={() => { navigate('/dashboard/courses');}}>
                    Cancel
                </Button>
            </FormGroup>
        </div>
    </>;
}