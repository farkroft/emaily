// SurveyField contains logic to render a single
// label and text input
import React from 'react';
// if you want to use material ui
// import { TextField } from '@material-ui/core';

export default ({input, label, meta: { error, touched, active }}) => {
    return (
        <div className="row">
            <div className="field">
                {/* onBlur={input.onBlur} onChange={input.onChange} replace with ...input instead*/}
                <label>{label}</label>
                <input {...input} style={{ marginBottom: '5px' }} />
                <div className="red-text" stye={{ marginBottom: '20px' }}>
                    {!active && touched && error}
                </div>
            </div>
        </div>
        // <div className="row">
        //     <TextField
        //     label={label}
        //     //   margin="dense"
        //     style={{ width: "100%" }}
        //     />
        // </div>
    );
}; 