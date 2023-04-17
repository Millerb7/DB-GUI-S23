import { useState, useEffect } from "react";
import { getCurrentCourses, getPastCourses } from "src/api/coursePageApi";

export const Courses = () => {
    const [currentCourses, setCurrentCourses] = useState([]);
    const [pastCourses, setPastCourses] = useState([]);

    useEffect(() => {
        getCurrentCourses().then(x=>setCurrentCourses(x))
        getPastCourses().then(x=>setPastCourses(x))
    }, []);

    return <>
        {/*I'll make these components at some point*/}
        <div>
            <h2 >Current Courses</h2>
            {/*Populate with li values*/}
            <ul>
            {
                currentCourses.map( (course) => <li className="courses-list" key={course.course_id}> {course.course_name} </li>)
            }
            </ul>
        </div>
        <div>
            <h2 className="course-container-title">Past Courses</h2>
            {/*Populate with li values*/}
            <ul className="courses-list">
            {
                pastCourses.map( (course) => <li className="courses-list" key={course.course_id}> {course.course_name} </li>)
            }
            </ul>
        </div>
    </>;
}