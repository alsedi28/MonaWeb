import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import Header from '../header/header';
import Footer from '../footer/footer';
import HorizontalTabs from '../horizontalTabs/horizontalTabs';

import styles from './postsFeedPage.module.css';

const PostsFeedPage = ({ feed, feedPopular, getPosts, getPopularPosts, ...props }) => {

    const [tabNumberActive, setTabNumberActive] = useState(1);

    const tabSettings = [
        {
            Title: "Подписки",
            Width: 120,
            Offset: 0
        },
        {
            Title: "Популярные",
            Width: 135,
            Offset: 119
        }
    ];

    function clickTab(tab) {
        setTabNumberActive(tab);

        // Прокручиваем страницу в самое начало
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            <Header externalClass={`header-external ${styles.headerFeed}`} location={props.location.pathname}>
                <HorizontalTabs tabsSettings={tabSettings} tabNumberActive={tabNumberActive} clickTab={clickTab} externalClass={styles.tabsExternal} />
            </Header>
            <PostsFeed externalClass={`posts-feed-external ${tabNumberActive === 1 ? styles.showExternal : styles.hideExternal}`}>
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
            <PostsFeed externalClass={`posts-feed-external ${tabNumberActive === 2 ? styles.showExternal : styles.hideExternal}`}>
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