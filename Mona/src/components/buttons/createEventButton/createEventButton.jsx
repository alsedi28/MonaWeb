import React from 'react';

import styles from './createEventButton.module.css';

import FilledButton from '../filledButton/filledButton';

function CreateEventButton(props) {
    return (
        <FilledButton
            externalClass={styles.createEventButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
};

export default CreateEventButton;
