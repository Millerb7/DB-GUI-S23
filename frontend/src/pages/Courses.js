import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentCoursesByID, getPastCoursesByID } from "src/api/coursePageApi";
import { CourseList } from "src/components/CourseList";
import { UserContext } from "src/layouts/dashboard";


export const Courses = () => {
    const [currentCourses, setCurrentCourses] = useState([]);
    const [pastCourses, setPastCourses] = useState([]);
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentCoursesByID(userContext.user.user_id).then(x => setCurrentCourses(x))
        getPastCoursesByID(userContext.user.user_id).then(x => setPastCourses(x))
    }, []);

    return <>
        <Button type="button" onClick={()=>{
            navigate('new');
        }}> Add Course </Button>
        <h2 align="center">Current Courses</h2>
        <CourseList courses={currentCourses}/>

        <h2 align="center">Past Courses</h2>
        <CourseList courses={pastCourses}/>
    </>;
}