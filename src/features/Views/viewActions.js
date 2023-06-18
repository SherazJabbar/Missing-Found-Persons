import   {FETCH_USERPROFILE} from './viewConstants';


export function listenToUserProfile(events) {
    return {
      type: FETCH_USERPROFILE,
      payload: events,
    };
  }
