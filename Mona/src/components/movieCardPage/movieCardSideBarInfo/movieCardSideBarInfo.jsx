import React from 'react';

import styles from './movieCardSideBarInfo.module.css';

const MovieCardSideBarInfo = ({ movie, externalClass = "" }) => {
    function getNumberInMillionHumanView(number) {
        if (!number)
            return <span>&mdash;</span>;

        let million = number / 1000000;

        if (million <= 0)
            return <span>&mdash;</span>;

        return <span>{million.toFixed(1)} млн $</span>;
    }

    return (
        <aside className={`${styles.container} ${externalClass}`}>
            <div>
                <p className={styles.title}>Общее</p>
                <p className={styles.info}>Бюджет: {getNumberInMillionHumanView(movie.Budget)}</p>
                <p className={styles.info}>Сборы: {getNumberInMillionHumanView(movie.Revenue)}</p>
                <p className={styles.info}>Слоган: <span>{movie.Tagline}</span></p>
            </div>
            <div style={{ display: movie.Tags.length > 0 ? "block" : "none" }}>
                <p className={styles.title}>Теги</p>
                <div className={styles.tags}>
                    {movie.Tags.map(tag => <span>{tag.Name}</span>)}
                </div>
            </div>
        </aside>
    );
};

export default MovieCardSideBarInfo;