import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import styles from './modalDialogBackground.module.css';

const ModalDialogBackground = ({ show, children, clickClose = () => ({}) }) => {

    function clickBackground(event) {
        const target = event.target;

        if (target.closest(".dialog-ev")) {
            event.stopPropagation();
            return;
        }

        clickClose();
    }

    return (
        <RemoveScroll enabled={show}>
            <div className={`${styles.background}`} style={{ display: show ? "flex" : "none" }} onClick={clickBackground}>
                {children}
            </div>
        </RemoveScroll>
    );
};

export default ModalDialogBackground;
