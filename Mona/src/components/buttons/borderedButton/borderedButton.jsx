import React from 'react';

import styles from './borderedButton.module.css';

import CommonButton from '../commonButton/commonButton';

function BorderedButton(props) {
    return (
        <CommonButton
            externalClass={styles.borderedButton}
            title={props.title}
            isDisabled={props.isDisabled}
            onClick={props.onClick}
        />
    );
};

export default BorderedButton;
