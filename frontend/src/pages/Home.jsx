import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, Select, InputLabel, FormControl, Button, Typography, MenuItem } from '@mui/material';

export const Home = () => {

    return (
        <>
            <Grid container spacing={1} direction='row'>
                <Grid item>
                    <Link variant="subtitle2" component={RouterLink} to="courses">
                        Courses Page
                    </Link>
                </Grid>
                <Grid item>
                    <Link variant="subtitle2" component={RouterLink} to="assignments">
                        Assignments Page
                    </Link>
                </Grid>
                <Grid item>
                    <Link variant="subtitle2" component={RouterLink} to="calendar">
                        Calendar Page
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}