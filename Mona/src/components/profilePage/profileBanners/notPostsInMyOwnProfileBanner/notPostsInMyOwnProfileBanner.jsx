import React from 'react';

import Banner from '../../../banner/banner';

import blogging from '../../../../../public/icons/blogging.png';

const NotPostsInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    const headerText = "Делитесь фильмами!";
    const text = "Публикуйте фильмы, которые посмотрели или собираетесь посмотреть!";

    return (
        <Banner image={blogging} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotPostsInMyOwnProfileBanner;