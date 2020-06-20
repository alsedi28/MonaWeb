import React, { useRef } from 'react';
import Constants from '../../constants';

import PostWillWatch from '../postWillWatch/postWillWatch';
import PostWatchStatusButtons from '../postWatchStatusButtons/postWatchStatusButtons';
import { DataService } from '../../dataService';

import styles from './movieStatusButtons.module.css';

class MovieStatusButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showWillWatch: false, // Флаг показать ли экран создания события «Буду смотреть»
        };

        this.handleChangeStatusAction = this.handleChangeStatusAction.bind(this);
        this.hideWillWatch = this.hideWillWatch.bind(this);
    }

    handleChangeStatusAction(newStatus) {

        let callback = _ => {
            this.props.handlerExternal();
        };

        switch(newStatus) {
            case Constants.MOVIE_MOVE_TO_WATCHED:

                break;
            case Constants.MOVIE_DELETE_FROM_WATCHED:

                break;
            case Constants.MOVIE_MOVE_TO_WILL_WATCH:
                this.setState({ showWillWatch: true });
                break;
            case Constants.MOVIE_DELETE_FROM_WILL_WATCH:
                DataService.deleteMovieFromWillWatch(this.props.movieId, callback)
                break;
            default:
                break;
        }
    }

    hideWillWatch() {
        console.error("AAAAA");
        this.setState({ showWillWatch: false });
    }

    render() {
        return (
            <React.Fragment>
                <PostWatchStatusButtons status={this.props.status} handleChangeStatusAction={this.handleChangeStatusAction} />
                <PostWillWatch
                    isDisplay={this.state.showWillWatch}
                    clickClose={this.hideWillWatch}
                />
            </React.Fragment>
        );
    }
}

export default MovieStatusButtons;
