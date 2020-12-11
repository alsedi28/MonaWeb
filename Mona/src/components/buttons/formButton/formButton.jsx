import React from 'react';

import FilledButton from '../filledButton/filledButton';

import styles from './formButton.module.css';

function FormButton(props) {
    return (
        <FilledButton
            externalClass={styles.formButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
}

export default FormButton;
