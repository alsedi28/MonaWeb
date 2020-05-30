import React from 'react';
import { Link } from 'react-router-dom';

import FollowButton from '../followButton/followButton';
import { DataService } from '../../dataService';
import Constants from '../../constants';

import styles from './userListItem.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

class UserListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            isFollowing: props.isFollowing,
            clickFollowButton: this.clickFollowButton.bind(this)
        };

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
        };

        DataService.getProfileInfo(this.state.userId, callback);
    }

    render() {
        const { userIcon, userLogin, userName, userId, externalClass = "" } = this.props;

        return (
            <div className={`${styles.container} ${externalClass}`}>
                <div className={styles.userIcon}>
                    <Link to={`/profile/${userId}`}>
                        <div style={{ background: `url(${userIcon ? userIcon : blankProfileIcon}) 50% 10% no-repeat` }}>
                        </div>
                    </Link>
                </div>
                <div className={styles.userInfo}>
                    <p><Link to={`/profile/${userId}`}>{userName}</Link></p>
                    <p><Link to={`/profile/${userId}`}>{userLogin}</Link></p>
                </div>
                {sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY) !== userId &&
                    <FollowButton active={this.state.isFollowing} click={this.state.clickFollowButton} externalClass={styles.buttonFollowExternal} />
                }
            </div>
        );
    }
}

export default UserListItem;