import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Paper, FormControl, InputLabel } from '@mui/material';
import { Box, Card, CardActions, CardContent, Button, Select, MenuItem } from '@mui/material';

import { MissingAssignments } from "src/components/MissingAssignments";
import { UserContext } from "src/layouts/dashboard";
import { getAssignmentsByCourse, getUpcoming, getUpcomingAssignments } from "src/api/AssignmentApi";
import { getCurrentCoursesByID } from "src/api/coursePageApi";

export const Home = () => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [ currentCourses, setCurrentCourses ] = useState([]);
    const [ upcomingAssignments, setUpcomingAssignments ] = useState([]);
    const [ filteredCourse ] = useState([]);
       
    useEffect(() => {
        getCurrentCoursesByID(userContext.user.user_id).then(x => setCurrentCourses(x));
        getUpcoming(1).then(x => setUpcomingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
        console.log(upcomingAssignments);
    }, []);

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

    const filterUpcomingAssignments = (event) => {
        if(event.target.value === ''){
            getUpcoming(1).then(x => setUpcomingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
        } else{
            getAssignmentsByCourse(event.target.value, userContext.user.user_id, 0)
                .then(x => setUpcomingAssignments(x));
        }
    }

    return<>
        <Typography variant="h4" style={{textAlign: 'center'}}>Hi, Welcome Back {userContext.user.first_name}</Typography>
            <br/>
            <Paper elevation={3}>
                <Grid item width={{xs: '100%'}}>
                    <MissingAssignments />
                </Grid>
            </Paper>
            <br/>
            <Paper elevation={3} sx={{p:2}}>
                <Grid container spacing={3}>
                    <Grid item width={{xs: '50%'}}>
                        <h1>Current Courses: </h1>
                        <h3 style={{color: 'GrayText'}}>{currSemester()}</h3>
                        <br/>
                        
                        {currentCourses.map((course) => 
                        <div key={course.course_id}>
                            <Paper elevation={10} >
                                <Card sx={{mb: 2, padding:1}}>
                                    <Box sx={{fontSize: 'large', pt:2, pl:2}} style={{fontWeight: 'bold'}}>
                                        {course.course_name}
                                        <span style={{fontSize: 15, color: 'GrayText', float: 'right', marginRight: '2vw'}}>
                                            Professor: {course.professor_name}
                                        </span>
                                    </Box>
                                    <CardActions>
                                        <Button type="button" variant="text"
                                            onClick={() => {
                                                navigate(`courses/${course.course_id}`);
                                            }}>
                                            Go to {course.course_name}'s course page
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </div>
                        )}
                      
                    </Grid>
        
                    <Grid item width={{xs:'50%'}}>
                        <div>
                            <h1>Upcoming Assignments:</h1>
                            <h3 style={{color: 'GrayText'}} >Assignments due in the next week 
                            <span style={{float: 'right'}}>
                                <FormControl size='small' sx={{width: 120}} >
                                    <InputLabel id='course-select-label'>Courses</InputLabel>
                                    <Select
                                        style={{float: 'right', width: ''}}
                                        labelId='course-select-label'
                                        value={filteredCourse}
                                        onChange={filterUpcomingAssignments}
                                        placeholder="Course">
                                            <MenuItem value=''>All Courses</MenuItem>
                                            {currentCourses.map((course) => (
                                                <MenuItem key={course.course_id} value={course.course_id}>
                                                    {course.course_name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </span>
                            </h3>
                        </div>
                        <br/>
                        <div syle={{marginTop: 3}}>
                            {upcomingAssignments ?  
                                upcomingAssignments.map((assignment) => (
                                <Paper elevation={10}>
                                    <Card key={assignment.assignment_id} sx={{mb:2}}>
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
                                        <CardActions>
                                            <Button type="button" variant="text"
                                                onClick={() => {
                                                    navigate(`assignments/${assignment.assignment_id}`);
                                                }}>
                                                Go to {assignment.assignment_name}'s course page
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            ))  :  <></>}
                        </div>  
                    </Grid>
                </Grid>
            </Paper>                   
    </>
}