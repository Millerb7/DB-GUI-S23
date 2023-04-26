import {
  Grid,
  Paper,
  Container,
  InputLabel,
  FormControl,
  Button,
  Typography,
  MenuItem,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAssignmentsByDay } from "src/api/AssignmentApi";
import { Link as RouterLink } from 'react-router-dom';


export default function Content({ assignment }) {
  const navigate = useNavigate();

  console.log(assignment)

  return (
    <Grid item>
        <Typography color={'textPrimary'} component={RouterLink} to={`../assignments/${assignment.assignment_id}`} style={{
          textDecoration: 'none',
          backgroundColor: assignment.color,
          padding: "8px",
        }}>
          {assignment.assignment_name}
        </Typography>
    </Grid>
  );
}
