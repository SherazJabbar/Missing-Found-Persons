import React from "react";
import { fetchIdentifiedFromFireStore } from "../../app/firebase/firestoreService";
import { listenToIdentified } from "./IdentifiedActions";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import Identified from "./Identfiied";

export default function IdentifiedWrapper() {
  const dispatched = useDispatch();
  const { identified } = useSelector((state) => state.identified);

  useFirestoreCollection({
    query: () => fetchIdentifiedFromFireStore(),
    data: (Identified) => dispatched(listenToIdentified(Identified)),
    deps: [dispatched],
  });

  return <Identified identified={identified} />;
}
