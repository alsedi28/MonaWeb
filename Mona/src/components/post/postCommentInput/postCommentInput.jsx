import React, { useRef, useEffect } from 'react';

import styles from './postCommentInput.module.css';

function PostCommentInput(props) {
    const textareaRef = useRef(null);

    useEffect(() => {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight + 2;
            textareaRef.current.style.height = scrollHeight + "px";
    }, [props.value]);

    let trimmedValue = props.value.trim();
    const isDisabled = !(trimmedValue.length > 0);

    return (
        <div className={`${styles.container} ${props.externalClass}`}>
            <textarea
                ref={textareaRef}
                aria-label="Напишите комментарий…"
                placeholder="Напишите комментарий…"
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

export default PostCommentInput;
