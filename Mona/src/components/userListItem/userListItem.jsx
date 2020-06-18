import React from 'react';
import { Link } from 'react-router-dom';

import FollowButton from '../buttons/followButton/followButton';
import UserAvatar from '../userAvatar/userAvatar';
import { DataService } from '../../dataService';
import { getMainUserId } from '../../helpers/cookieHelper';

import styles from './userListItem.module.css';

class UserListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            isFollowing: props.isFollowing, // Признак подписан текущий пользователь на данного или нет
            clickFollowButton: this.clickFollowButton.bind(this) // Обработчик click по кнопке Подписаться/Подписка
        };

        this.updateProfilePage = props.handlerExternal ? props.handlerExternal : () => ({});
        this.clickFollowButton = this.clickFollowButton.bind(this);
        this.updateInfoAboutFollowing = this.updateInfoAboutFollowing.bind(this);
    }

    clickFollowButton() {
        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ clickFollowButton: () => ({}) });

        let callback = _ => this.updateInfoAboutFollowing();

        if (this.state.isFollowing)
            DataService.deleteFollowing(this.state.userId, callback);
        else
            DataService.addFollowing(this.state.userId, callback);
    }

    updateInfoAboutFollowing() {
        let callback = (profile) => {
            this.setState({
                isFollowing: profile.IsFollowing,
                // Возвращаем обработчик click
                clickFollowButton: this.clickFollowButton.bind(this)
            });

            this.updateProfilePage();
        };

        DataService.getProfileInfo(this.state.userId, callback);
    }

    render() {
        const { userIcon, userLogin, userName, userId, externalClass = ""} = this.props;

        return (
            <div className={`${styles.container} ${externalClass}`}>
                <div className={styles.userIcon}>
                    <Link to={`/profile/${userId}`}>
                        <UserAvatar avatar={userIcon} size={80} externalClass={styles.userAvatarExternal} />
                    </Link>
                </div>
                <div className={styles.userInfo}>
                    <p><Link to={`/profile/${userId}`}>{userName}</Link></p>
                    <p><Link to={`/profile/${userId}`}>{userLogin}</Link></p>
                </div>
                {getMainUserId() !== userId &&
                    <FollowButton active={this.state.isFollowing} click={this.state.clickFollowButton} externalClass={styles.buttonFollowExternal} />
                }
            </div>
        );
    }
}

export default UserListItem;
