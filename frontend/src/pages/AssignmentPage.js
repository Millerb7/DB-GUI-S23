import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Typography, Grid } from '@mui/material';

import { getAssignmentById } from "src/api/AssignmentApi";
import { UserContext } from "src/layouts/dashboard";

export const AssignmentPage = () => {
    console.log("here");
    const [ assignment, setAssignment ] = useState([]);
    
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getAssignmentById(params.assignment_id).then(x => setAssignment(x))
    }, []);

    function formatDate (dateStr) {
        const newdate = new Date (dateStr);
        const options = { weekday: 'long', month: 'long', day: 'numeric'};
        return newdate.toLocaleDateString('en-US', options);
    };

    console.log(assignment);

    return <>
    <Grid container width='inherit' alignContent='center' sx={{border: 'solid', margin: 5}} display='flex'>
        
            {assignment.map((a) => 
                <Grid item key={a.course_id} style={{width:'100%', textAlign: 'center'}} sx={{m:2}} width='50%'>
                    <Typography variant="h1">{a.assignment_name}</Typography>
                    <Typography>Assignment Page</Typography> 
                    <Typography variant="h5">Due Date: {formatDate(a.assignment_due_date)}</Typography>
                    <br/>
                    <div style={{marginBottom: '2%'}}>
                        <Typography variant="h6">
                            Course: <br/>
                        </Typography>
                        <Button type="button" variant="outlined" size="large"
                            onClick={() => {
                                console.log(a.course_id)
                                navigate(`/dashboard/courses/${a.course_id}`);
                            }}>
                            {a.course_name} 
                        </Button>
                    </div>
                    
                        
                    <Typography variant="h6" gutterBottom>Assignment Description:</Typography>
                    <p>{a.assignment_description}</p>
                </Grid>
            )}
        
    </Grid>
        
    
</>;
}