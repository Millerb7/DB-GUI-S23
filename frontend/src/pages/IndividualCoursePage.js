import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "src/api/coursePageApi";
import { getAssignmentsByCourse, getUserAssignments } from "src/api/AssignmentApi";
import { AssignmentList } from "src/components/AssignmentList";
import { Button, LinearProgress } from "@mui/material";
import { UserContext } from "src/layouts";
import { Assignment } from '../sections/Assignment'

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState([]);
    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [missingAssignments, setMissingAssignments] = useState([]);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const userContext = useContext(UserContext);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getCourseById(params.course_id).then(x => setCourse(x));
        getAssignmentsByCourse(params.course_id, userContext.user.user_id, 1).then(x => {
            setCurrentAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date)));
            setAssignmentCount(x.length);
        });
        getAssignmentsByCourse(params.course_id, userContext.user.user_id, 0).then(x => {
            setMissingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date)));
            setAssignmentCount(assignmentCount+x.length);
        });

    }, []);

    const getCompleted = () => {
        let completedCount = 0;

        currentAssignments.forEach((assignment) => {
            if (assignment.completed === true) {
                completedCount++;
        }
          });

        return completedCount / assignmentCount;
    }   

    return<>
        <h1 align="center">Assignments for {course.course_name}</h1>
        <LinearProgress variant="determinate" value={getCompleted} />

        <Button type="button" onClick={()=>{
            navigate('new')
        }}>Add Assignment</Button>



        <h2 align="center">Missing Assignments</h2>
        <AssignmentList assignments={currentAssignments}/>

        <h2 align="center">Current Assignments</h2>
        <AssignmentList assignments={missingAssignments}/>
    </>
}
