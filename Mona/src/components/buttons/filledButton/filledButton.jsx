import React from 'react';

import styles from './filledButton.module.css';

import CommonButton from '../commonButton/commonButton';

function FilledButton(props) {
    return (
        <CommonButton
            externalClass={`${styles.filledButton} ${props.externalClass}`}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
};

export default FilledButton;
