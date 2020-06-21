import React from 'react';

import styles from './closeButton.module.css';

function CloseButton(props) {
    return (
        <span className={styles.close} onClick={props.onClick}>&times;</span>
    );
};

export default CloseButton;
