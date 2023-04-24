import { Assignment } from '../sections/Assignment';
import { useEffect, useState,useContext } from 'react';
import { getMissingAssignments } from 'src/api/AssignmentApi';
import { Grid, Box, Button } from '@mui/material';
import {  } from '@mui/material';
import { AssignmentLate } from '@mui/icons-material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/layouts/dashboard';


export const MissingAssignments = () => {
    const [ missingAssignments, setMissingAssignments ] = useState([]);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        getMissingAssignments(userContext.user.user_id).then(x => setMissingAssignments(x));
    }, []);

    return<>
        <h1>
            <AssignmentLate fontSize='large' color='error' sx={{mb: -1, ml: 1}}/>
            Missing Assignments
        </h1>
        <br/>
        
        <Grid container spacing={2}> 
            {missingAssignments.map((assignment, id) => 
                assignment ?  
                    <Grid item key={id} width={{xs: '50%'}}>
                        <div style={{display:'flex'}}>
                            <span variant="text" sx={{fontWeight: 'bold', color: 'black'}}><AssignmentLate color='error' fontSize='small' sx={{mb:-.5, mr:1}}/>{assignment.assignment_name}</span>
                            <Box sx={{color: 'text.secondary', ml: 2}} >Course: {assignment.course_name}</Box> 
                        </div>
                        This assignment was due on: {assignment.assignment_due_date} 
                    </Grid>
                : null     
            )}
        </Grid>
            
     
        
        
    </>
        
}