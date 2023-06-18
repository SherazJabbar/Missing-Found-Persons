import {
  FETCH_IDENTIFIED,
  FETCH_IDENTIFIED_MISSING,
  FETCH_IDENTIFIED_FOUND,
} from "./IdentfiedConstants";

export function listenToIdentified(events) {
  return {
    type: FETCH_IDENTIFIED,
    payload: events,
  };
}

export function listenToIdentifiedMissing(events) {
  return {
    type: FETCH_IDENTIFIED_MISSING,
    payload: events,
  };
}

export function listenToIdentifiedFound(events) {
  return {
    type: FETCH_IDENTIFIED_FOUND,
    payload: events,
  };
}
