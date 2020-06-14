import React from 'react';

import ModalDialogBackground from '../modalDialogBackground/modalDialogBackground';
import UserListItem from '../userListItem/userListItem';
import Loader from '../loader/loader';

import styles from './modalDialog.module.css';

import closeIcon from '../../../public/icons/close.png';

const ModalDialog = ({ show, isLoading, title, items, clickClose, externalClass = "", handlerExternal = () => ({}) }) => {
    return (
        <ModalDialogBackground show={show} clickClose={clickClose} >
            <div className={`${styles.dialog} ${externalClass} dialog-ev`}>
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
        </ModalDialogBackground>
    );
};

export default ModalDialog;
