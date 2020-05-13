import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';

const PostsFeedPage = ({ isLoading, posts, hasMorePosts, getPosts}) => (
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
);

export default PostsFeedPage;