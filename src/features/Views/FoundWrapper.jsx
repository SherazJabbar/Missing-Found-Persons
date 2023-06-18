import React, { useState } from "react";
import DetailedFoundPerson from "./DetailedFoundPerson";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { ListenToFoundPersonFromFirestore } from "../../app/firebase/firestoreService";
import { listenToFoundPerson} from "../AddFoundPerson/AddFoundPersonActions";
import { useDispatch, useSelector } from "react-redux";

export default function FoundWrapper({ history, match }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.FoundPerson.FoundPerson.find((e) => e.id === match.params.id)
  );
  const { currentUser } = useSelector((state) => state.auth);
  const isPost= event?.ownerId === currentUser.uid;

  useFirestoreDoc({
    query: () => ListenToFoundPersonFromFirestore(match.params.id),
    data: (event) => dispatch(listenToFoundPerson([event])),
    deps: [match.params.id, dispatch],
  });

  return (
    <DetailedFoundPerson
      open={open}
      setOpen={setOpen}
      history={history}
      event={event}
      isPost={isPost}
    />
  );
}
