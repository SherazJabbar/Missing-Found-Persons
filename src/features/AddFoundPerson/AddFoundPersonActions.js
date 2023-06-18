import {
  ADD_FOUND_PERSON,
  UPDATE_FOUND_PERSON,
  DELETE_FOUND_PERSON,
  FETCH_FOUND_PERSON,
} from "./AddFoundPersonConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { fetchSampleData } from "../../app/api/mockApi";

export function loadEvents() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const FoundPerson = await fetchSampleData();
      dispatch({ type: FETCH_FOUND_PERSON, payload: FoundPerson });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToFoundPerson(FoundPerson) {
  return {
    type: FETCH_FOUND_PERSON,
    payload: FoundPerson,
  };
}

export function addFoundPerson(FoundPerson) {
  return {
    type: ADD_FOUND_PERSON,
    payload: FoundPerson,
  };
}

export function updateFoundPerson(FoundPerson) {
  return {
    type: UPDATE_FOUND_PERSON,
    payload: FoundPerson,
  };
}

export function deleteFoundPerson(eventId) {
  return {
    type: DELETE_FOUND_PERSON,
    payload: eventId,
  };
}
