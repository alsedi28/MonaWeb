import React from 'react';

import Banner from '../../../banner/banner';

import errorColored from '../../../../../public/icons/errorColored.png';

const NotMoviesViewedBanner = ({ username, show, externalClass = "" }) => {
    const headerText = "Коллекция фильмов пуста";
    const text = `У ${username} пока нет ни одного просмотренного фильма.`;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesViewedBanner;