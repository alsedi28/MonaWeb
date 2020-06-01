import React, { useRef, useEffect } from 'react';

import styles from './postDetailsInputField.module.css';

function PostDetailsInputField(props) {
    const textareaRef = useRef(null);

    useEffect(() => {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight + 1;
            if (scrollHeight < 16) {
                textareaRef.current.style.height = "16px";
            } else {
                textareaRef.current.style.height = scrollHeight + "px";
            }
    }, [props.value]);

    let trimmedValue = props.value.trim();
    const isDisabled = !(trimmedValue.length > 0);

    return (
        <div className={styles.inputFieldContainer}>
            <textarea
                ref={textareaRef}
                aria-label="Комментарий…"
                placeholder="Комментарий…"
                name="inputComment"
                className={styles.textArea}
                autocomplete="off"
                autocorrect="off"
                value={props.value}
                onChange={props.handleChange}
            />
            <button className={styles.sendButton} disabled={isDisabled} type="submit" onClick={props.handleClick}>Опубликовать</button>
        </div>
    );
}

export default PostDetailsInputField;
