import { Grid, Container, Paper, Card, CardActionArea, Button, ButtonGroup, Typography, CardContent, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import Page from '../components/Page'
import { useEffect, useState } from 'react';
import Tile from 'src/components/Calendar/Tile';
import WeekView from '../components/Calendar/Week';
import MonthView from 'src/components/Calendar/Month';
export const Calendar = () => {

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ Month, setMonth ] = useState(currentDate.getMonth());
    const [ firstDay, setFirstDay ] = useState(new Date(currentDate.getFullYear(), Month, 1));
    const [ lastDay, setLastDay ] = useState(new Date(currentDate.getFullYear(), Month+1, 0))
    const [ weeks, setWeeks ] = useState([]);
    const [ view, setView ] = useState(<MonthView weeks={weeks} Month={Month} />);


    // useeffect
    useEffect(() => {
        handleMonthChange( new Date() );
    }, []);

    function handleMonthChange ( newDate ) {

        // update current date
        setCurrentDate(newDate);
        // update month
        setMonth(newDate.getMonth());
        // update the first day of the month
        setFirstDay(new Date(newDate.getFullYear(), Month, 1));
        // update the last day of the month
        setLastDay(new Date(newDate.getFullYear(), Month+1, 0));

        let cal = [];
        let i = 0;            

        for(let w = 0; w < 6; w++) {
            const week = [];
            for(let d = 0; d < 7; d++) {
                // if the day is in the preious month
                if(w === 0 && d < firstDay.getDay()) {
                    week.push(new Date(currentDate.getFullYear(), Month-1, new Date(currentDate.getFullYear(), Month, 0).getDate()-5+d).toDateString());
                } 
                // if the day is in the next month
                else if (w === 6 && d > lastDay.getDate()) {
                    week.push(new Date(currentDate.getFullYear(), Month+1, d).toDateString());
                }
                // in the month
                else {
                    i++;
                    week.push(new Date(currentDate.getFullYear(), Month, i).toDateString());
                }
            }
            cal.push(week);
        }
        // set the value for the arrays of weeks and days
        setWeeks(cal);
    }

    const handleDayView = (day) => {
        setView(<Tile day={day.toDateString()} Month={Month} />)
    }

    const handleWeekView = (day) => {
        for(let i = 0; i < 6; i++) {
            if(weeks[i].includes(day.toDateString())) {
                setView(<WeekView week={weeks[i]} Month={Month} />)
                return;
            }
        }
    }

    const handleMonthView = () => {
        setView(<MonthView weeks={weeks} Month={Month} />)
    }

    /* 
        create class for day variable
            include 
        
        this class should
        create a week for the initial week
        crete rest of weeks
        create last week

        map eachweek, mapping days as columns in each

        i have weekday of start
        i have weekday of end
    */

    return (
        <>
        {currentDate ? <Page title="Dashboard | Minimal-UI">
            <Container spacing={1}>
                <Box item container>
                    <Button onClick={() => handleMonthChange(new Date(currentDate.getFullYear(), Month-1, 1))}>previous</Button>
                    <ButtonGroup size="small" aria-label="small cotained button group">
                        <Button key="day" onClick={() => handleDayView(currentDate)}>Day</Button>
                        <Button key="week" onClick={() => handleWeekView(currentDate)}>Week</Button>
                        <Button key="month" onClick={() => handleMonthView()}>Month</Button>
                    </ButtonGroup>
                    <Button onClick={() => handleMonthChange(new Date(currentDate.getFullYear(), Month+1, 1))}>next</Button>
                    <Grid item container size={2}>
                        <Paper>
                            <Typography variant="h5">Sunday</Typography>
                        </Paper>
                        <Card>
                            <CardContent>
                                <Typography>Monday</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography>Tuesday</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography>Wednesday</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography>Thursday</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography>Friday</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography>Saturday</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>
                {view}
                <Grid>
                    <Typography>
                        Date: {currentDate.toDateString()}
                    </Typography>
                </Grid>

            </Container>
        </Page>
          :
        <></>}
        </>
    );
}