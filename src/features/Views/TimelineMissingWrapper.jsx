import React, { useState } from "react";
import DetailedMissingPersonPage from "./DetailedMissingPersonPage";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { ListenToEventFromFirestore } from "../../app/firebase/firestoreService";
import { listenToEvents } from "../AddMissingPerson/AddMissingPersonActions";
import { useDispatch, useSelector } from "react-redux";

export default function MissingWrapper({ history, match }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  


  useFirestoreDoc({
    query: () => ListenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

 
  return (
    <DetailedMissingPersonPage
      open={open}
      setOpen={setOpen}
      history={history}
      event={event}
    //  isPost={isPost}
    />
  );
}
