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
    const [ filteredCourse, setFilteredCourse ] = useState('');
       
    useEffect(() => {
        getCurrentCoursesByID(userContext.user.user_id).then(x => setCurrentCourses(x));
        getUpcoming(userContext.user.user_id).then(x => setUpcomingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
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
        console.log(event.target.value);
        if(event.target.value === ''){
            getUpcoming(userContext.user.user_id).then(x => setUpcomingAssignments(x.sort((a,b) => new Date(a.assignment_due_date) - new Date(b.assignment_due_date))));
        } else{
            getAssignmentsByCourse(event.target.value, userContext.user.user_id, 0)
                .then(x => setUpcomingAssignments(x));
        }
        setFilteredCourse(event.target.value);
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
                <Grid container direction='row' pacing={1} sx={{p: 4}}>
                    <Box width='100%'>
                        <h1>Current Courses: </h1>
                        <h3 style={{color: 'GrayText'}}>{currSemester()}</h3>
                        <br/>
                    </Box>
                    <Grid item display='inline-block' sx={{margin: 1}} width='45%' >
                        
                        {currentCourses.map((course) => 
                            <Paper elevation={10} >
                                <Card sx={{mb: 2, padding:1}} key={course.course_id}>
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
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{marginTop: 2}}>
                <Grid container sx={{padding: 3}}>
                   <Box width='100%' >
                    <h1>Upcoming Assignments:</h1>
                        <h3 style={{color: 'GrayText'}} >Assignments due in the next week 
                            <span style={{float: 'right'}}>
                                <FormControl size='small' sx={{width: 120, mb:2}} >
                                    <InputLabel id='course-select-label'>Courses</InputLabel>
                                    <Select
                                        style={{float: 'right', width: ''}}
                                        labelId='course-select-label'
                                        value={filteredCourse}
                                        onChange={filterUpcomingAssignments}
                                        placeholder="Course">
                                            <MenuItem value="">All Courses</MenuItem>
                                            {currentCourses.map((course) => (
                                                <MenuItem key={course.course_id} value={course.course_id}>
                                                    {course.course_name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </span>
                        </h3>
                   </Box>
                    <br/>
                    <Grid container item spacing={3} display='block' sx={{margin: 3}}>
                        
                        {upcomingAssignments ? upcomingAssignments.map((assignment) => (
                            <div syle={{margin: 3}} >
                                <Grid item key={assignment.assignment_id} >
                                    <Paper elevation={5} >
                                    
                                        <Card key={assignment.assignment_id} sx={{mb:2, p:2}} >
                                            <CardContent>
                                                <Box fontWeight='bold' fontSize='large' >
                                                    <Button type="contained" variant="text" sx={{fontSize: 20, color: 'black'}}
                                                        onClick={() => {
                                                            navigate(`assignments/${assignment.assignment_id}`);
                                                        }}>
                                                        {assignment.assignment_name} 
                                                    </Button>
                                                    <span style={{color: 'GrayText', float: 'right', marginRight: 2, fontWeight: 'lighter'}} >
                                                        Due Date: {formatDate(assignment.assignment_due_date)}
                                                    </span>
                                                </Box> 
                                                <span> {assignment.course_name}</span>
                                                <br/>
                                                <span style={{color: 'GrayText', padding: 2}}>{assignment.assignment_description}</span>
                                                <br/>
                                                <Button type="button" variant="text" 
                                                    onClick={() => {
                                                        navigate(`assignments/${assignment.assignment_id}`);
                                                    }}>
                                                    Go to {assignment.assignment_name}'s assignment page
                                                </Button>
                                            </CardContent>
                                
                                        </Card>
                                          
                                    </Paper>
                                </Grid>
                            </div>
                        ))  :  <></>}
                        </Grid>
                </Grid>
                
            </Paper>                   
    </>
}