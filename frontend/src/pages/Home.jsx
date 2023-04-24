import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Paper } from '@mui/material';
import { Box, Card, CardActions, CardContent, Button } from '@mui/material';

import { MissingAssignments } from "src/components/MissingAssignments";
import { UserContext } from "src/layouts/dashboard";
import { getUpcomingAssignments } from "src/api/AssignmentApi";
import { getCurrentCoursesByID } from "src/api/coursePageApi";

export const Home = () => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [ currentCourses, setCurrentCourses ] = useState([]);
    const [ upcomingAssignments, setUpcomingAssignments ] = useState([]);
       
    useEffect(() => {
        getCurrentCoursesByID(userContext.user.user_id).then(x => setCurrentCourses(x));
        getUpcomingAssignments().then(x => setUpcomingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
    }, []);

    console.log(upcomingAssignments);

    function formatDate (dateStr) {
        const newdate = new Date (dateStr);
        const options = { weekday: 'long', month: 'long', day: 'numeric'};
        return newdate.toLocaleDateString('en-US', options);
    }
    
    function currSemester () {
        const date = new Date();
        if(date.getMonth() < 5)
         return "Spring " + date.getFullYear();
        else
            return "Fall " + date.getFullYear();
    }



    return<>
        <Typography variant="h4" style={{textAlign: 'center'}}>Hi, Welcome back {userContext.user.first_name}</Typography>
            <br/>
            <Paper elevation={3} alignItems={'center'}>
                <Grid item width={{xs: '100%'}}>
                    <MissingAssignments />
                </Grid>
            </Paper>
            <br/>
            <Paper elevation={3} alignItems={'center'} sx={{p:2}}>
                <Grid container spacing={3}>
                    <Grid item width={{xs: '50%'}}>
                        <h1>Current Courses: </h1>
                        <h3 style={{color: 'GrayText'}}>{currSemester()}</h3>
                        <br/>
                        <div >
                            {currentCourses.map((course, index) => 
                            <Paper elevation={10}>
                                <Card key={index} sx={{mb: 2, padding:1}}>
                                    <Box sx={{fontSize: 'large', pt:2, pl:2}} style={{fontWeight: 'bold'}}>
                                        {course.course_name}
                                        <span style={{fontSize: 15, color: 'GrayText', float: 'right', marginRight: '2vw'}}>
                                            Professor: {course.professor_name}
                                        </span>
                                    </Box>
                                    <CardActions>
                                        <Button type="button" variant="text"
                                            onClick={() => {
                                                navigate(`courses/${course.couse_id}`);
                                            }}>
                                            Go to {course.course_name}'s course page
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                            )}
                        </div>
                    </Grid>
        
                    <Grid item width={{xs:'50%'}}>
                        <div>
                            <h1>Upcoming Assignments:</h1>
                            <h3 style={{color: 'GrayText'}} >Assignments due in the next week</h3>
                        </div>
                        <br/>
                        <div syle={{marginTop: 3}}>
                            {upcomingAssignments ?  
                            upcomingAssignments.map((assignment, index) => (
                                <Paper elevation={10}>
                                    <Card key={index} sx={{mb:2}}>
                                        <CardContent>
                                            <Box fontWeight='bold'>{assignment.assignment_name}
                                                <span style={{color: 'GrayText', float: 'right', marginRight: 2}} > 
                                                    Due Date: {formatDate(assignment.assignment_due_date)}
                                                </span>
                                                <br/>
                                                <p  style={{color: 'GrayText', padding: 2}}>{assignment.assignment_description}</p>
                                            </Box>
                                        </CardContent>
                                        
                                    </Card>
                                </Paper>
                            ))  :  <></>}
                        </div>  
                    </Grid>
                </Grid>
            </Paper>                   
    </>
}