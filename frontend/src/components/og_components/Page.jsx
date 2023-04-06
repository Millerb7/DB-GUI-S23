import { Navbar } from './Navbar'
import { Box } from '@mui/material';

export const Page = ({ children }) => {
    
    return (
        <Box>
            <Navbar></Navbar>
            {children}
        </Box>
    );
}