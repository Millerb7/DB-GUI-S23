import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
                        <TableCell>Description</TableCell>
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

    else{
        return <>
            <Table sx = {{mb: 3}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Assignment Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Due Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        assignments.map(assignment => <TableRow key={assignment.assignment_id}>
                            <TableCell>{assignment.assignment_name}</TableCell>
                            <TableCell>{assignment.assignment_description}</TableCell>
                            <TableCell>{assignment.assignmnet_due_date}</TableCell>
                            <TableCell>
                                <Button type = "button"
                                    onClick = {() => {
                                        // navigate()
                                    }}>
                                    <ModeEditIcon></ModeEditIcon>
                                </Button>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>                
            </Table>
        </>
    }
}
