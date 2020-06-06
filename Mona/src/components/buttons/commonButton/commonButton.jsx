import React from 'react';

function CommonButton(props) {
    return (
        <React.Fragment>
            <button
                style={props.style}
                className={`${props.externalClass} ${"roundedButton"}`}
                onClick={props.onClick}
                type="button">{props.title}
            </button>
        </React.Fragment>);
};

export default CommonButton;
