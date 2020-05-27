import React from 'react';

import Banner from '../banner/banner';

import errorColored from '../../../public/icons/errorColored.png';

const NotMoviesWillWatchBanner = ({ username, show, externalClass = "" }) => {
    let headerText = <p>Cписок закладок пуст</p>;
    let text = <p>У {username} пока нет ни одного фильма в закладках.</p>;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesWillWatchBanner;