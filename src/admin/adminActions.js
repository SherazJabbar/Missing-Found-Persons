import {
  LISTEN_TO_MISSING_PERSON,
  LISTEN_TO_FOUND_PERSON,
  REGISTER_USERS,
  LISTEN_TO_ADMIN_IDENTIDIED
} from "./adminConstants";

export function listenToMissingPersons(missingPersons) {
    return {
        type: LISTEN_TO_MISSING_PERSON,
        payload: missingPersons,
      };
}

export function listenToFoundPersons(foundPersons){
    return {
        type: LISTEN_TO_FOUND_PERSON,
        payload: foundPersons
    }
}


export function listenToRegisteredUsers(users){
    return {
        type: REGISTER_USERS,
        payload: users
    }
}

export function listenToAdminIdentified(identified){
    return {
        type: LISTEN_TO_ADMIN_IDENTIDIED,
        payload: identified
    }
}