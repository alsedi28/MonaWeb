import React from 'react';

import styles from './eventPublicityStatus.module.css';

function EventPublicityStatus(props) {
    return (
        <div className={styles.publicSettingContainer}>
            <p>Поделиться с подписчиками?</p>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    id="checkbox"
                    name="isEventPublic"
                    checked={props.checked}
                    onChange={props.onChange}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
        </div>
    );
}

export default EventPublicityStatus;
