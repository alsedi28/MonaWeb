import React from 'react';

import CommonButton from '../commonButton/commonButton';

import styles from './filledButton.module.css';

function FilledButton(props) {
    return (
        <CommonButton
            externalClass={`${styles.filledButton} ${props.externalClass}`}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
}

export default FilledButton;
