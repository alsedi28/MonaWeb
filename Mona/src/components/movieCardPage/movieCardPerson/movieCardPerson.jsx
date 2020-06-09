import React from 'react';

import { getPersonPhotoUrl } from '../../../helpers/imagePathHelper';

import styles from './movieCardPerson.module.css';

const MovieCardPerson = ({ name, role, photoPath, externalClass = "" }) => (
    <article className={`${styles.container} ${externalClass}`}>
        <div>
            <div style={{ background: `${getPersonPhotoUrl(photoPath)}` }} />
            <p>{name}</p>
            <p>{role}</p>
        </div>
    </article>
);

export default MovieCardPerson;