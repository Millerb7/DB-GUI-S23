import { Grid, Paper, Container, InputLabel, FormControl, Button, Typography, MenuItem, CardContent, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAssignmentsByDay } from 'src/api/AssignmentApi';

  export default function Content({ assignment, color }) {

    return (
        <Grid item>
            <Typography color={color}>{assignment.assignment_name}</Typography>
         </Grid>
    );
  }