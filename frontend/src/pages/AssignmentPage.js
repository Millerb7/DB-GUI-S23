import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Card, CardContent, Paper } from '@mui/material';

import { getAssignmentById } from "src/api/AssignmentApi";

export const AssignmentPage = () => {
    const [ assignment, setAssignment ] = useState();
    const params = useParams();
    

    useEffect(() => {
        getAssignmentById(params.assignment_id).then(x => setAssignment(x));
        console.log(params);
    }, []);

    function formatDate (dateStr) {
        const newdate = new Date (dateStr);
        const options = { weekday: 'long', month: 'long', day: 'numeric'};
        return newdate.toLocaleDateString('en-US', options);
    }

    return <>
        <Paper elevation={10}>
            <Card sx={{mb:2}}>
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