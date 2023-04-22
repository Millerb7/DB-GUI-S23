import { Card, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea, Grid } from '@mui/material';
import HourView from './Hour';

  export default function DayView({ day }) {
    const times = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    const assign = 0;

    const handleAssigments = () => {
        // call api for day assigns
        
    }

    return (
        <Paper style={{ padding: 15, margin: 1}}>
            <Typography variant="h5">{day}</Typography>
            <Grid>
                {times.map((time, index) => (
                    <HourView key={index} Hour={time}  />
                ))}
            </Grid>
         </Paper>
    );
  }