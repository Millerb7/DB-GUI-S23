import { Checkbox, FormControlLabel} from "@mui/material";

export const CheckboxField = ({ id, label, checked, setChecked }) => {
    return <>
        <FormControlLabel control={
            <Checkbox id={id} defaultValue={false} checked={Boolean(checked)}
                onChange={event => setChecked(event.target.checked)} />}
                label={label} />
    </>;
}