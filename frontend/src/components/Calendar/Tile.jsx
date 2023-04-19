import { Card, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea } from '@mui/material';

  export default function Tile({ Month, day }) {

    const handleCompare = () => {
        const months = ['Jan','Feb','Mar','Apr','May',"Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        console.log(Month)
        if(months[Month] === day.split(' ')[1])
            return true;
        else
            return false;
    }

    const handleAssigments = () => {
        // call api for day assigns
    }

    return (
        <Paper style={{ padding: 15, margin: 1}}>
                {handleCompare() ? 
                    <>
                        <Typography variant="h5">{day}</Typography>
                        <Typography>homework</Typography>
                    </>
                    :
                    <>
                    <Typography variant="h5" color="text.secondary">{day}</Typography>
                    <Typography color="text.secondary">homework</Typography>
                </>
                }
         </Paper>
    );
  }