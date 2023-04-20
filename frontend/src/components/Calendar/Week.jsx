import { Grid } from '@mui/material';
import Tile from './Tile';

  export default function WeekView({ week, Month }) {

    return (
        <Grid container item spacing={2}>
            {week.map((day, index) => (
                <Tile item key={index} Month={Month} day={day} />
            ))}
        </Grid>
    );
  }