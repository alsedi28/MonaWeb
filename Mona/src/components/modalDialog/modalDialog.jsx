import React from 'react';

import UserListItem from '../userListItem/userListItem';
import Loader from '../loader/loader';

import styles from './modalDialog.module.css';

import closeIcon from '../../../public/icons/close.png';

const ModalDialog = ({ show, isLoading, title, items, clickClose, externalClass = "", handlerExternal = () => ({}) }) => {

    function clickBackground(event) {
        let target = event.target;

        if (target.closest(".dialog-ev")) {
            event.stopPropagation();
            return;
        }

        clickClose();
    }

    return (
        <div className={`${styles.background} ${externalClass}`} style={{ display: show ? "block" : "none" }} onClick={clickBackground}>
            <div className={`${styles.dialog} dialog-ev`}>
                <header>
                    <img src={closeIcon} width="24px" title="Закрыть" onClick={clickClose} />
                    <p>
                        {title}
                    </p>
                </header>
                <div className={styles.itemsContainer}>
                    <Loader show={isLoading} externalClass={styles.loader} />
                    {items.map(item =>
                        <UserListItem userIcon={item.icon} userLogin={item.login} userName={item.name} userId={item.id} isFollowing={item.isFollowing} handlerExternal={handlerExternal}/>)}
                </div>
            </div>
        </div>
    );
};

export default ModalDialog;
