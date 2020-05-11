import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from './header/header';
import Footer from './footer/footer';
import PostsFeed from './postsFeed/postsFeed';
import Post from './post/post';
import Loader from './loader/loader';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            hasMore: false,
            lastPostItemId: 0,
            isLoading: true
        };

        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        let url = "http://monamobileapp.ru/MovieMe/api/v2/users/eventfeed?start=" + this.state.lastPostItemId;

        fetch(url, {
            headers: {
                Authorization: 'Bearer wyM6dnoLJlcUbcPt6k6DQde3S9N9gQQDd1G-QCwmW7KuU6ibXFw7HOJZvODnFr00xxam6VOtXSguI4M54-xEaA70LBBVd3LBpsD8AKcflA-uzGo7Pv9F74JsSRtNVwywBjr1T9kzIymr6Wc-bUxMvuQur7EBRm1HUr6MtR-Ij9DiyAiUpsfmbMyaQ-3dXl3SV0hp7I2prCs94c0vv8rVL9sXo5T9LkrEf1MoHuj-yno1ohvDDzX9LPWNp7j74UgLXXL66atgX-bTUo2U4fqPTP_O1LrAJNtQ9-6k9r-aLdy-k30KsSw8S1V41NSX5xUHM1WJCub_7NL4IV3ac5oMT0O57XQ8_SUQoUDNNcBuTTvf3DctEPjhpicTz40IFArjoR5uyKGr7ust2xksQr9nNafsyjO71aYHlrBBxZ4HEGm0eONVJU2We8BzCLPpdWsZPgW7RwEppnm5KIdeOIscUJFIW1vRseBGJ1TZV4XBAGQcfykWHn4toXwLgWkjLlhP',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(items => {
            if (items.length === 0) {
                this.setState({ hasMore: false, isLoading: false });
                return;
            }

            this.setState({
                lastPostItemId: items[items.length - 1].EventId,
                posts: this.state.posts.concat(items),
                hasMore: true,
                isLoading: false
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header externalClass="header-external"/>
                <PostsFeed externalClass="posts-feed-external">
                    <Loader show={this.state.isLoading} />
                    <InfiniteScroll
                        dataLength={this.state.posts.length}
                        next={this.getPosts}
                        hasMore={this.state.hasMore}
                        loader={<Loader />}
                    >
                        {this.state.posts.map(post => <Post post={post} externalClass="post-external" />)}
                    </InfiniteScroll>
                </PostsFeed>
                <Footer externalClass="footer-external"/>
            </React.Fragment>
        );
    }
}