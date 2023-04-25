import { Card, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea, Grid } from '@mui/material';
import HourView from './Hour';

  export default function DayView({ day }) {

    return (
        <Paper style={{ padding: 15, margin: 1}}>
            <Typography variant="h5">{day}</Typography>
            <Grid>

            </Grid>
         </Paper>
    );
  }