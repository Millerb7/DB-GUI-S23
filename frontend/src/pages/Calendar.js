import { Grid, Container, InputLabel, FormControl, Button, Typography, MenuItem } from '@mui/material';
import Page from '../components/Page'
import { useEffect, useState } from 'react';

export const Calendar = () => {

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ Month, setMonth ] = useState(currentDate.getMonth());
    let [ monthDays, setMonthDays ] = useState(Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()).fill().map((_, i) => i + 1));

    return (
        <Page title="Dashboard | Minimal-UI">
            <Container spacing={1} direction='row'>
                <Grid>
                    Month: {Month} - {}
                </Grid>
                <Grid container item spacing={2}>
                    {
                        monthDays.map((day) => (
                            <Grid item key={day}>{day}</Grid>
                    ))}
                </Grid>
                <Grid item>
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
    );
}