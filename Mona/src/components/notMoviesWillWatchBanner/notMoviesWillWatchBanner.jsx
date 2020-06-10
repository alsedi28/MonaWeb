import React from 'react';

import Banner from '../banner/banner';

import errorColored from '../../../public/icons/errorColored.png';

const NotMoviesWillWatchBanner = ({ username, show, externalClass = "" }) => {
    let headerText = "Cписок закладок пуст";
    let text = `У ${username} пока нет ни одного фильма в закладках.`;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesWillWatchBanner;