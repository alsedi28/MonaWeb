import React from 'react';

import Banner from '../../banner/banner';

import blogging from '../../../../public/icons/blogging.png';

const MovieCardNotCommentsBanner = ({ show, externalClass = "" }) => {
    const headerText = "Мы очень ждем ваших отзывов!";
    const text = "Пока никто не оставил отзывов на этот фильм. Напишите свой отзыв, поделитесь своим мнением о фильме со своими друзьями!";

    return (
        <Banner image={blogging} headerText={headerText} text={text} show={show} externalClass={externalClass} />
    );
};

export default MovieCardNotCommentsBanner;