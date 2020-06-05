import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';
import Loader from '../loader/loader';
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
                PeopleViewedMovie: {
                    AmountPeople: 0,
                    Peoples: []
                },
                PeopleWillWatchMovie: {
                    AmountPeople: 0,
                    Peoples: []
                }
            },
            isLoading: true
        };

        this.getMovieCard = this.getMovieCard.bind(this);
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

    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <Loader show={this.state.isLoading} externalClass={styles.loader} />
                    <MovieCardMainInfo movie={this.state.movie} externalClass={`${this.state.isLoading ? styles.hide : ''}`}/>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default MovieCardPage;