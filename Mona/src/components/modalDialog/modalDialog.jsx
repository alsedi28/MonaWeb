import React from 'react';
import UserListItem from '../userListItem/userListItem';
import Loader from '../loader/loader';
import styles from './modalDialog.module.css';
import closeIcon from '../../../public/icons/close.png';

const ModalDialog = ({ show, isLoading, title, items, clickClose, externalClass = "" }) => (
    <div className={`${styles.background} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <div className={styles.dialog}>
            <header>
                <img src={closeIcon} width="35px" title="Закрыть" onClick={clickClose}/>
                <p>
                    {title}
                </p>
            </header>
            <div className={styles.itemsContainer}>
                <Loader show={isLoading} externalClass={styles.loader}/>
                {items.map(item => <UserListItem userIcon={item.icon} userLogin={item.login} userName={item.name} />)}
            </div>
        </div>
    </div>
);

export default ModalDialog;