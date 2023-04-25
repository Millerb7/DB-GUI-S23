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
  const [view, setView] = useState();
  const [assignments, setAssignments] = useState([]);

  // useeffect
  useEffect(() => {
    getUserAssignments(userContext.user.user_id)
      .then((x) => {
        setAssignments(x);
        handleMonthChange(new Date(), x);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  useEffect(() => {
    if (weeks.length > 0) {
      setView(<MonthView weeks={weeks} />);
    }
  }, [weeks, Month]);

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
        else if (i > lastDay.getDate()) {
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
  }

  function getCurrentViewType() {
    if (view && view.type === DayView) {
      return "day";
    } else if (view && view.type === WeekView) {
      return "week";
    } else if (view && view.type === MonthView) {
      return "month";
    }
    return null;
  }

  const handleDayView = (day) => {
    setView(<DayView day={day.toDateString()} />);
  };

  const handleWeekView = (newDate) => {
    setCurrentDate(newDate);
    const startDate = newDate.getDate() - newDate.getDay();
    const week = [];
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(newDate.getFullYear(), newDate.getMonth(), startDate + i);
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
    setView(<WeekView week={week} Month={Month} />);
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
                onClick={() => {
                  const viewType = getCurrentViewType();
                  if (viewType === "week") {
                    handleWeekView(
                        new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7)
                      )
                  } else {
                    handleMonthChange(
                      new Date(currentDate.getFullYear(), Month - 1, 1),
                      assignments
                    );
                  }
                }}
              >
                previous
              </Button>
              <ButtonGroup
                size="small"
                aria-label="small cotained button group"
              >
                <Button key="day" onClick={() => handleDayView(currentDate)}>
                  Days
                </Button>
                <Button key="week" onClick={() => handleWeekView(currentDate)}>
                  Week
                </Button>
                <Button key="month" onClick={() => handleMonthView()}>
                  Month
                </Button>
              </ButtonGroup>
              <Button
                onClick={() => {
                  const viewType = getCurrentViewType();
                  if (viewType === "week") {
                    handleWeekView(
                        new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7)
                      )
                  } else {
                    handleMonthChange(
                      new Date(currentDate.getFullYear(), Month + 1, 1),
                      assignments
                    );
                  }
                }}
              >
                next
              </Button>
              <Typography>
                {currentDate.toLocaleString("en-US", { month: "long" })}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Sunday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Monday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Tuesday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Wednesday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Thursday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Friday</Typography>
                </Grid>
                <Grid item xs={12 / 7}>
                  <Typography variant="h5">Saturday</Typography>
                </Grid>
              </Grid>
              <Grid>{view}</Grid>
              <Grid>
                <Typography>Date: {currentDate.toDateString()}</Typography>
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
