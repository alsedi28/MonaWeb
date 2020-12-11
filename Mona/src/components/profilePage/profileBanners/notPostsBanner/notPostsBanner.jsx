import React from 'react';

import Banner from '../../../banner/banner';

import errorColored from '../../../../../public/icons/errorColored.png';

const NotPostsBanner = ({ username, show, externalClass = "" }) => {
    const headerText = "Пока нет публикаций";
    const text = `У ${username} пока нет ни одной публикации.`;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotPostsBanner;