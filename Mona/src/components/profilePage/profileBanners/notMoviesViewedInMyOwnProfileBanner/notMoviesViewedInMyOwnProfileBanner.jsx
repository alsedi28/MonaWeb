import React from 'react';

import Banner from '../../../banner/banner';

import seoIcon from '../../../../../public/icons/seo.png';

const NotMoviesViewedInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    let headerText = "Ваша коллекция фильмов пуста";
    let text = "Отмечайте просмотренные фильмы и делитесь впечатлениями с подписчиками!";

    return (
        <Banner image={seoIcon} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesViewedInMyOwnProfileBanner;