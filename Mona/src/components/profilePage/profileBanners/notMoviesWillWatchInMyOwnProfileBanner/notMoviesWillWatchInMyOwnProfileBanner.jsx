import React from 'react';

import Banner from '../../../banner/banner';

import seoIcon from '../../../../../public/icons/seo.png';

const NotMoviesWillWatchInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    const headerText = "Ваш список закладок пуст";
    const text = "Добавляйте фильмы в закладки, чтобы не забыть про них!";

    return (
        <Banner image={seoIcon} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesWillWatchInMyOwnProfileBanner;