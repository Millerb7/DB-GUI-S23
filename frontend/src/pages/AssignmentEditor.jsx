import { useEffect, useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Button, InputLabel } from "@mui/material"
import { Textfield } from "../components/Textfield";
import { UserContext } from "src/layouts/dashboard";
import { addAssignment, editAssignment, getAssignmentById } from "src/api/AssignmentApi";
import { getCourseById } from "src/api/coursePageApi";
import { TextField } from "@mui/material";





export const AssignmentEditor = () => {
    const [assignment, setAssignment] = useState([]);
    const userContext = useContext(useContext);

    const navigate = useNavigate();
    const params = useParams();

    const mergeAccount = delta => setAssignment({ ...assignment, ...delta });

    const handleSave = () => {
        if (params.id){
            editAssignment(params.id, assignment).then(() => navigate(`/dashboard/courses/${params.course_id}`));
        }
        else{
            addAssignment(assignment).then(() => navigate(`/dashboard/courses/${params.course_id}`));
        }
    }
    
    useEffect(() => {
        if (params.id) {
            getAssignmentById(params.id).then(x => {
                setAssignment(x);
            })
        }
        else {
            setAssignment({ assignmentName: '', dueDate: '', course : getCourseById(params.course_id), description : '', missing : false});
        }
    }, []);
    if (!assignment) {
        return <>Loading...</>;
    }

    return <>
        <form>
            <h1 style = {{ marginLeft: "2rem" }}>Assignment Editor</h1>
            <FormGroup sx = {{ mt: 2, mx: 4 }}>
                <Textfield id = "assignmentName"
                    label = "Assignment Name"
                    value = {assignment.assignmentName}
                    setValue = {assignmentName => mergeAccount({ assignmentName })}>
                </Textfield>
                <Textfield id = "description"
                    label = "Assignment Description"
                    value = {assignment.description}
                    setValue = {description => mergeAccount({ description })}>
                </Textfield>
                <InputLabel>Due Date</InputLabel>
                <TextField autoFocus id = "dueDate"
                    type = "date"
                    value = {assignment.dueDate}
                    setValue = {dueDate => mergeAccount({ dueDate })}>
                </TextField>
                <Button type="button"
                    onClick={() => { handleSave();}}>
                    Submit
                </Button>
                <Button type="button" color="error"
                    onClick={() => { navigate(`/dashboard/courses/${params.course_id}`)}}>
                    Cancel
                </Button>
            </FormGroup>
        </form>
    </>
}