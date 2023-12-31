import {
    LISTEN_TO_CURRENT_USER_PROFILE,
    LISTEN_TO_SELECTED_USER_PROFILE,
    LISTEN_TO_USER_EVENTS,
    LISTEN_TO_USER_PHOTOS,
    LISTEN_TO_USER_IDENTIFIED
  } from "./profileConstants";
  
  const initialState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
    profileEvents: [],
    userIdentified:[]
  };
  
  export default function profileReducer(
    state = initialState,
    { type, payload }
  ) {
    switch (type) {
      case LISTEN_TO_CURRENT_USER_PROFILE:
        return {
          ...state,
          currentUserProfile: payload,
        };
      case LISTEN_TO_SELECTED_USER_PROFILE:
        return {
          ...state,
          selectedUserProfile: payload,
        };
      case LISTEN_TO_USER_PHOTOS:
        return {
          ...state,
          photos: payload,
        };
        case LISTEN_TO_USER_EVENTS:
          return {
            ...state,
            profileEvents: payload
          }
          case LISTEN_TO_USER_IDENTIFIED:
            return {
              ...state,
            userIdentified: payload
            }
      default: {
        return state;
      }
    }
  }
  