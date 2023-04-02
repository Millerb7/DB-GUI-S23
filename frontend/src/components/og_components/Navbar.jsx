import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link, AppBar, Container, Toolbar, Box, Typography, MenuItem } from '@mui/material';

export const Navbar = () => {
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <Link variant="subtitle2" component={RouterLink} to="home" underline="hover">
                            Home
                        </Link>
                        <Link variant="subtitle2" component={RouterLink} to="courses" underline="hover">
                            Courses
                        </Link>
                        <Link variant="subtitle2" component={RouterLink} to="assignemnts" underline="hover">
                            Assignments
                        </Link>
                        <Link variant="subtitle2" component={RouterLink} to="calendar" underline="hover">
                            Calendar
                        </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}