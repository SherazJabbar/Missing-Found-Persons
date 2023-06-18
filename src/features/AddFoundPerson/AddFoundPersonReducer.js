import {
  ADD_FOUND_PERSON,
  UPDATE_FOUND_PERSON,
  DELETE_FOUND_PERSON,
  FETCH_FOUND_PERSON,
} from "./AddFoundPersonConstants";

const initialState = {
  FoundPerson: [],
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FOUND_PERSON:
      return {
        ...state,
        FoundPerson: [...state.FoundPerson, payload], // payload override the state.events properties
      };
    case UPDATE_FOUND_PERSON:
      return {
        ...state,
        FoundPerson: [
          ...state.FoundPerson.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
    case DELETE_FOUND_PERSON:
      return {
        ...state,
        FoundPerson: [...state.FoundPerson.filter((evt) => evt.id !== payload)],
      };
    case FETCH_FOUND_PERSON:
      return {
        ...state,
        FoundPerson: payload,
      };
    default:
      return state;
  }
}
