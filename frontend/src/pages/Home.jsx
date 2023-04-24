import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCourses, getCurrentCourses, getCurrentCoursesByID } from "src/api/coursePageApi";
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
import { getUpcomingAssignments } from "src/api/AssignmentApi";

export const Home = () =>{
    const [ user, setUser ] = useState(undefined);

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [ missingAssignments, setMissingAssignments ] = useState([]);
    const [ currentCourses, setCurrentCourses ] = useState([]);
    const [ upcomingAssignments, setUpcomingAssignments ] = useState([]);
       
    useEffect(() => {
        getCurrentCoursesByID(userContext.user.user_id).then(x => setCurrentCourses(x));
        getUpcomingAssignments().then(x => setUpcomingAssignments(x));
    }, []);

    console.log(upcomingAssignments);

    
    
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
                        {currentCourses.map((course, index) => 
                            <Card key={index} sx={{mb: 2}}>
                                <Box sx={{fontSize: 'large', pl:2, pt:1}}>{course.course_name}</Box>
                                <CardActions>
                                    <Button type="button" variant="text"
                                        onClick={() => {
                                            navigate(`courses/${course.course_id}`);
                                        }}>
                                        Go to {course.course_name}'s course page
                                    </Button>
                                </CardActions>
                            </Card>
                        )}
                    </div>
                </Grid>
                
                <Grid item width={{xs:'50%'}} sx={{mt:4}}>
                    <h1>Upcoming Assignments:</h1>
                    {upcomingAssignments ?  
                    upcomingAssignments.map((assignment, index) => (
                        <Card key={index} sx={{mb:2}}>
                            <CardContent>
                                <Box fontWeight='bold'>{assignment.assignment_name}
                                    <span style={{color: 'GrayText', float: 'right', marginRight: 2}} > Due Date: {assignment.dueDate}</span>
                                </Box>
                                <CardActions>
                                    <Button>Go to {assignment.assignment_name}</Button>
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