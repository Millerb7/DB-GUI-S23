import { InputLabel, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export const Textfield = ({id, label, value, setValue, isFocused}) => {
    const refInput = useRef();

    useEffect(() => {
        if(isFocused) {
            refInput.current.focus();
        }
    }, [ isFocused ]);

    return <>
    <InputLabel htmlFor={ id }>{label}</InputLabel>
        <TextField sx={{mb: 3 }}
            id={id} name={label}
            value={value} 
            onChange={event => setValue(event.target.value)}>
        </TextField>
    </>;
}