import React from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import VerticalTabs from '../../verticalTabs/verticalTabs';
import SearchUsersResult from '../searchUsersResult/searchUsersResult';
import SearchMoviesResult from '../searchMoviesResult/searchMoviesResult';
import { DataService } from '../../../dataService';

import styles from './searchPage.module.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: props.match.params.text,
            tabNumberActive: 1, // Номер Tab'а, который активный. 1 - Tab "Фильмы", 2 - Tab "Пользователи"
            movies: [], // Фильмы
            users: [], // Пользователи
            isLoading: true
        };

        this.searchUsers = this.searchUsers.bind(this); // Поиск пользователей
        this.searchMovies = this.searchMovies.bind(this); // Поиск фильмов
        this.clickTab = this.clickTab.bind(this);
        this.mapUsers = this.mapUsers.bind(this);
    }

    componentDidMount() {
        if (this.state.tabNumberActive === 1)
            this.searchMovies(this.state.searchText);
        else
            this.searchUsers(this.state.searchText);
    }

    componentWillReceiveProps(nextProps) {
        // Если выполнили поиск и нажали посмотреть все результаты, находясь на странице результатов поиска, то необходимо обновить страницу
        if (this.state.searchText !== nextProps.match.params.text) {
            window.location.reload();
            window.scrollTo(0, 0);
        }
    }

    searchMovies(text) {
        this.setState({ movies: [], isLoading: true });

        let callback = (movies) => {
            this.setState({ movies, isLoading: false });
        };

        DataService.searchMovies(text, callback);
    }

    searchUsers(text) {
        this.setState({ users: [], isLoading: true });

        let callback = (response) => {
            let users = this.mapUsers(response);
            this.setState({ users: users, isLoading: false });
        };

        DataService.searchUsers(text, callback);
    }

    mapUsers(response) {
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
        // При смене tab'а загружаем данные, если они не были загружены

        if (tabNumber === 1 && this.state.movies.length === 0) {
            this.searchMovies(this.state.searchText);
        }
        else if (tabNumber === 2 && this.state.users.length === 0) {
            this.searchUsers(this.state.searchText);
        }

        this.setState({ tabNumberActive: tabNumber });
    }

    render() {
        const { location } = this.props;

        let titleBlock = "";

        if (this.state.isLoading === true) {
            titleBlock = <p className={styles.title}>Поиск...</p>;
        }
        else {
            if (this.state.tabNumberActive === 1)
                titleBlock = <p className={styles.title}>Найдено {this.state.movies.length} фильма по запросу "{this.state.searchText}"</p>;
            else
                titleBlock = <p className={styles.title}>Найдено {this.state.users.length} пользователя по запросу "{this.state.searchText}"</p>;
        }

        let notFoundBlock = "";

        if (!this.state.isLoading) {
            if (this.state.tabNumberActive === 1 && this.state.movies.length === 0)
                notFoundBlock = <p className={styles.usersNotFound}>Фильмов с таким названием не найдено</p>;
            else if (this.state.tabNumberActive === 2 && this.state.users.length === 0) 
                notFoundBlock = <p className={styles.usersNotFound}>Пользователей с таким именем/ником не найдено</p>;
        }

        let searchResult = "";

        if (this.state.tabNumberActive === 1)
            searchResult = <SearchMoviesResult isLoading={this.state.isLoading} movies={this.state.movies} />;
        else
            searchResult = <SearchUsersResult isLoading={this.state.isLoading} users={this.state.users} />;

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    {titleBlock}

                    <div className={styles.searchResult}>                       
                        {searchResult}
                        {notFoundBlock}
                    </div>

                    <VerticalTabs tabNumberActive={this.state.tabNumberActive} clickTab={this.clickTab} tabs={['Фильмы', 'Пользователи']} externalClass={styles.tabsExternal} />

                    <div className={styles.clear}></div>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default SearchPage;