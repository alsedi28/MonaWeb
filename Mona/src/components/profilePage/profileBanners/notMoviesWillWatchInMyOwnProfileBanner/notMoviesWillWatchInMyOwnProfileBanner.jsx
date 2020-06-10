import React from 'react';

import Banner from '../../../banner/banner';

import seoIcon from '../../../../../public/icons/seo.png';

const NotMoviesWillWatchInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    let headerText = "Ваш список закладок пуст";
    let text = "Добавляйте фильмы в закладки, чтобы не забыть про них!";

    return (
        <Banner image={seoIcon} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotMoviesWillWatchInMyOwnProfileBanner;