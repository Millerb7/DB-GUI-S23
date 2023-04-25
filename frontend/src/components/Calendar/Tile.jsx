import { Card, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAssignmentsByDay } from 'src/api/AssignmentApi';

  export default function Tile({ Month, day }) {
    const months = ['Jan','Feb','Mar','Apr','May',"Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const [ assignemnts, setAssignments ] = useState(null);

    useEffect(() => {
        console.log(day + " " + convertToDateObject(day))
        //getAssignmentsByDay(convertToDateObject(day)).then(x => setAssignments(x));
    }, []);

    const handleCompare = () => {
        
        if(months[Month] === day.split(' ')[1])
            return true;
        else
            return false;
    }

    function convertToDateObject(dateString) {
        const dateParts = dateString.split(' ');
        const month = months.indexOf(dateParts[1]) + 1;
        return `${dateParts[3]}-${month < 10 ? '0' + month : month}-${dateParts[2]}`;
      }

    return (
        <Paper style={{ padding: 15, margin: 1}}>
                {handleCompare() ? 
                    <>
                        <Typography variant="h5">{day.split(' ')[2]}</Typography>
                        <Typography>homework</Typography>
                    </>
                    :
                    <>
                    <Typography variant="h5" color="text.secondary">{day.split(' ')[2]}</Typography>
                    {
                        assignemnts.map((assignment) => (
                            <Typography key={assignment.assignment_id}>{assignment.assignment_name}</Typography>
                        ))
                    }
                </>
                }
         </Paper>
    );
  }