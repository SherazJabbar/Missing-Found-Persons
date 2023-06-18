import {FETCH_USERPROFILE} from './viewConstants';


const initialState = {
    userProfile: []
}


export default function viewReducer(state = initialState, { type, payload }){
    switch (type) {
        case FETCH_USERPROFILE:
            return {
              ...state,
              events: payload,
            };
        default:
      return state;
    }
}