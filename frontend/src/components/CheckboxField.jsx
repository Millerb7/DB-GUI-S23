import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControlLabel, InputLabel } from "@mui/material";

export const CheckboxField = ({ id, label, checked, setChecked }) => {
    return <>
        <FormControlLabel control={
            <Checkbox id={id} defaultValue={false} checked={checked}
                onChange={event => setChecked(event.target.checked)} />}
                label={label} />
    </>;
}