// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({input, label, meta: { error, touched, active }}) => {
    return (
        <div className="field">
            {/* onBlur={input.onBlur} onChange={input.onChange} replace with ...input instead*/}
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" stye={{ marginBottom: '20px' }}>
                {!active && touched && error}
            </div>
        </div>
    );
}; 