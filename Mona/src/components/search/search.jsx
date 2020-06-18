import React from 'react';

import SearchInput from './searchInput/searchInput';
import SearchResult from './searchResult/searchResult';
import { DataService } from '../../dataService';

import styles from './search.module.css';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false, // Флаг, который отвечает за отображение/скрытие loader'а, связанного с загрузкой результата поиска
            showResult: false, // Флаг, который отвечает за отображение/скрытие блока с результатами поиска
            inputSearchValue: "",
            searchResult: {
                movies: [],
                users: []
            }
        };

        this.search = this.search.bind(this);
        this.mapUsers = this.mapUsers.bind(this);
        this.hideSearchResult = this.hideSearchResult.bind(this);
        this.inputFocusEventHandler = this.inputFocusEventHandler.bind(this);
    }

    search(event) {
        const { value } = event.target;

        this.setState({ inputSearchValue: value });

        if (value.trim().length === 0) {
            this.setState({
                isLoading: false,
                showResult: false,
                searchResult: {
                    movies: [],
                    users: []
                }
            });

            return;
        }

        if (value.length < 2) { // Для поиска фильма необходимо как минимум 2 символа
            this.setState({
                isLoading: true,
                showResult: false,
                searchResult: {
                    movies: [],
                    users: []
                }
            });

            return;
        }

        this.setState({
            isLoading: true,
            searchResult: {
                movies: [],
                users: []
            }
        });

        let callback = (response) => {
            // Текущий ответ уже не актуален. Значение в поле ввода изменилось и уже ушел новый запрос.
            if (response.TextOfSearchQuery !== this.state.inputSearchValue)
                return;

            this.setState({
                searchResult: {
                    users: this.mapUsers(response.Users),
                    movies: response.Movies
                },
                isLoading: false,
                showResult: true
            });
        };

        DataService.search(value, 3, callback);
    }

    hideSearchResult() {
        this.setState({
            ...this.state,
            showResult: false
        });
    }

    inputFocusEventHandler() {
        // Показываем результаты поиска только если они есть
        if (this.state.searchResult.movies.length === 0 && this.state.searchResult.users.length === 0)
            return;

        this.setState({
            ...this.state,
            showResult: true
        });
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

    render() {
        const { externalClass } = this.props;

        return (
            <div className={`${styles.container} ${externalClass}`}>
                <SearchInput inputValue={this.state.inputSearchValue} handleInputChange={this.search} handleInputBlur={this.hideSearchResult} handleInputFocus={this.inputFocusEventHandler} />
                <SearchResult data={this.state.searchResult} isLoading={this.state.isLoading} show={this.state.showResult} externalClass={styles.searchResultExternal} />
            </div>
        );
    }
}

export default Search;
