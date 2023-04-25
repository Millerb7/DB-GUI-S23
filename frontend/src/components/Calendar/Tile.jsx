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

  // useEffect(() => {
  //     console.log(day + " " + convertToDateObject(day))
  //     getAssignmentsByDay(convertToDateObject(day)).then(x => setAssignments(x));
  // }, []);

  const handleCompare = () => {
    if (months[Month] === day.date.split(" ")[1]) return true;
    else return false;
  };

  // function convertToDateObject(dateString) {
  //     const dateParts = dateString.split(' ');
  //     const month = months.indexOf(dateParts[1]) + 1;
  //     return `${dateParts[3]}-${month < 10 ? '0' + month : month}-${dateParts[2]}`;
  //   }

  console.log(day.assignments)

  return (
    <Grid item xs="auto">
      {handleCompare() ? (
        <>
          <Typography variant="h5">{day.date.split(" ")[2]}</Typography>
          {day.assignments.length > 0 ? (
            day.assignments.map((assignment) => (
              <Content assignment={assignment}></Content>
            ))
          ) : (
            <Typography>Add Assignment</Typography>
          )}
        </>
      ) : (
        <>
          <Typography variant="h5" color="text.secondary">
            {day.date.split(" ")[2]}
          </Typography>
          {day.assignments.length > 0 ? (
            day.assignments.map((assignment) => (
              <Content
                assignment={assignment}
                color={"text.secondary"}
              ></Content>
            ))
          ) : (
            <Typography color="text.secondary">Add Assignment</Typography>
          )}
        </>
      )}
    </Grid>
  );
}
