import React from 'react';
import Header from './header/header';
import PostsFeed from './postsFeed/postsFeed';
import Post from './post/post';

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header externalClass="header-external"/>
                <PostsFeed externalClass="posts-feed-external">
                    <Post externalClass="post-external" />
                </PostsFeed>
            </React.Fragment>
        );
    }
}