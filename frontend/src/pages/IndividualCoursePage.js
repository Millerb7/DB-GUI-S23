import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCourseById } from "src/api/coursePageApi";
import { getUserAssignments } from "src/api/AssignmentApi";
import { AssignmentList } from "src/components/AssignmentList";
import { Button } from "@mui/material";

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCourseById(course).then(x => setCourse(x));
        // getUserAssignments(userid).then(x => setAssignments(x))
    }, []);

    return<>
        <Button type="button" onClick={()=>{
        }}>Add Assignment</Button>

        <h2 align="center">Missing Assignments</h2>
        <AssignmentList assignments={[]}/>

        <h2 align="center">Current Assignments</h2>
        <AssignmentList assignments={[]}/>
    </>
}
