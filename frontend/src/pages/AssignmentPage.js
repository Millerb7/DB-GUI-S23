import { useState, useEffect, useNavigate, useParams } from "react";
import { getAssignmentById } from "src/api/AssignmentApi";


export const AssignmentPage = () => {
    const [ assignment, setAssignment ] = useState(null);
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        getAssignmentById(params.asignment_id).then(x => setAssignment(x))
    }, []);

    return <>
        <Paper elevation={10}>
            <Card key={index} sx={{mb:2}}>
                <CardContent display='flex'>
                    <Box fontWeight='bold'>{assignment.assignment_name}
                        <span style={{color: 'GrayText', float: 'right', marginRight: 2}} > 
                            Due Date: {formatDate(assignment.assignment_due_date)}
                        </span>
                    </Box>
                        <span> {assignment.course_name}</span>
                        <br/>
                        <p  style={{color: 'GrayText', padding: 2}}>{assignment.assignment_description}</p>
                </CardContent>
            </Card>
        </Paper>
    </>;
}