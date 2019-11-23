import React from 'react'

const PostsFeed = ({ externalClass = "", children }) => (
    <section className={`section-block ${externalClass}`}>
        {children}
    </section>
);

export default PostsFeed;