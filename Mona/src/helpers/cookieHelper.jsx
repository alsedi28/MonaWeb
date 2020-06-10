import Constants from '../constants';

export function resetUserCookie() {
    sessionStorage.removeItem(Constants.TOKEN_COOKIE_KEY);
    sessionStorage.removeItem(Constants.USER_ID_COOKIE_KEY);
    sessionStorage.removeItem(Constants.USER_AVATAR_COOKIE_KEY);
}

export function setUserCookie(token, userId, userAvatar) {
    sessionStorage.setItem(Constants.TOKEN_COOKIE_KEY, token);
    sessionStorage.setItem(Constants.USER_ID_COOKIE_KEY, userId);

    if (userAvatar)
        sessionStorage.setItem(Constants.USER_AVATAR_COOKIE_KEY, userAvatar);
}
