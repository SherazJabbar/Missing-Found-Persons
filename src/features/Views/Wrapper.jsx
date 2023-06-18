import React, { useState } from "react";
import DetailedUserMissingPerson from "./DetailedUserMissingPerson";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { ListenToEventFromFirestore } from "../../app/firebase/firestoreService";
import { useDispatch, useSelector } from "react-redux";
import { listenToUserProfile } from "./viewActions";

export default function Wrapper({ history, match }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const { currentUser } = useSelector((state) => state.auth);
  const isPost = event?.ownerId === currentUser.uid;
  console.log(match.params.id);

  useFirestoreDoc({
    query: () => ListenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToUserProfile([event])),
    deps: [match.params.id, dispatch],
  });

  return (
    <DetailedUserMissingPerson
      open={open}
      setOpen={setOpen}
      history={history}
      event={event}
      isPost={isPost}
    />
  );
}
