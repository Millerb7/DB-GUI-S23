import { Grid, Select, InputLabel, FormControl, Button, Typography, MenuItem } from '@mui/material';
import { Page } from '../components/Page'

export const Calendar = () => {

    return (
        <Page>
            <Grid container spacing={1} direction='row'>
                <Grid item>
                    <Typography>Grid Items</Typography>
                    <Button>Button</Button>
                </Grid>
                <FormControl variant="outlined" fullwidth>
                <InputLabel id='DayLabel'>Day</InputLabel>
                <Select labelId='DayLabel'
                    label="Select A Day"
                    value="val"
                >
                    <MenuItem>Monday</MenuItem>
                    <MenuItem>Tuesday</MenuItem>
                    <MenuItem>Wednesday</MenuItem>
                </Select>
                </FormControl>
            </Grid>
        </Page>
    );
}