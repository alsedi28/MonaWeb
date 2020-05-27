import React from 'react';

import Banner from '../banner/banner';

import seoIcon from '../../../public/icons/seo.png';

const NotMoviesViewedInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    let headerText = <p>¬аша коллекци¤ фильмов пуста</p>;
    let text = <p>ќтмечайте просмотренные фильмы и делитесь впечатлени¤ми с подписчиками!</p>;

    return (
        <Banner image={seoIcon} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesViewedInMyOwnProfileBanner;