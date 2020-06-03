import framePlaceholder from '../../public/icons/framePlaceholder.png';
import blankProfileIcon from '../../public/icons/blankProfileIcon.png';

export function getPosterPath(poster) {
    return poster ? `https://image.tmdb.org/t/p/w342${poster}` : framePlaceholder;
}

export function getBackdropUrl(backdrop) {
    return `url(https://image.tmdb.org/t/p/w780${backdrop}) 100% 100% no-repeat`;
}

export function getAvatarPath(avatarPath) {
    return avatarPath ? avatarPath : blankProfileIcon;
}
