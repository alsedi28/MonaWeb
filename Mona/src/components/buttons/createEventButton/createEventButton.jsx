import React from 'react';

import FilledButton from '../filledButton/filledButton';

import styles from './createEventButton.module.css';

function CreateEventButton(props) {
    return (
        <FilledButton
            externalClass={styles.createEventButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
}

export default CreateEventButton;
