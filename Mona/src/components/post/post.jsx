import React from 'react';
import styles from './post.module.css';

const Post = ({ externalClass = "" }) => (
    <article className={`${styles.container} ${externalClass}`}>
    </article>
);

export default Post;