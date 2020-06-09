import React from 'react';

import Banner from '../banner/banner';

import errorColored from '../../../public/icons/errorColored.png';

const NotPostsBanner = ({ username, show, externalClass = "" }) => {
    let headerText = "Пока нет публикаций";
    let text = `У ${username} пока нет ни одной публикации.`;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotPostsBanner;