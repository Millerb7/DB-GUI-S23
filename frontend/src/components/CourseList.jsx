import { Link, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from "react-router-dom";

export const CourseList = ({ courses }) => {
    const navigate = useNavigate();

    if(courses.length === 0) {
        return <>
            <Table sx={{mb: 3}}>
                <TableHead>
                    <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Professor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            No courses found. Please add a course.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>;
    } else {

    return <>
        <Table sx={{mb: 3}}>
            <TableHead>
                <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Professor</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {

                    courses.map(course => <TableRow key={course.course_id}>
                        <TableCell>
                            <Link href={`courses/${course.course_id}`}> {course.course_name} </Link>
                        </TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>{course.year}</TableCell>
                        <TableCell>{course.professor_name}</TableCell>
                        <TableCell>
                            <Button 
                                type="button"
                                onClick={() => {
                                    navigate(`edit/${course.course_id}`);
                                 }}>
                                <ModeEditIcon></ModeEditIcon>
                            </Button>
                        </TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </>;
    }
}
