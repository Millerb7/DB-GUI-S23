import { InputLabel, TextField } from "@mui/material";

export const Textfield = ({id, label, value, setValue, isFocused}) => {

    return <>
    <InputLabel htmlFor={ id }>{label}</InputLabel>
        <TextField sx={{mb: 3 }}
            id={id} name={label}
            value={value} 
            onChange={event => setValue(event.target.value)}>
        </TextField>
    </>;
}