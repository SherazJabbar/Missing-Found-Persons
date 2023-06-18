import React from "react";

import useFirestoreDoc from '../../app/hooks/useFirestoreDoc';
import {listenToMissingPersons} from '../adminActions.js';
import { listenToMissingPersonForAdmin} from '../../app/firebase/firestoreService';
import { useDispatch, useSelector } from "react-redux";
import ViewMissingPerson from './viewMissingPerson';


export default function MissingWrapper({history, match}) {

    const dispatch = useDispatch();
    const missing = useSelector((state) =>
    state.admin.missingPersons.find((e) => e.id === match.params.id)
  );

    

  useFirestoreDoc({
    query: () => listenToMissingPersonForAdmin(match.params.id),
    data: (missing) => dispatch(listenToMissingPersons([missing])),
    deps: [match.params.id, dispatch],
  });
   
  return (
      <ViewMissingPerson missing={missing} history={history}/>
  )

}