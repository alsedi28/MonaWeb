import analytics from 'firebase/analytics';

export const EVENTS = {
    REGISTRATION: "registration",
    AUTHORIZATION: "authorization",
    EVENT_CREATION: "eventCreation",
    PUBLICATION_CREATION: "publicationCreation",
    EVENT_EDIT: "eventEdit",
    EVENT_DELETE: "eventDelete",
    ADD_LIKE_TO_EVENT: "addLikeToEvent",
    REMOVE_LIKE_FROM_EVENT: "removeLikeFromEvent",
};

//   case createCommentToEvent
//   case addLikeToCommentToEvent
//   case removeLikeFromCommentToEvent
//   case pressAlreadyWatchMovie
//   case pressWillWatchMovie
//   case removeMovieFromAlreadyWatch
//   case removeMovieFromWillWatch
//   case didPressRateApp
//   case didPressLogout
//   case subscribeOnUser
//   case unsubscribeFromUser
//   case openProfileOfAnotherUser
//   case searchUserByName
//   case searchMovieByTitle
//   case searchMovieByTitleWhenCreateEvent
//   case registeredToReceiveNotifications
//   case denyToReceiveNotifications
//   case skipReceiveNotifications
//   case didAuthViaVK
//   case didAuthViaApple
//   case didRegisterViaVK
//   case didPressInviteFriend
//   case didPressOnMenuItemOnMovieCard
//
//   case didAdLoaded
//   case didAdClicked
//   case didAdFailedWithError
//
//   case logNetworking
//
//   case appearanceTheme

export function logEvent(event, parameters) {
    analytics.logEvent(event, parameters);
}

export function logEventWithoutParameters(event) {
    analytics.logEvent(event);
}
