export function getStatusString(eventType) {
    return eventType === 0 ? "посмотрел" : "хочет посмотреть";
}

export function getMovieRating(post) {
    return post.ImdbRaiting === null ? post.VoteAverage : post.ImdbRaiting;
}
