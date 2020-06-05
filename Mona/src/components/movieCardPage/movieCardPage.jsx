import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import Loader from '../loader/loader';
import HorizontalTabs from '../horizontalTabs/horizontalTabs';
import MovieCardMainInfo from './movieCardMainInfo/movieCardMainInfo';
import { DataService } from '../../dataService';

import styles from './movieCardPage.module.css';

class MovieCardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieId: props.match.params.movieId,
            movie: {
                ReleaseDate: null,
                Runtime: 0,
                VoteAverage: 0,
                ImdbRaiting: 0,
                Raiting: 0,
                PosterPath: null,
                Title: "",
                ProductionCountry: "",
                StatusOfMovieForUser: null,
                PeopleViewedMovie: {
                    AmountPeople: 0,
                    Peoples: []
                },
                PeopleWillWatchMovie: {
                    AmountPeople: 0,
                    Peoples: []
                }
            },
            isLoading: true,
            tabNumberActive: 1
        };

        this.tabSettings = [
            {
                Title: "Обзор",
                Width: 140,
                Offset: 25
            },
            {
                Title: "Отзывы",
                Width: 155,
                Offset: 208
            },
            {
                Title: "Медиа",
                Width: 150,
                Offset: 400
            }
        ];

        this.getMovieCard = this.getMovieCard.bind(this);
        this.clickTab = this.clickTab.bind(this);
    }

    componentDidMount() {
        this.getMovieCard();
    }

    getMovieCard() {
        let callback = (movie) => {
            this.setState({
                movie,
                isLoading: false
            });
        };

        DataService.getMovie(this.state.movieId, callback);
    }

    clickTab(tabNumber) {
        this.setState({ tabNumberActive: tabNumber });
    }

    render() {
        const { location } = this.props;



        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <Loader show={this.state.isLoading} externalClass={styles.loader} />
                    <MovieCardMainInfo movie={this.state.movie} externalClass={`${this.state.isLoading ? styles.hide : ''}`} />
                    <HorizontalTabs tabsSettings={this.tabSettings} tabNumberActive={this.state.tabNumberActive} clickTab={this.clickTab} externalClass={styles.tabsExternal} />
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default MovieCardPage;