import { Grid, Container, InputLabel, FormControl, Button, Typography, MenuItem } from '@mui/material';
import Page from '../components/Page'
import { useEffect, useState } from 'react';
import CalendarDay from 'src/components/calendarday';
export const Calendar = () => {

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ Month, setMonth ] = useState(currentDate.getMonth());
    const [ firstDay, setFirstDay ] = useState(new Date(currentDate.getFullYear(), Month, 1));
    const [ lastDay, setLastDay ] = useState(new Date(currentDate.getFullYear(), Month+1, 0))
    const [ weeks, setWeeks ] = useState([]);


    // useeffect
    useEffect(() => {
        handleDateChange( new Date() );
    }, []);

    function handleDateChange ( newDate ) {
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
                    week.push(new Date(currentDate.getFullYear(), Month-1, new Date(currentDate.getFullYear(), Month, 0).getDate()-5+d));
                } 
                // if the day is in the next month
                else if (w === 6 && d > lastDay.getDate()) {
                    week.push(new Date(currentDate.getFullYear(), Month+1, d));
                }
                // in the month
                else {
                    i++;
                    week.push(new Date(currentDate.getFullYear(), Month, i));
                }
            }
            cal.push(week);
        }
        // set the value for the arrays of weeks and days
        setWeeks(cal);
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
            <Container spacing={1} direction='row'>
                <Grid>
                    <Button onClick={() => handleDateChange(new Date(currentDate.getFullYear(), Month-1, 1))}>previous</Button>
                    Month: {Month}
                    <Button onClick={() => handleDateChange(new Date(currentDate.getFullYear(), Month+1, 1))}>next</Button>
                </Grid>
                <Grid container item spacing={2}>
                    {
                        weeks ? 
                        weeks.map((week, index) => (
                            <Grid item container size={2} key={index+'w'}>
                                {week.map((day, index) => (
                                    <CalendarDay item key={index} month={Month} day={day} />
                                ))}
                            </Grid>
                        ))
                        :
                        <></>
                    }
                </Grid>
                <Grid container item>
                    <Typography>Grid Items</Typography>
                    <Button>Button</Button>
                </Grid>
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