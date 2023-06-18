import React from "react";

import useFirestoreDoc from '../../app/hooks/useFirestoreDoc';
import {listenToFoundPersons} from '../adminActions.js';
import {listenToFoundPersonForAdmin} from '../../app/firebase/firestoreService';
import { useDispatch, useSelector } from "react-redux";
import ViewFoundPerson from './viewFoundPerson';


export default function AdminFoundWrapper({history, match}) {

    const dispatch = useDispatch();
    const found = useSelector((state) =>
    state.admin.foundPersons.find((e) => e.id === match.params.id)
  );

    

  useFirestoreDoc({
    query: () => listenToFoundPersonForAdmin(match.params.id),
    data: (found) => dispatch(listenToFoundPersons([found])),
    deps: [match.params.id, dispatch],
  });
   
  return (
      <ViewFoundPerson found={found} history={history}/>
  )

}