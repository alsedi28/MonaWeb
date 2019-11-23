import React from 'react'

const Post = ({ externalClass = "" }) => (
    <article className={`post-block ${externalClass}`}>
    </article>
);

export default Post;