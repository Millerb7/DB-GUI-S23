import { useEffect, useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, TextField, TextareaAutosize } from "@mui/material"
import { UserContext } from "src/layouts/dashboard";
import { Textfield } from "src/components/Textfield"




export const AssignmentEditor = () => {
    const [assignment, setAssignment] = useState([]);
    const userContext = useContext(useContext);

    const navigate = useNavigate();
    const params = useParams();

    const mergeAccount = delta => setAssignment({ ...assignment, ...delta });
    
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
                <TextField id = "description"
                    label = "Assignment Description"
                    value = {assignment.description}
                    setValue = {description => mergeAccount({ description })}>
                </TextField>
                <TextField id = "dueDate"
                    label = "Due Date"
                    type = "datetime-local"
                    value = {assignment.dueDate}
                    setValue = {dueDate => mergeAccount({ dueDate })}>
                </TextField>
            </FormGroup>
        </form>
    </>
}