import React from 'react';
import styles from './postsFeed.module.css';

const PostsFeed = ({ externalClass = "", children }) => (
    <section className={`${styles.container} ${externalClass}`}>
        {children}
    </section>
);

export default PostsFeed;