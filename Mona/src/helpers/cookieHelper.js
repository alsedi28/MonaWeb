import Constants from '../constants';

export function resetUserCookie() {
    localStorage.removeItem(Constants.TOKEN_COOKIE_KEY);
    localStorage.removeItem(Constants.USER_ID_COOKIE_KEY);
    localStorage.removeItem(Constants.USER_AVATAR_COOKIE_KEY);
}

export function setUserCookie(token, userId, userAvatar) {
    localStorage.setItem(Constants.TOKEN_COOKIE_KEY, token);
    localStorage.setItem(Constants.USER_ID_COOKIE_KEY, userId);

    if (userAvatar)
        localStorage.setItem(Constants.USER_AVATAR_COOKIE_KEY, userAvatar);
}

export function getUserToken() {
    return localStorage.getItem(Constants.TOKEN_COOKIE_KEY);
}

export function getMainUserId() {
    return localStorage.getItem(Constants.USER_ID_COOKIE_KEY);
}

export function getMainUserAvatar() {
    return localStorage.getItem(Constants.USER_AVATAR_COOKIE_KEY);
}
