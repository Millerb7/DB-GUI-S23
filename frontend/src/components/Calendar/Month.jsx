import { Grid } from '@mui/material';
import WeekView from './Week';

  export default function MonthView({ weeks, Month }) {

    return (
        <Grid container item spacing={2}>
            {
                weeks ? 
                weeks.map((week, index) => (
                        <WeekView key={index} Month={Month} week={week} />
                    ))
                    :
                    <></>
            }
        </Grid>
    );
  }