import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import SearchUsers from '../searchUsers/searchUsers';
import { DataService } from '../../dataService';

import styles from './followersPage.module.css';

class FollowersPage extends React.Component {
    constructor(props) {
        super(props);

        let isFollowingPage = props.location.pathname.endsWith('following');

        this.state = {
            userId: props.match.params.userId,
            tabNumberActive: isFollowingPage ? 1 : 2, // Номер Tab'а, который активный. 1 - Tab "Подписки", 2 - Tab "Подписчики"
            items: [],
            numberOfRecordsFound: null, // Количество найденных пользователей в подписках/подписчиках при поиске
            isLoading: true,
            handleSearchUsers: isFollowingPage ? this.searchFollowing.bind(this) : this.searchFollowers.bind(this)
        };

        this.getFollowers = this.getFollowers.bind(this);
        this.getFollowing = this.getFollowing.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        this.searchFollowers = this.searchFollowers.bind(this);
        this.searchFollowing = this.searchFollowing.bind(this);
        this.mapUsersCallback = this.mapUsersCallback.bind(this);
    }

    componentDidMount() {
        if (this.state.tabNumberActive === 1)
            this.getFollowing();
        else
            this.getFollowers();
    }

    getFollowers() {
        this.setState({ isLoading: true, items: [] });

        DataService.getFollowers(this.state.userId, this.mapUsersCallback);
    }

    getFollowing() {
        this.setState({ isLoading: true, items: [] });

        DataService.getFollowing(this.state.userId, this.mapUsersCallback);
    }

    searchFollowers(name) {
        this.setState({ isLoading: true, items: [] });

        let callback = (users) => {
            this.mapUsersCallback(users);
            this.setState({ numberOfRecordsFound: items.length });
        };

        DataService.searchFollowers(this.state.userId, name, callback);
    }

    searchFollowing(name) {
        this.setState({ isLoading: true, items: [] });

        let callback = (users) => {
            this.mapUsersCallback(users);
            this.setState({ numberOfRecordsFound: users.length });
        };

        DataService.searchFollowing(this.state.userId, name, callback);
    }

    searchUsers(event) {
        const { value } = event.target;

        if (value.trim().length === 0) {
            if (this.state.tabNumberActive === 1)
                this.getFollowing();
            else
                this.getFollowers();

            return;
        }
        
        this.state.handleSearchUsers(value);
    }

    mapUsersCallback(users){
        let items = users.map(item => ({
            id: item.UserId,
            icon: item.AvatarPath,
            login: item.Login,
            name: item.Name,
            isFollowing: item.IsFollowing
        }));

        this.setState({ items, numberOfRecordsFound: null, isLoading: false });
    }

    clickTab(tabNumber) {
        if (tabNumber === 1)
            this.getFollowing();
        else
            this.getFollowers();

        this.setState({ tabNumberActive: tabNumber });
    }

    render() {
        const { } = this.props;

        let titleBlock = "";

        if (this.state.numberOfRecordsFound !== null)
            titleBlock = <p className={styles.title}>{this.state.numberOfRecordsFound} пользователь найден</p>;
        else if (this.state.tabNumberActive === 1)
            titleBlock = <p className={styles.title}>Всего {this.state.items.length} подписки</p>;
        else
            titleBlock = <p className={styles.title}>Всего {this.state.items.length} подписчика</p>;

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    {titleBlock}
                    <SearchUsers items={this.state.items} isLoading={this.state.isLoading} externalClass={styles.searchUsersExternal} handleInputChange={this.searchUsers} />
                    <div className={styles.tabs}>
                        <a className={`${styles.tabFollowing} ${this.state.tabNumberActive === 1 ? styles.active : ''}`} onClick={this.clickTab.bind(this, 1)}>Подписки</a>
                        <a className={`${styles.tabFollowers} ${this.state.tabNumberActive === 2 ? styles.active : ''}`} onClick={this.clickTab.bind(this, 2)}>Подписчики</a>
                        <span className={styles.yellowBar}></span>
                    </div>
                    <div className={styles.clear}></div>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default FollowersPage;