import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCourses } from "src/api/coursePageApi";
import { Course } from "src/sections/Course";
import { Assignment } from '../sections/Assignment'
import { getUser } from '../api/user';
import { CardHeader, Grid } from '@mui/material';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { MissingAssignments } from "src/components/MissingAssignments";
import { UserContext } from "src/layouts/dashboard";
import {useContext} from 'react';

export const Home = () =>{
    // const [ user, setUser ] = useState(undefined); const [ missingAssignments, setMissingAssignments ] = useState([])

    // useEffect(() => {
    //     getUser(userId).then(data => setUser(data));
    // }, []);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [ missingAssignments, setMissingAssignments ] = useState([]);
    const [ courses, setCourses ] = useState([]);

    console.log("here");

    const assignments = [
        new Assignment(1, 'Review', 1004, 'ML', '', true),
        new Assignment(2, 'Review2', 1005, 'Ethical', '', true),
        new Assignment(3, 'Review3', 1006, 'UI', '', false),
        new Assignment(4, 'Review4', 1007, 'EGNRMGMNT', '', true),
    ];
    // if(user){
    return<>
        <Grid container spacing={2}>
            <Grid item width={{xs: '100%', md: '80%'}}>
                <MissingAssignments />
            </Grid>
            
                <Grid item width={{xs: '50%'}} sx={{mt: 4}}>
                    <h1>Current Courses: </h1>
                    <h3 style={{color: 'GrayText'}}>Current Semester</h3>
                    <div style={{padding: 5}}>
                        {courses.map((course, index) => 
                            <Card key={index} sx={{mb: 2}}>
                                <Box sx={{fontSize: 'large', pl:2, pt:1}}>{course.name}</Box>
                                <CardActions>
                                    <Button type="button" variant="text">Go to {course.name}'s course page</Button>
                                </CardActions>
                            </Card>
                        )}
                    </div>
                </Grid>
                
                <Grid item width={{xs:'50%'}} sx={{mt:4}}>
                    <h1>Upcoming Assignments:</h1>
                    {assignments ?  
                    assignments.map((assignment, index) => (
                        <Card key={index} sx={{mb:2}}>
                            <CardContent>
                                <Box fontWeight='bold'>{assignment.assignmentName}
                                    <span style={{color: 'GrayText', float: 'right', marginRight: 2}} > Due Date: {assignment.dueDate}</span>
                                </Box>
                                <CardActions>
                                    <Button>Go to {assignment.assignmentName}</Button>
                                </CardActions>
                            </CardContent>
                            
                        </Card>
                    ))  :  <></>}
                    
                </Grid>
                
        </Grid>
    </>

    // else{
    //     return<>Loading...</>
    // }
}