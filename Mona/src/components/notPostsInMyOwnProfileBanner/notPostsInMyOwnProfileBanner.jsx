import React from 'react';

import Banner from '../banner/banner';

import blogging from '../../../public/icons/blogging.png';

const NotPostsInMyOwnProfileBanner = ({ show, externalClass = "" }) => {
    let headerText = <p>Делитесь фильмами!</p>;
    let text = <p>Публикуйте фильмы, которые посмотрели или собираетесь посмотреть!</p>;

    return (
        <Banner image={blogging} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default NotPostsInMyOwnProfileBanner;