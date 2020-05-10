import React from 'react';
import styles from './post.module.css';
import shapeIcon from '../../../public/icons/shape.png';
import checkMarkIcon from '../../../public/icons/checkMark.png';

const Post = ({ externalClass = "" }) => (
    <article className={`${styles.container} ${externalClass}`}>
        <header className={styles.header}>
            <div className={styles.postInfoHeader}>
                <div className={styles.postUserIcon}>
                    <img src="http://monamobileapp.ru/MovieMe/Content/UserImages/avatar637228457865004886.jpg" width="32px" height="32px" />
                </div>
                <div className={styles.postUserInfo}>
                    <span>alsedi</span>
                    <span> посмотрел</span>
                </div>
            </div>
            <div className={styles.datePost}>
                <span>8 ч. назад</span>
            </div>
        </header>
        <div className={styles.main} style={{ background: "url(https://image.tmdb.org/t/p/w780/64jAqTJvrzEwncD3ARZdqYLcqbc.jpg) 100% 100% no-repeat"}}>
            <div>
                <div className={styles.posterBlock}>
                    <div>
                        <img src="https://image.tmdb.org/t/p/w342/htLqU5IMBiltpClDKGZsvyfaa4Q.jpg" width="342px"/>
                    </div>
                </div>
                <div className={styles.movieInfoBlock}>
                    <p className={styles.movieTitle}>Девушка в поезде <span>(2016)</span></p>
                    <p className={styles.userRaiting}>Оценка: <span>7</span></p>
                    <div className={styles.movieRaiting}>
                        <p>8.0</p>
                        <p>рейтинг</p>
                    </div>
                    <div className={styles.numberUsers}>
                        <img src={shapeIcon} width="20px" />
                        <p>150</p>
                        <p>будут смотреть</p>
                    </div>
                    <div className={styles.numberUsers}>
                        <img src={shapeIcon} width="20px" />
                        <p>45</p>
                        <p>посмотрели</p>
                    </div>
                </div>
                <div className={styles.movieStatusForUser}>
                    <p>Просмотрен
                        <img src={checkMarkIcon} width="20px"/> 
                    </p>
                </div>
            </div>
        </div>
    </article>
);

export default Post;