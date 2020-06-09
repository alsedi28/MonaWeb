import React from 'react';

function CommonButton(props) {
    return (
        <button
            style={props.style}
            disabled={props.isDisabled}
            className={`${props.externalClass} roundedButton`}
            onClick={props.onClick}
            type="button">{props.title}
        </button>
    );
};

export default CommonButton;
