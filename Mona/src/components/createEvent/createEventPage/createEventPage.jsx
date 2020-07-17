import React from 'react';

import styles from './createEventPage.module.css';

import Header from '../../header/header';
import CreateEventButton from '../../buttons/createEventButton/createEventButton';
import EventCommentField from '../eventCommentField/eventCommentField';
import EventPublicityStatus from '../eventPublicityStatus/eventPublicityStatus';
import MovieEventHeader from '../movieEventHeader/movieEventHeader';
import MovieRatingSelection from '../movieRatingSelection/movieRatingSelection';
import FollowersSearchInput from '../../followersPage/followersSearchInput/followersSearchInput';
import MovieForEventSearchResult from './movieForEventSearchResult/movieForEventSearchResult';

import { DataService } from '../../../dataService';
import Constants from '../../../constants';
import { getEmptyMovieInfo, getMovieInfoFromMovie } from '../../../helpers/movieInfoHelper';

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
        this.searchMovies = this.searchMovies.bind(this); // Поиск фильмов
        this.handleClickOnMovie = this.handleClickOnMovie.bind(this);
    }

    componentDidMount() {
        let callback = (tags) => {
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
        let callback = _ => {
            this.props.handlerExternal();

            switch(eventType) {
                case Constants.MOVIE_WATCHED_EVENT_TYPE:
                    this.hideWatched();
                    this.setState({
                        watched: {
                            rating: 0,
                            inputComment: "",
                            isEventPublic: true,
                            selectedTags: []
                        }
                    });
                    break;
                case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                    this.hideWillWatch();
                    this.setState({
                        willWatch: {
                            inputComment: "",
                            isEventPublic: true
                        }
                    });
                    break;
                default:
                    break;
            }
        };

        let movieId = this.props.movieInfo.movieId;

        switch(eventType) {
            case Constants.MOVIE_WATCHED_EVENT_TYPE:
                if (this.state.watched.isEventPublic) {
                    console.error(movieId, this.state.inputComment, this.state.watched.rating, eventType, this.state.selectedTags);
                    DataService.createEvent(movieId, this.state.inputComment, this.state.watched.rating, eventType, this.state.selectedTags, callback);
                } else {
                    DataService.addMovieToViewed(movieId, this.state.rating, callback);
                }
                break;
            case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                if (this.state.willWatch.isEventPublic) {
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

        if (index === -1) {
            currentlySelectedTags.push(selectedTag)
        } else {
            currentlySelectedTags.splice(index, 1);
        }

        this.setState({
            ...this.state,
            selectedTags: currentlySelectedTags
        });
    }

    getSelectionStyle(tagId) {
        if (this.state.selectedTags.indexOf(tagId) > -1) {
            return { backgroundColor: 'rgb(255, 86, 26)', color: 'white' };
        } else {
            return { backgroundColor: 'white', color: 'rgb(49, 54, 60)' };
        }
    }

    searchMovies(event) {
        const { value } = event.target;

        this.setState({ inputSearchValue: value });

        if (value.trim().length <= 1) {
            return;
        }

        this.setState({ movies: [], isLoading: true });

        let callback = (movies) => {
            this.setState({ movies, isLoading: false });
        };

        DataService.searchMovies(value, callback);
    }

    handleClickOnMovie(movie) {
        this.setState({ selectedMovie: movie });
    }

    render() {

        let isCreateEnabled = true;
        if ((this.state.isEventPublic === true && this.state.inputComment.length === 0) || this.state.rating === 0) {
            isCreateEnabled = false;
        }

        let buttonTitle = "Опубликовать";
        if (!this.state.isEventPublic) {
            buttonTitle = "Добавить в просмотренные";
        }

        let displayCommentBlock = { display: this.state.isEventPublic ? "block" : "none" }
        let displayTagsBlock = { display: this.state.isEventPublic ? "flex" : "none" }

        let searchFieldId = "MovieForEventSearchField";
        let showSearchResults = document.activeElement.id === searchFieldId;

        let movieInfo = this.state.selectedMovie !== null ? getMovieInfoFromMovie(this.state.selectedMovie) : getEmptyMovieInfo();

        return (
            <React.Fragment>
                <Header externalClass="header-external" />
                <article className={styles.contentContainer}>

                    <FollowersSearchInput id={searchFieldId} inputValue={this.state.inputSearchValue} handleInputChange={this.searchMovies} />

                    <MovieForEventSearchResult
                        movies={this.state.movies}
                        isLoading={this.state.isLoading}
                        show={showSearchResults}
                        searchText={this.state.inputSearchValue}
                        handleClickOnMovie={this.handleClickOnMovie} />

                    <MovieEventHeader
                        movieInfo={movieInfo}
                    />

                    <p className={styles.headerTitle}>Рейтинг</p>

                    <MovieRatingSelection
                        selectedIndex={this.state.rating}
                        onChange={this.handleRatingChange}
                    />

                    <EventPublicityStatus
                        checked={this.isEventPublic}
                        onChange={this.handleChangeData}
                    />

                    <p className={styles.headerTitle} style={displayCommentBlock}>Комментарий</p>

                    <EventCommentField
                        placeholder="Напишите свой отзыв тут…"
                        value={this.state.inputComment}
                        onChange={this.handleChangeData}
                        isPublic={this.state.isEventPublic}
                    />

                    <p className={styles.headerTitle} style={displayCommentBlock}>Теги</p>

                    <div className={styles.tags} style={displayTagsBlock}>
                        {this.state.tags.map(tag =>
                            <span style={this.getSelectionStyle(tag.TagId)} onClick= {() => this.handleTagSelectionChange(tag.TagId)}>{tag.Name}</span>)
                        }
                    </div>

                    <CreateEventButton
                        title={buttonTitle}
                        isDisabled={!isCreateEnabled}
                        onClick={() => this.handleEventCreateAction(Constants.MOVIE_WATCHED_EVENT_TYPE)}
                    />
                </article>
            </React.Fragment>
        );
    }
}

export default CreateEventPage;
