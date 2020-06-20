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
