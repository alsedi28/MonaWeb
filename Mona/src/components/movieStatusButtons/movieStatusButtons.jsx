import React, { useRef } from 'react';

import PostWatched from './postWatched/postWatched';
import PostWillWatch from './postWillWatch/postWillWatch';
import PostWatchStatusButtons from './postWatchStatusButtons/postWatchStatusButtons';
import { DataService } from '../../dataService';
import Constants from '../../constants';

class MovieStatusButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showWillWatch: false, // Флаг показать ли экран создания события «Буду смотреть»
            showWatched: false, // Флаг показать ли экран создания события «Уже смотрел»
            willWatch: {
                inputComment: "", // комментарий для события «Буду смотреть»,
                isEventPublic: true // флаг сделать ли событие «Буду смотреть» видимой для всех
            },
            watched: {
                rating: 0, // выбранный рейтинг для фильма
                inputComment: "", // комментарий для события «Уже смотрел»,
                isEventPublic: true, // флаг сделать ли событие «Уже смотрел» видимой для всех
                selectedTags: [] // выбранные теги (их id)
            },
            tags: [] // все теги
        };

        this.handleChangeStatusAction = this.handleChangeStatusAction.bind(this);
        this.hideWillWatch = this.hideWillWatch.bind(this);
        this.hideWatched = this.hideWatched.bind(this);
        this.handleChangeWillWatchData = this.handleChangeWillWatchData.bind(this);
        this.handleChangeWatchedData = this.handleChangeWatchedData.bind(this);
        this.handleEventCreateAction = this.handleEventCreateAction.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleTagSelectionChange = this.handleTagSelectionChange.bind(this);
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

    handleChangeStatusAction(newStatus) {

        let callback = _ => {
            this.props.handlerExternal();
        };

        switch(newStatus) {
            case Constants.MOVIE_MOVE_TO_WATCHED:
                this.setState({ showWatched: true });
                break;
            case Constants.MOVIE_DELETE_FROM_WATCHED:
                DataService.deleteMovieFromViewed(this.props.movieInfo.movieId, callback);
                break;
            case Constants.MOVIE_MOVE_TO_WILL_WATCH:
                this.setState({ showWillWatch: true });
                break;
            case Constants.MOVIE_DELETE_FROM_WILL_WATCH:
                DataService.deleteMovieFromWillWatch(this.props.movieInfo.movieId, callback);
                break;
            default:
                break;
        }
    }

    hideWillWatch() {
        this.setState({ showWillWatch: false });
    }

    hideWatched() {
        this.setState({ showWatched: false });
    }

    handleChangeWillWatchData(name, value) {
        this.setState({
            willWatch: {
                ...this.state.willWatch,
                [name]: value
            }
        });
    }

    handleChangeWatchedData(name, value) {
        this.setState({
            watched: {
                ...this.state.watched,
                [name]: value
            }
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
                    console.error(movieId, this.state.watched.inputComment, this.state.watched.rating, eventType, this.state.watched.selectedTags);
                    DataService.createEvent(movieId, this.state.watched.inputComment, this.state.watched.rating, eventType, this.state.watched.selectedTags, callback);
                } else {
                    DataService.addMovieToViewed(movieId, this.state.watched.rating, callback);
                }
                break;
            case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                if (this.state.willWatch.isEventPublic) {
                    DataService.createEvent(movieId, this.state.willWatch.inputComment, 0, eventType, [], callback);
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
            watched: {
                ...this.state.watched,
                rating: newRating
            }
        });
    }

    handleTagSelectionChange(selectedTag) {
        let currentlySelectedTags = this.state.watched.selectedTags;

        const index = currentlySelectedTags.indexOf(selectedTag);

        if (index === -1) {
            currentlySelectedTags.push(selectedTag)
        } else {
            currentlySelectedTags.splice(index, 1);
        }

        this.setState({
            watched: {
                ...this.state.watched,
                selectedTags: currentlySelectedTags
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <PostWatchStatusButtons status={this.props.status} externalClass={this.props.externalClass} handleChangeStatusAction={this.handleChangeStatusAction} />
                <PostWillWatch
                    movieInfo={this.props.movieInfo}
                    isDisplay={this.state.showWillWatch}
                    clickClose={this.hideWillWatch}
                    comment={this.state.willWatch.inputComment}
                    isPublic={this.state.willWatch.isEventPublic}
                    handleChange={this.handleChangeWillWatchData}
                    onEventCreate={this.handleEventCreateAction}
                />
                <PostWatched
                    movieInfo={this.props.movieInfo}
                    isDisplay={this.state.showWatched}
                    clickClose={this.hideWatched}
                    comment={this.state.watched.inputComment}
                    isPublic={this.state.watched.isEventPublic}
                    handleChange={this.handleChangeWatchedData}
                    onEventCreate={this.handleEventCreateAction}
                    selectedRating={this.state.watched.rating}
                    handleRatingChange={this.handleRatingChange}
                    tags={this.state.tags}
                    selectedTags={this.state.watched.selectedTags}
                    onTagSelect={this.handleTagSelectionChange}
                />
            </React.Fragment>
        );
    }
}

export default MovieStatusButtons;
