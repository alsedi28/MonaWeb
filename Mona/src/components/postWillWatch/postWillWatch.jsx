import React from 'react';
import { Link } from 'react-router-dom';

import styles from './postWillWatch.module.css';

import CloseButton from '../buttons/closeButton/closeButton';
import CommonButton from '../buttons/commonButton/commonButton';
import ModalDialogBackground from '../modalDialogBackground/modalDialogBackground';
import { getPosterPath } from '../../helpers/imagePathHelper';

class PostWillWatch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputComment: "", // Комментарий к событию
            isEventPublic: true // Флаг является ли публикация публичной или приватной
        };
    }

    handleInputCommentChange(event) {
        const {name, value} = event.target;
        console.error(value);
        this.setState({
            [name]: value
        });
    }

    handlePublicEventChange(event) {
        const {name, value} = event.target;
        console.error(name, value);
    }

    render() {
        return (
            <ModalDialogBackground show={this.props.isDisplay} clickClose={this.props.clickClose} >

                <article className={`${styles.modalContent} ${`dialog-ev`}`}>
                    <header className={styles.movieInfo}>

                        <div className={styles.poster}>
                            <img
                                src="https://avatars.mds.yandex.net/get-pdb/1667260/9fa90477-fcd1-48ff-a505-6566a4614e01/s1200"
                                className={styles.posterImage}
                            />
                        </div>

                        <div className={styles.movieTitles}>
                            <p className={styles.title}>Movie Title <span>(2019)</span></p>
                            <p className={styles.subtitle}>USA</p>
                        </div>

                    </header>

                    <div className={styles.publicSettingContainer}>
                        <p>Поделиться публикацией с подписчиками</p>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                id="checkbox"
                                name="isEventPublic"
                                checked={this.state.isEventPublic}
                                onChange={this.handlePublicEventChange}
                            />
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </div>

                    <p className={styles.headerTitle}>Отзыв</p>

                    <div className={styles.inputField}>
                        <textarea
                            aria-label="Напишите свой отзыв тут…"
                            placeholder="Напишите свой отзыв тут…"
                            name="inputComment"
                            className={styles.textArea}
                            autocomplete="off"
                            autocorrect="off"
                            value={this.state.inputComment}
                            onChange={this.handleInputCommentChange}
                        />

                    </div>

                    <CommonButton externalClass="filledButton createEventButton" title="Создать публикацию" />

                </article>

                <CloseButton onClick={this.props.clickClose}/>
                
            </ModalDialogBackground>
        );
    }
}

export default PostWillWatch;
