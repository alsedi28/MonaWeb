import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import SearchInput from '../searchInput/searchInput';
import SearchUsersResult from '../searchUsersResult/searchUsersResult';
import { DataService } from '../../dataService';

import styles from './followersPage.module.css';

class FollowersPage extends React.Component {
    constructor(props) {
        super(props);

        let isFollowingPage = props.location.pathname.endsWith('following');

        this.state = {
            userId: props.match.params.userId,
            tabNumberActive: isFollowingPage ? 1 : 2, // Номер Tab'а, который активный. 1 - Tab "Подписки", 2 - Tab "Подписчики"
            users: [], // Пользователи из подписок/подписчиков
            globalUsers: [], // Пользователи при глобальном поиске в приложении
            numberOfRecordsFound: null, // Количество найденных пользователей в подписках/подписчиках при поиске (null - если не было поиска по имени)
            isLoading: true,
            inputSearchValue: "",
            handleSearchUsers: isFollowingPage ? this.searchFollowing.bind(this) : this.searchFollowers.bind(this)
        };

        this.getFollowers = this.getFollowers.bind(this);
        this.getFollowing = this.getFollowing.bind(this);
        this.searchUsers = this.searchUsers.bind(this); // Обёртка над поиском подписок/подписчиков
        this.searchUsersGlobal = this.searchUsersGlobal.bind(this); // Поиск среди всех пользователей приложения
        this.searchFollowers = this.searchFollowers.bind(this);
        this.searchFollowing = this.searchFollowing.bind(this);
        this.mapUsers = this.mapUsers.bind(this);
    }

    componentDidMount() {
        if (this.state.tabNumberActive === 1)
            this.getFollowing();
        else
            this.getFollowers();
    }

    getFollowers() {
        this.setState({ isLoading: true, users: [] });

        let callback = (response) => {
            let users = this.mapUsers(response);
            this.setState({ users, globalUsers: [], numberOfRecordsFound: null, isLoading: false });
        };

        DataService.getFollowers(this.state.userId, callback);
    }

    getFollowing() {
        this.setState({ isLoading: true, users: [] });

        let callback = (response) => {
            let users = this.mapUsers(response);
            this.setState({ users, globalUsers: [], numberOfRecordsFound: null, isLoading: false });
        };

        DataService.getFollowing(this.state.userId, callback);
    }

    searchFollowers(name) {
        this.setState({ isLoading: true, users: [] });

        let callback = (response) => {
            let users = this.mapUsers(response);

            let stateIsLoading = false;

            this.setState({ globalUsers: [] });

            if (users.length === 0) {
                this.searchUsersGlobal(name);

                stateIsLoading = true;
            }

            this.setState({ users, numberOfRecordsFound: users.length, isLoading: stateIsLoading });
        };

        DataService.searchFollowers(this.state.userId, name, callback);
    }

    searchFollowing(name) {
        this.setState({ isLoading: true, users: [] });

        let callback = (response) => {
            let users = this.mapUsers(response);

            let stateIsLoading = false;

            this.setState({ globalUsers: [] });

            if (users.length === 0) {
                this.searchUsersGlobal(name);

                stateIsLoading = true;
            }

            this.setState({ users, numberOfRecordsFound: users.length, isLoading: stateIsLoading });
        };

        DataService.searchFollowing(this.state.userId, name, callback);
    }

    searchUsers(event) {
        const { value } = event.target;

        this.setState({ inputSearchValue: value });

        if (value.trim().length === 0) {
            if (this.state.tabNumberActive === 1)
                this.getFollowing();
            else
                this.getFollowers();

            return;
        }
        
        this.state.handleSearchUsers(value);
    }

    searchUsersGlobal(name) {
        let callback = (response) => {
            let users = this.mapUsers(response);
            this.setState({ globalUsers: users, isLoading: false });
        };

        DataService.searchUsers(name, callback);
    }

    mapUsers(response){
        let users = response.map(user => ({
            id: user.UserId,
            icon: user.AvatarPath,
            login: user.Login,
            name: user.Name,
            isFollowing: user.IsFollowing
        }));

        return users;
    }

    clickTab(tabNumber) {
        let handleSearch = null;

        // Очищаем поле ввода поиска
        this.setState({ inputSearchValue: "" });

        // При смене tab'а загружаем полный список подписок/подписчиков
        if (tabNumber === 1) {
            this.getFollowing();
            handleSearch = this.searchFollowing.bind(this);
        }
        else {
            this.getFollowers();
            handleSearch = this.searchFollowers.bind(this);
        }

        this.setState({ tabNumberActive: tabNumber, handleSearchUsers: handleSearch });
    }

    render() {
        const { location } = this.props;

        let titleBlock = "";

        if (this.state.numberOfRecordsFound !== null) {
            if (this.state.numberOfRecordsFound === 0) {
                if (this.state.tabNumberActive === 1)
                    titleBlock = <p className={styles.title}>0 подписок найдено</p>;
                else
                    titleBlock = <p className={styles.title}>0 подписчиков найдено</p>;
            }
            else
                titleBlock = <p className={styles.title}>{this.state.numberOfRecordsFound} пользователь найден</p>;
        }
        else if (this.state.tabNumberActive === 1)
            titleBlock = <p className={styles.title}>Всего {this.state.users.length} подписки</p>;
        else
            titleBlock = <p className={styles.title}>Всего {this.state.users.length} подписчика</p>;

        let usersNotFoundBlock = "";

        if (this.state.users.length === 0 && !this.state.isLoading && this.state.inputSearchValue.trim().length !== 0) {
            let tabName = this.state.tabNumberActive === 1 ? "подписках" : "подписчиках";
            usersNotFoundBlock = <p className={styles.usersNotFound}>Пользователей с таким именем/ником в ваших {tabName} не найдено</p>;
        }

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    {titleBlock}

                    <div className={styles.searchUsers}>
                        <SearchInput inputValue={this.state.inputSearchValue} handleInputChange={this.searchUsers} />
                        <SearchUsersResult isLoading={this.state.isLoading} users={this.state.users} />
                        {usersNotFoundBlock}
                    </div>

                    <div className={styles.tabs}>
                        <a className={`${styles.tabFollowing} ${this.state.tabNumberActive === 1 ? styles.active : ''}`} onClick={this.clickTab.bind(this, 1)}>Подписки</a>
                        <a className={`${styles.tabFollowers} ${this.state.tabNumberActive === 2 ? styles.active : ''}`} onClick={this.clickTab.bind(this, 2)}>Подписчики</a>
                        <span className={styles.yellowBar}></span>
                    </div>
                    <div className={styles.clear}></div>

                    {this.state.globalUsers.length > 0 && <p className={styles.title}>Другие пользователи</p>}

                    <SearchUsersResult isLoading={false} users={this.state.globalUsers} externalClass={styles.searchGlobalUsersResultExternal} />
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default FollowersPage;