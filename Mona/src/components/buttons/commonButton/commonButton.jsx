import React from 'react';

function CommonButton(props) {
    return (
        <button
            disabled={props.isDisabled}
            className={`${props.externalClass} ${props.secondaryExternalClass} roundedButton`}
            onClick={props.onClick}
            type="button">{props.title}
        </button>
    );
};

export default CommonButton;
