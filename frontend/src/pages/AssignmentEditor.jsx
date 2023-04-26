import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup, Button, InputLabel, FormControlLabel, Switch } from "@mui/material"
import { Textfield } from "../components/Textfield";
import { UserContext } from "src/layouts/dashboard";
import { addAssignment, editAssignment, getAssignmentById } from "src/api/AssignmentApi";
import { getCourseById } from "src/api/coursePageApi";

const initialAssignmentState = {
  assignment_name: '',
  assignment_due_date: '',
  assignment_work_date: '',
  assignment_description: '',
  overdue: false,
  student_number: null,
  course_id: null
};

export const AssignmentEditor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userContext = useContext(UserContext);

  const [assignment, setAssignment] = useState(initialAssignmentState);

  const mergeAccount = delta => setAssignment(prevState => ({ ...prevState, ...delta }));

  const handleSave = (e) => {
    e.preventDefault();
    if (params.assignment_id) {
      editAssignment(params.assignment_id, assignment)
        .then(() => navigate(`/dashboard/courses/${params.course_id}`));
    }
    else {
      addAssignment({
        assignment_name: assignment.assignment_name,
        assignment_due_date: assignment.assignment_due_date,
        assignment_work_date: assignment.assignment_due_date,
        assignment_description: assignment.assignment_description,
        overdue: assignment.overdue,
        student_number: userContext.user.user_id,
        course_id: params.course_id
      }).then(() => navigate(`/dashboard/courses/${params.course_id}`));
    }
  }

  useEffect(() => {
    if (params.assignment_id) {
      console.log(params.assignment_id)
      getAssignmentById(params.assignment_id)
        .then(x => {
          // gets rid of timestamp
          x[0].assignment_due_date = (x[0].assignment_due_date + " ").split('T')[0];
          x[0].assignment_work_date = (x[0].assignment_due_date + " ").split('T')[0];
          setAssignment(...x);
        })
    }
    else {
      setAssignment(prevState => ({
        ...prevState,
        student_number: userContext.user.user_id,
        course_id: params.course_id
      }));
    }
  }, []);

  if (!assignment) {
    return <>Loading...</>;
  }

  return (
    <>
      <form onSubmit={handleSave}>
        <h1 style={{ marginLeft: "2rem" }}>Assignment Editor</h1>
        <FormGroup sx={{ mt: 2, mx: 4 }}>
          <Textfield
            id="assignmentName"
            label="Assignment Name"
            value={assignment.assignment_name}
            setValue={assignment_name => mergeAccount({ assignment_name })}
          />
          <Textfield
            id="description"
            label="Assignment Description"
            value={assignment.assignment_description}
            setValue={assignment_description => mergeAccount({ assignment_description })}
          />
          <Textfield
            autoFocus
            id="dueDate"
            label="Due Date (YYYY-MM-DD)"
            value={assignment.assignment_due_date}
            setValue={assignment_due_date => mergeAccount({ assignment_due_date })}
          />
          <Textfield
            autoFocus
            id="workDate"
            label="Work Date (YYYY-MM-DD)"
            value={assignment.assignment_work_date}
            setValue={assignment_work_date => mergeAccount({ assignment_work_date })}
          />
          <FormControlLabel
            control={
                <Switch checked={assignment.overdue} onChange={() => mergeAccount({ overdue: !assignment.overdue })} name="overdue" />
            }
            label="Assignment Overdue"
        />
          <Button type="submit">
            Submit
          </Button>
          <Button type="button" color="error"
            onClick={() => { navigate(`/dashboard/courses/${params.course_id}`) }}>
            Cancel
          </Button>
        </FormGroup>
      </form>
    </>
  );
}