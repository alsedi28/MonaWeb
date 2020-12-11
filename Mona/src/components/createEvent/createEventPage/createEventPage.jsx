import React from 'react';

import styles from './createEventPage.module.css';

import Header from '../../header/header';
import FollowersSearchInput from '../../followersPage/followersSearchInput/followersSearchInput';
import MovieForEventSearchResult from './movieForEventSearchResult/movieForEventSearchResult';
import PostWillWatchContent from '../postWillWatch/postWillWatchContent/postWillWatchContent';
import PostWatchedContent from '../postWatched/postWatchedContent/postWatchedContent';

import { DataService } from '../../../dataService';
import Constants from '../../../constants';
import { getEmptyMovieInfo, getMovieInfoFromMovie } from '../../../helpers/movieInfoHelper';
import { debounce } from '../../../helpers/debounce';

class CreateEventPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            movies: [], // список найденых фильмов
            eventType: Constants.MOVIE_WATCHED_EVENT_TYPE,
            selectedMovie: null,
            rating: 0, // выбранный рейтинг для фильма
            inputComment: "", // комментарий для события
            isEventPublic: true, // флаг сделать ли событие видимым для всех
            selectedTags: [], // выбранные теги (их id)
            tags: [], // все теги
            inputSearchValue: "" // поисковый запрос фильма
        };

        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleEventCreateAction = this.handleEventCreateAction.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleTagSelectionChange = this.handleTagSelectionChange.bind(this);
        this.handleClickOnMovie = this.handleClickOnMovie.bind(this);
        this.handleClickOnEventType = this.handleClickOnEventType.bind(this); // Смена типа события
        this.fetchMoviesWithQuery = debounce(this.fetchMoviesWithQuery, 300); // Запрос поиска фильмов с задержкой 0.3 секунды
    }

    componentDidMount() {
        const callback = (tags) => {
            this.setState({
                ...this.state,
                tags: tags
            });
        };

        DataService.getMovieTags(callback);
    }

    handleChangeData(name, value) {
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    handleEventCreateAction(eventType) {
        const callback = _ => {
            this.setState({
                isLoading: false,
                movies: [],
                eventType: Constants.MOVIE_WATCHED_EVENT_TYPE,
                selectedMovie: null,
                rating: 0,
                inputComment: "",
                isEventPublic: true,
                selectedTags: [],
                inputSearchValue: ""
            });
        };

        const movieId = this.state.selectedMovie.MovieId;

        switch(eventType) {
            case Constants.MOVIE_WATCHED_EVENT_TYPE:
                if (this.state.isEventPublic) {
                    DataService.createEvent(movieId, this.state.inputComment, this.state.rating, eventType, this.state.selectedTags, callback);
                } else {
                    DataService.addMovieToViewed(movieId, this.state.rating, callback);
                }
                break;
            case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                if (this.state.isEventPublic) {
                    DataService.createEvent(movieId, this.state.inputComment, 0, eventType, [], callback);
                } else {
                    DataService.addMovieToWillWatch(movieId, callback);
                }
                break;
            default:
                break;
        }
    }

    handleRatingChange(newRating) {
        this.setState({
            ...this.state,
            rating: newRating
        });
    }

    handleTagSelectionChange(selectedTag) {
        let currentlySelectedTags = this.state.selectedTags;

        const index = currentlySelectedTags.indexOf(selectedTag);

        if (index === -1)
            currentlySelectedTags.push(selectedTag);
        else
            currentlySelectedTags.splice(index, 1);

        this.setState({
            ...this.state,
            selectedTags: currentlySelectedTags
        });
    }

    getSelectionStyle(tagId) {
        if (this.state.selectedTags.indexOf(tagId) > -1)
            return { backgroundColor: 'rgb(255, 86, 26)', color: 'white' };
        else
            return { backgroundColor: 'white', color: 'rgb(49, 54, 60)' };
    }

    handleSearchMovies(event) {
        const { value } = event.target;

        this.setState({ inputSearchValue: value });

        if (value.trim().length <= 1)
            return;

        this.fetchMoviesWithQuery(value);
    }

    fetchMoviesWithQuery(query) {
        this.setState({ movies: [], isLoading: true });

        const callback = (movies) => {
            this.setState({ movies, isLoading: false });
        };

        DataService.searchMovies(query, callback);
    }

    handleClickOnMovie(movie) {
        this.setState({ selectedMovie: movie });
    }

    handleClickOnEventType(eventType) {
        this.setState({ eventType: eventType });
    }

    render() {
        const searchFieldId = "MovieForEventSearchField";
        const showSearchResults = document.activeElement.id === searchFieldId;

        const movieInfo = this.state.selectedMovie !== null ? getMovieInfoFromMovie(this.state.selectedMovie) : getEmptyMovieInfo();

        let contentBlock = "";

        switch(this.state.eventType) {
            case Constants.MOVIE_WATCHED_EVENT_TYPE:
                contentBlock = <PostWatchedContent
                    isModal={false}
                    isPublic={this.state.isEventPublic}
                    comment={this.state.inputComment}
                    selectedRating={this.state.rating}
                    selectedTags={this.state.selectedTags}
                    tags={this.state.tags}
                    onTagSelect={this.handleTagSelectionChange}
                    handleChange={this.handleChangeData}
                    movieInfo={movieInfo}
                    handleRatingChange={this.handleRatingChange}
                    onEventCreate={this.handleEventCreateAction}
                    eventType={this.state.eventType}
                    handleClickOnEventType={this.handleClickOnEventType}
                />
                break;
            case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                contentBlock = <PostWillWatchContent
                    isModal={false}
                    movieInfo={movieInfo}
                    isPublic={this.state.isEventPublic}
                    comment={this.state.inputComment}
                    handleChange={this.handleChangeData}
                    onEventCreate={this.handleEventCreateAction}
                    eventType={this.state.eventType}
                    handleClickOnEventType={this.handleClickOnEventType}
                />
                break;
            default:
                break;
        }

        return (
            <React.Fragment>
                <Header externalClass="header-external" />
                <article className={styles.contentContainer}>

                    <FollowersSearchInput
                        id={searchFieldId}
                        inputValue={this.state.inputSearchValue}
                        handleInputChange={this.handleSearchMovies.bind(this)}
                    />

                    <MovieForEventSearchResult
                        movies={this.state.movies}
                        isLoading={this.state.isLoading}
                        show={showSearchResults}
                        searchText={this.state.inputSearchValue}
                        handleClickOnMovie={this.handleClickOnMovie} />

                    {contentBlock}

                </article>
            </React.Fragment>
        );
    }
}

export default CreateEventPage;
