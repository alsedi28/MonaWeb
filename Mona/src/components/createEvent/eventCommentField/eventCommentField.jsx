import React from 'react';

import styles from './eventCommentField.module.css';

function EventCommentField(props) {

    let displayCommentBlock = { display: props.isPublic ? "block" : "none" }

    return (
        <div className={styles.inputField} style={displayCommentBlock}>
            <textarea
                aria-label={props.placeholder}
                placeholder={props.placeholder}
                name="inputComment"
                className={styles.textArea}
                autocomplete="off"
                autocorrect="off"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default EventCommentField;
