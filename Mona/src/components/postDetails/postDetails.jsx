import React from 'react';
import styles from './postDetails.module.css';


function PostDetails(props) {

    return (
        <div id="myModal" className={styles.modal} style={{ display: props.isDisplay ? "block" : "none" }}>

        <arcticle>
        <div className={styles.modalContent}>

        <div className={styles.posterBox} style={{ background: `url(https://www.kinopoisk.ru/images/film_big/959365.jpg") 100% 100% no-repeat` }}>
            <div>
                <div className={styles.poster}>
                    <img src="https://www.kinopoisk.ru/images/film_big/959365.jpg" className={styles.posterImage} />
                </div>
            </div>
        </div>

        <div className={styles.rightSideBox}>
            <header className={styles.infoBox}>
                <div className={styles.iconWithInfoContainer}>
                    <div className={styles.userIcon}>
                        <img src="https://www.kinopoisk.ru/images/film_big/959365.jpg" className={styles.userLink} width="32px" height="32px" />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userLink}>awsm</span>
                        <span>хочет посмотреть</span>
                        <span className={styles.userLink}>King of the Rings (2019)</span>
                    </div>
                </div>
            </header>

            <div className={styles.commentsDiv}>
                <ul className={styles.commentsSection}>
                    <ul className={styles.commentListItem}>
                        <div className={styles.commentBox}>
                            <div className={styles.userIcon}>
                                <img src="https://www.kinopoisk.ru/images/film_big/959365.jpg" className={styles.userLink} width="32px" height="32px" />
                            </div>

                            <div className={styles.commentsBlock}>
                                <p style={{ marginTop: `0px !important`, marginBottom: `0px !important` }}><span className={styles.userLink}>awesome</span>Long comment for testing long input</p>
                                <p className={styles.timeAgo}>1 час назад</p>
                            </div>

                            <img src="https://img.icons8.com/pastel-glyph/2x/facebook-like.png" className={styles.like} width="20px" height="20px" />
                        </div>
                    </ul>

                    <ul className={styles.commentListItem}>
                        <div className={styles.commentBox}>

                        <div className={styles.userIcon}>
                            <img src="https://www.kinopoisk.ru/images/film_big/959365.jpg" className={styles.userLink} width="32px" height="32px" />
                        </div>

                        <div className={styles.commentsBlock}>
                            <p style={{ marginTop: `0px !important`, marginBottom: `0px !important` }}><span className={styles.userLink}>awesome</span>Long comment for testing long input</p>
                            <p className={styles.timeAgo}>1 час назад</p>
                        </div>

                        <img src="https://img.icons8.com/pastel-glyph/2x/facebook-like.png" className={styles.like} width="20px" height="20px" />
                        </div>
                    </ul>
                </ul>
            </div>

            <div className={styles.postInfoContainer}>
                <div className={styles.buttonsContainer}>
                    <img src="https://img.icons8.com/pastel-glyph/2x/facebook-like.png" className={styles.like} width="32px" />
                    <img src="https://img.icons8.com/pastel-glyph/2x/facebook-like.png" width="32px" />
                </div>
                <div>
                    <p>Нравится <span className={styles.userLink}>awesome</span> и <span className={styles.userLink}>ещё</span> 3 пользователям</p>
                    <p className={styles.timeAgo}>1 час назад</p>
                </div>
            </div>

            <div className={styles.inputFieldContainer}>
                <textarea aria-label="Напишите…" placeholder="Напишите…" name="inputComment" className={styles.textArea} autocomplete="off" autocorrect="off"></textarea>
                <button className={styles.sendButton} type="submit">Post</button>
            </div>

        </div>

        </div>

        </arcticle>

        </div>


        );
    };

    export default PostDetails;
