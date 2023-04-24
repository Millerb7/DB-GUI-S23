import { Link, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from "react-router-dom";


export const AssignmentList = ({ assignments }) => {
    const navigate = useNavigate();

    if(assignments.length === 0) {
        return <>
            <Table sx = {{mb: 3}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Assignment Name</TableCell>
                        <TableCell>Assignment Number</TableCell>
                        <TableCell>Due Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell></TableCell> {/* placeholder */}
                        <TableCell>No assignments found.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    }
}
