import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

export const CourseList = ({ courses }) => {

    return <>
        <Table>
            <TableHead>

                <TableCell>Course</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Professor</TableCell>

            </TableHead>

            <TableBody>
                {
                    courses.map(course => <TableRow key={course.course_id}>
                        <TableCell>
                            <Link to={`${course.course_id}`}> {course.course_name} </Link>
                        </TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>{course.year}</TableCell>
                        <TableCell>{course.professor_name}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>

    </>;
}
