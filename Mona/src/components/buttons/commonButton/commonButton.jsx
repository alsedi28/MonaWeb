import React from 'react';

import styles from './commonButton.module.css';

function CommonButton(props) {
    return (
        <button
            disabled={props.isDisabled}
            className={`${props.externalClass} ${styles.roundedButton}`}
            onClick={props.onClick}
            type="button">{props.title}
        </button>
    );
};

export default CommonButton;
