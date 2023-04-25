import {
  Grid,
  Container,
  Paper,
  Card,
  CardActionArea,
  Button,
  ButtonGroup,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Page from "../components/Page";
import { useContext, useEffect, useState } from "react";
import Tile from "src/components/Calendar/Tile";
import WeekView from "../components/Calendar/Week";
import MonthView from "src/components/Calendar/Month";
import DayView from "src/components/Calendar/Day";
import { getUserAssignments } from "src/api/AssignmentApi";
import { UserContext } from "src/layouts/dashboard";
import Cal from "src/utils/Calendar";
import { ConstructionOutlined } from "@mui/icons-material";

export const Calendar = () => {
  const userContext = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Month, setMonth] = useState(currentDate.getMonth());
  const [firstDay, setFirstDay] = useState(
    new Date(currentDate.getFullYear(), Month, 1)
  );
  const [lastDay, setLastDay] = useState(
    new Date(currentDate.getFullYear(), Month + 1, 0)
  );
  const [weeks, setWeeks] = useState([]);
  const [view, setView] = useState(null);

  // useeffect
  // useeffect
  useEffect(() => {
    getUserAssignments(userContext.user.user_id)
      .then((x) => {
        handleMonthChange(new Date(), x);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  function handleMonthChange(newDate, assignments) {
    // update current date
    setCurrentDate(newDate);
  
    // update month
    const newMonth = newDate.getMonth();
    setMonth(newMonth);
  
    // update the first day of the month
    const firstDay = new Date(newDate.getFullYear(), newMonth, 1);
    setFirstDay(firstDay);
  
    // update the last day of the month
    const lastDay = new Date(newDate.getFullYear(), newMonth + 1, 0);
    setLastDay(lastDay);
  
    let cal = [];
    let i = 0;
  
    console.log(assignments);
  
    for (let w = 0; w < 6; w++) {
      const week = [];
  
      for (let d = 0; d < 7; d++) {
        // if the day is in the previous month
        if (w === 0 && d < firstDay.getDay()) {
          const day = new Date(
            newDate.getFullYear(),
            newMonth - 1,
            new Date(newDate.getFullYear(), newMonth, 0).getDate() - 5 + d
          );
  
          week.push(
            new Cal(
              day.toDateString(),
              assignments.filter(
                (assignment) =>
                  new Date(assignment.assignment_due_date).toDateString() ===
                  day.toDateString()
              )
            )
          );
        }
        // if the day is in the next month
        else if (w === 5 && d > lastDay.getDate()) {
          const day = new Date(newDate.getFullYear(), newMonth + 1, d);
  
          week.push(
            new Cal(
              day.toDateString(),
              assignments.filter(
                (assignment) =>
                  new Date(assignment.assignment_due_date).toDateString() ===
                  day.toDateString()
              )
            )
          );
        }
        // in the current month
        else {
          i++;
          const day = new Date(newDate.getFullYear(), newMonth, i);
  
          week.push(
            new Cal(
              day.toDateString(),
              assignments.filter(
                (assignment) =>
                  new Date(assignment.assignment_due_date).toDateString() ===
                  day.toDateString()
              )
            )
          );
        }
      }
      cal.push(week);
    }
  
    console.log(cal);
  
    // set the value for the arrays of weeks and days
    setWeeks(cal);
  
    setView(<MonthView weeks={weeks} Month={newMonth} />);
  }
  

  function handleWeekChange(newDate) {
    // update current date
    setCurrentDate(newDate);
    // update month
    setMonth(newDate.getMonth());
    // update the first day of the month
    setFirstDay(new Date(newDate.getFullYear(), Month, 1));
    // update the last day of the month
    setLastDay(new Date(newDate.getFullYear(), Month + 1, 0));

    let cal = [];
    let i = 0;

    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // if the day is in the preious month
        if (w === 0 && d < firstDay.getDay()) {
          week.push(
            new Date(
              currentDate.getFullYear(),
              Month - 1,
              new Date(currentDate.getFullYear(), Month, 0).getDate() - 5 + d
            ).toDateString()
          );
        }
        // if the day is in the next month
        else if (w === 6 && d > lastDay.getDate()) {
          week.push(
            new Date(currentDate.getFullYear(), Month + 1, d).toDateString()
          );
        }
        // in the month
        else {
          i++;
          week.push(
            new Date(currentDate.getFullYear(), Month, i).toDateString()
          );
        }
      }
      cal.push(week);
    }
    // set the value for the arrays of weeks and days
    setWeeks(cal);
  }

  const handleDayView = (day) => {
    setView(<DayView day={day.toDateString()} />);
  };

  const handleWeekView = (day) => {
    for (let i = 0; i < 6; i++) {
      if (weeks[i].includes(day.toDateString())) {
        setView(<WeekView week={weeks[i]} Month={Month} />);
        return;
      }
    }
  };

  const handleMonthView = () => {
    setView(<MonthView weeks={weeks} Month={Month} />);
  };

  /* 
        create class for day variable
            include 
        
        this class should
        create a week for the initial week
        crete rest of weeks
        create last week

        map eachweek, mapping days as columns in each

        i have weekday of start
        i have weekday of end
    */

  return (
    <>
      {currentDate ? (
        <Page title="Dashboard | Minimal-UI">
          <Container spacing={1}>
            <Box item container>
              <Button
                onClick={() =>
                  handleMonthChange(
                    new Date(currentDate.getFullYear(), Month - 1, 1)
                  )
                }
              >
                previous
              </Button>
              <ButtonGroup
                size="small"
                aria-label="small cotained button group"
              >
                <Button key="day" onClick={() => handleDayView(currentDate)}>
                  Day
                </Button>
                <Button key="week" onClick={() => handleWeekView(currentDate)}>
                  Week
                </Button>
                <Button key="month" onClick={() => handleMonthView()}>
                  Month
                </Button>
              </ButtonGroup>
              <Button
                onClick={() =>
                  handleMonthChange(
                    new Date(currentDate.getFullYear(), Month + 1, 1)
                  )
                }
              >
                next
              </Button>
              <Grid>
                <Typography>
                  {currentDate.toLocaleString("en-US", { month: "long" })}
                </Typography>
                <Grid item container size={2}>
                  <Paper>
                    <Typography variant="h5">Sunday</Typography>
                  </Paper>
                  <Card>
                    <CardContent>
                      <Typography>Monday</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography>Tuesday</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography>Wednesday</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography>Thursday</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography>Friday</Typography>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <Typography>Saturday</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid>{view}</Grid>
                <Grid>
                  <Typography>Date: {currentDate.toDateString()}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Page>
      ) : (
        <></>
      )}
    </>
  );
};
