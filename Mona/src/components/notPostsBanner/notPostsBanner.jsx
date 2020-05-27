import React from 'react';

import Banner from '../banner/banner';

import errorColored from '../../../public/icons/errorColored.png';

const NotPostsBanner = ({ username, show, externalClass = "" }) => {
    let headerText = <p>Пока нет публикаций</p>;
    let text = <p>У {username} пока нет ни одной публикации.</p>;

    return (
        <Banner image={errorColored} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotPostsBanner;