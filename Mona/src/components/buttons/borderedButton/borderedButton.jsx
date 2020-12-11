import React from 'react';

import CommonButton from '../commonButton/commonButton';

import styles from './borderedButton.module.css';

function BorderedButton(props) {
    return (
        <CommonButton
            externalClass={styles.borderedButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
}

export default BorderedButton;