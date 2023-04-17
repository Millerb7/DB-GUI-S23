import { useState, useEffect } from "react";
import { getCurrentCourses, getPastCourses } from "src/api/coursePageApi";
import { CourseList } from "src/components/CourseList";

export const Courses = () => {
    const [currentCourses, setCurrentCourses] = useState([]);
    const [pastCourses, setPastCourses] = useState([]);

    useEffect(() => {
        getCurrentCourses().then(x => setCurrentCourses(x))
        getPastCourses().then(x => setPastCourses(x))
    }, []);

    return <>
        <h2 align="center">Current Courses</h2>
        <CourseList courses={currentCourses}/>

        <h2 align="center">Past Courses</h2>
        <CourseList courses={pastCourses}/>
    </>;
}