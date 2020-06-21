export function getStatusString(eventType) {
    return eventType === 0 ? "посмотрел" : "хочет посмотреть";
}

export function getMovieRating(dataWithRatings) {
    return dataWithRatings.ImdbRaiting === null ? dataWithRatings.VoteAverage : dataWithRatings.ImdbRaiting;
}
