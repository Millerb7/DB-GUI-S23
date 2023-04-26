
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
import { getAssignmentsByDay } from "src/api/AssignmentApi";
import Content from "./Content";

export default function Tile({ Month, day }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleCompare = () => {
    if (months[Month] === day.date.split(" ")[1]) return true;
    else return false;
  };

  return (
    <Grid item xs={12/7} sx={{flexBasis: 'auto', flexGrow: 1, flexShrink: 0, minHeight: '200px'}}>
      {handleCompare() ? (
        <>
          <Typography variant="h5" color="textPrimary">{day.date.split(" ")[2]}</Typography>
          {day.assignments.length > 0 ? (
            day.assignments.map((assignment) => (
              <Content assignment={assignment}></Content>
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Typography variant="h5">
            {day.date.split(" ")[2]}
          </Typography>
          {day.assignments.length > 0 ? (
            day.assignments.map((assignment) => (
              <Content
                assignment={assignment}
              ></Content>
            ))
          ) : (
            <></>
          )}
        </>
      )}
    </Grid>
  );
}
