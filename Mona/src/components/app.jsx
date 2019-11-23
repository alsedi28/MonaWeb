import React from 'react'
import Header from './header'
import PostsFeed from './postsFeed'
import Post from './post'

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <PostsFeed externalClass="posts-feed-external">
                    <Post externalClass="post-external" />
                </PostsFeed>
            </React.Fragment>
        );
    }
};