import React from 'react';

import styles from './followersSearchUsersResult.module.css';

import UserListItem from '../../userListItem/userListItem';
import Loader from '../../loader/loader';

const FollowersSearchUsersResult = ({ users, isLoading, externalClass = "" }) => {

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <Loader show={isLoading} externalClass={styles.loader} />
            {users.map(user =>
                <UserListItem userIcon={user.icon} userLogin={user.login} userName={user.name} userId={user.id} isFollowing={user.isFollowing} externalClass={styles.userListItemExternal} />)}
        </div>
    );
};

export default FollowersSearchUsersResult;