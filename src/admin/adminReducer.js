import {
    LISTEN_TO_MISSING_PERSON,
    LISTEN_TO_FOUND_PERSON,
    REGISTER_USERS,
    LISTEN_TO_ADMIN_IDENTIDIED
  } from "./adminConstants";

  const initialState = {
    
    missingPersons: [],
    foundPersons:[],
    users:[],
    adminIdentified:[]
  };
  
  export default function adminReducer(
    state = initialState,
    { type, payload }
  ) {
    switch (type) {
      case LISTEN_TO_MISSING_PERSON:
        return {
          ...state,
          missingPersons: payload,
        };
      case LISTEN_TO_FOUND_PERSON:
        return {
          ...state,
          foundPersons: payload,
        };
      case REGISTER_USERS:
        return {
          ...state,
          users: payload,
        };
        case LISTEN_TO_ADMIN_IDENTIDIED:
          return {
            ...state,
            adminIdentified:payload
          }
        
      default: {
        return state;
      }
    }
  }