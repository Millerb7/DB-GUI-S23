import { useEffect, useRef } from "react";

export const Textfield = ({id, label, value, setValue, isFocused}) => {
    const refInput = useRef();

    useEffect(() => {
        if(isFocused) {
            refInput.current.focus();
        }
    }, [ isFocused ]);

    return <>
        <div className="form-group mb-3">
            <label htmlFor={ id }>{label}</label>
            <input id={id} name={id}
                className="form-control"
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
                ref={refInput} />
        </div>
    </>;
}