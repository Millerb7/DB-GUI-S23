import { Assignment } from '../sections/Assignment';
import { useEffect, useState,useContext } from 'react';
import { getMissingAssignments } from 'src/api/AssignmentApi';
import { Grid, Box, Paper, Typography, Button } from '@mui/material';
import {  } from '@mui/material';
import { AssignmentLate } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/layouts';


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
            <h1 style={{padding: '1rem'}}>
                <AssignmentLate fontSize='large' color='error' sx={{mb: -1, ml: 1}}/>
                Missing Assignments
            </h1>
        </Grid>
        <br/>
        
        
        <Grid container px={3} maxWidth='100vw'>  
            {missingAssignments.map((assignment, id) => 
                assignment ?  
                    <Grid item key={id} sx={{p: '1rem'}}>
                        <div style={{display:'flex'}} >
                            <Typography variant="text" style={{fontWeight: 'bold'}} display='flex' align='center'>
                                <AssignmentLate color='error' fontSize='small' sx={{mb:-.5, mr:1}}/>
                                <Button sx={{color: 'black', p: 0}}
                                    onClick={() => {
                                        navigate(`assignments/${assignment.assignment_id}`)
                                    }}>
                                    {assignment.assignment_name}
                                </Button>
                            </Typography>
                            <Box sx={{color: 'text.secondary', ml: 2}} >{assignment.course_name}</Box> 
                        </div>
                        Due {formatDate(assignment.assignment_due_date)} 
                    </Grid>
                : null     
            )}
        </Grid>
     
        
        
    </>
        
}