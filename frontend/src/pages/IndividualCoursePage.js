import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { getCourseById } from "src/api/coursePageApi";
import { getUserAssignments } from "src/api/AssignmentApi";
import { AssignmentList } from "src/components/AssignmentList";
import { Button } from "@mui/material";
import { UserContext } from "src/layouts/dashboard";
import { Assignment } from '../sections/Assignment'

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCourseById(course).then(x => setCourse(x));
        // getUserAssignments(userid).then(x => setAssignments(x))
    }, []);

    const testAssignments = [
        new Assignment(1, 'Review', 1004, 'ML', 'Study 1 hour every night', true),
        new Assignment(2, 'Review2', 1005, 'Ethical', 'Read chapters 2 and 3', true),
        new Assignment(3, 'Review3', 1006, 'UI', 'Code assignment', false),
        new Assignment(4, 'Review4', 1007, 'EGNRMGMNT', 'Manage Engineers', true),
    ];

    return<>
        <h1 align="center">Assignments for ----</h1>
        
        <Button type="button" onClick={()=>{
        }}>Add Assignment</Button>

        <h2 align="center">Missing Assignments</h2>
        <AssignmentList assignments={testAssignments}/>

        <h2 align="center">Current Assignments</h2>
        <AssignmentList assignments={[]}/>
    </>
}
