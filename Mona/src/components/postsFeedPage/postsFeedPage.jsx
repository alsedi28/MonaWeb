import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import Header from '../header/header';
import Footer from '../footer/footer';
import HeaderFeedTabs from '../headerFeedTabs/headerFeedTabs';

import styles from './postsFeedPage.module.css';

const PostsFeedPage = ({ feed, feedPopular, getPosts, getPopularPosts, ...props }) => {

    const [showMainTab, setShowMainTab] = useState(true);

    function clickTab(showMainTab) {
        setShowMainTab(showMainTab);

        // ѕрокручиваем страницу в самое начало
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            <Header externalClass={`header-external ${styles.headerFeed}`} location={props.location.pathname}>
                <HeaderFeedTabs clickTabFeed={() => clickTab(true)} clickTabFeedPopular={() => clickTab(false)}/>
            </Header>
            <PostsFeed externalClass={`posts-feed-external ${showMainTab ? styles.showExternal : styles.hideExternal}`}>
                <Loader show={feed.isLoading} externalClass={styles.loader}/>
                <InfiniteScroll
                    dataLength={feed.posts.length}
                    next={getPosts}
                    hasMore={feed.hasMore}
                    loader={<Loader />}
                >
                    {feed.posts.map(post => <Post post={post} externalClass="post-external" />)}
                </InfiniteScroll>
            </PostsFeed>
            <PostsFeed externalClass={`posts-feed-external ${!showMainTab ? styles.showExternal : styles.hideExternal}`}>
                <Loader show={feedPopular.isLoading} externalClass={styles.loader}/>
                <InfiniteScroll
                    dataLength={feedPopular.posts.length}
                    next={getPopularPosts}
                    hasMore={feedPopular.hasMore}
                    loader={<Loader />}
                >
                    {feedPopular.posts.map(post => <Post post={post} externalClass="post-external" />)}
                </InfiniteScroll>
            </PostsFeed>
            <Footer externalClass="footer-external" />
        </React.Fragment>
    );
};

export default PostsFeedPage;