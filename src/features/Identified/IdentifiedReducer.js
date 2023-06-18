import {FETCH_IDENTIFIED, FETCH_IDENTIFIED_MISSING,FETCH_IDENTIFIED_FOUND} from './IdentfiedConstants';


const initialState = {
    identified: [],
    identifiedMissing: [],
    identifiedFound: []
}


export default function eventReducer(state = initialState, { type, payload }) {
    switch(type) {
        case FETCH_IDENTIFIED: 
        return {
            ...state,
            identified: payload,
          };
          case FETCH_IDENTIFIED_MISSING:
              return {
                  ...state,
                  identifiedMissing: payload
              }
              case FETCH_IDENTIFIED_FOUND:
                  return {
                      ...state,
                      identifiedFound: payload
                  }
          default: 
          return state; 
    }
}
