import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import Header from '../header/header';
import Footer from '../footer/footer';

const PostsFeedPage = ({ isLoading, posts, hasMorePosts, getPosts, ...props }) => (
    <React.Fragment>
        <Header externalClass="header-external" location={props.location.pathname}/>
        <PostsFeed externalClass="posts-feed-external">
            <Loader show={isLoading} />
            <InfiniteScroll
                dataLength={posts.length}
                next={getPosts}
                hasMore={hasMorePosts}
                loader={<Loader />}
            >
                {posts.map(post => <Post post={post} externalClass="post-external" />)}
            </InfiniteScroll>
        </PostsFeed>
        <Footer externalClass="footer-external" />
    </React.Fragment>
);

export default PostsFeedPage;