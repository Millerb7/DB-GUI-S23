import { Grid, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea } from '@mui/material';

  export default function HourView({ Hour, Assignments }) {

    return (
        <Grid style={{ padding: 15, margin: 1}}>
            <Typography>{Hour}</Typography>
            {Assignments.map((assign, index) => (
                assign.time === Hour ?
                <Grid>
                    <Typography>{assign.name}</Typography>
                    <Typography>{assign.name}</Typography>
                </Grid>
                :
                <></>
            ))}
         </Grid>
    );
  }