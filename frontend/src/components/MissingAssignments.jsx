import { Assignment } from '../sections/Assignment';
import { useEffect, useState,useContext } from 'react';
import { getMissingAssignments } from 'src/api/AssignmentApi';
import { Grid, Box, Paper, Typography } from '@mui/material';
import {  } from '@mui/material';
import { AssignmentLate } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/layouts/dashboard';


export const MissingAssignments = () => {
    const [ missingAssignments, setMissingAssignments ] = useState([]);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        getMissingAssignments(userContext.user.user_id).then(x => setMissingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
    }, []);

    function formatDate (dateStr) {
        const newdate = new Date (dateStr);
        const options = { weekday: 'long', month: 'long', day: 'numeric'};
        return newdate.toLocaleDateString('en-US', options);
    }

    return<>
        <Grid paddingTop={2}>
            <h1 style={{textAlign: 'center'}}>
                <AssignmentLate fontSize='large' color='error' sx={{mb: -1, ml: 1}}/>
                Missing Assignments
            </h1>
        </Grid>
        <br/>
        
        
        <Grid container px={3} py={2} minWidth='86vw'>  
            {missingAssignments.map((assignment, id) => 
                assignment ?  
                    <Grid item key={id} width={{xs: '33.3%'}}>
                        <div style={{display:'flex'}} >
                            <Typography variant="text" style={{fontWeight: 'bold'}} display='flex' align='center'>
                                <AssignmentLate color='error' fontSize='small' sx={{mb:-.5, mr:1}}/>
                                {assignment.assignment_name}
                            </Typography>
                            <Box sx={{color: 'text.secondary', ml: 2}} >Course: {assignment.course_name}</Box> 
                        </div>
                        This assignment was due on: {formatDate(assignment.assignment_due_date)} 
                    </Grid>
                : null     
            )}
        </Grid>
     
        
        
    </>
        
}