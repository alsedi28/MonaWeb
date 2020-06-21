import React from 'react';

import styles from './formButton.module.css';

import FilledButton from '../filledButton/filledButton';

function FormButton(props) {
    return (
        <FilledButton
            externalClass={styles.formButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
};

export default FormButton;
