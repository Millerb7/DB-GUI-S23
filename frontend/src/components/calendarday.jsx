import { Card, Grid, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea } from '@mui/material';

  export default function CalendarDay({ month, day }) {

    const handleAssigments = () => {
        // call api for day assigns
    }

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {day.getDate()}
                </Typography>
                <CardActionArea>
                    <Typography>Assignemnts...</Typography>
                </CardActionArea>
            </CardContent>
         </Card>
    );
  }