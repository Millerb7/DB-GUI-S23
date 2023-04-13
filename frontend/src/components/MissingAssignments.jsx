import { Assignment } from '../sections/Assignment';
import { useEffect, useState } from 'react';
import { getAssignmentById } from '../api/coursePageApi';

import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { AssignmentLate } from '@mui/icons-material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


export const MissingAssignments = () => {
    // const [ assignments, setAssignments ] = useState(undefined);

    const assignments = [
        new Assignment(1, 'Review', 1004, 'ML', '', true),
        new Assignment(2, 'Review2', 1005, 'Ethical', '', true),
        new Assignment(3, 'Review3', 1006, 'UI', '', false),
        new Assignment(4, 'Review4', 1007, 'EGNRMGMNT', '', true),
    ]

    // useEffect(() => {
    //     getAllAssignments(userId).then(data => setAssignments(data));
    // }, []);

    return<>
        <h1>Missing Assignments  
            <AssignmentLate fontSize='large' color='error' sx={{mb: -1, ml: 1}}/>
        </h1>
        <br/>
        
        <Grid container spacing={2}> 
            {assignments.map((assignment, id) => 
                assignment.missing ?  
                    <Grid item key={id} width={{xs: '50%'}}>
                        <div style={{display:'flex'}}>
                            <Box sx={{fontWeight: 'bold'}}><AssignmentLate color='error' fontSize='small' sx={{mb:-.5, mr:1}}/>{assignment.assignmentName}</Box>
                            <Box sx={{color: 'text.secondary', ml: 2}} >Course: {assignment.course}</Box> 
                        </div>
                        This assignment was due on: {assignment.dueDate} 
                    </Grid>
                : null     
            )}
        </Grid>
            
     
        
        
    </>
        
}