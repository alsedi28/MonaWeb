import { getReleaseYear } from './timeHelper';
import { getMovieRating } from './eventHelper';

export function getMovieInfoFromPost(post) {
    let movieInfo = {
        movieId: post.MovieId,
        posterPath: post.MoviePosterPath,
        title: post.MovieTitle,
        rating: getMovieRating(post),
        year: getReleaseYear(post.MovieReleaseDate)
    };

    return movieInfo;
}

export function getMovieInfoFromMovie(movie) {
    let movieInfo = {
        movieId: movie.MovieId,
        posterPath: movie.PosterPath,
        title: movie.Title,
        rating: getMovieRating(movie),
        year: getReleaseYear(movie.ReleaseDate)
    };

    return movieInfo;
}

export function getEmptyMovieInfo() {
    let movieInfo = {
        movieId: 0,
        posterPath: "",
        title: "Введите название фильма в поиск",
        rating: null,
        year: ""
    };

    return movieInfo;
}
