import React, { useEffect, useState } from "react";

import { Placeholder, Item, Label } from "semantic-ui-react";
import firebase from "../../app/config/firebase";
import { useSelector } from "react-redux";

export default function IdentifiedFound({ personId }) {
  const db = firebase.firestore();

  const [identified, setIdentified] = useState(0);
  const { loading } = useSelector((state) => state.async);
  useEffect(() => {
    db.collection("timeline")
      .doc("type")
      .collection("found")
      .doc(personId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setIdentified(doc.data());
          // console.log(identified)
        } else {
          // console.log("No such document!");
        }
      });
  });

  return (
    <>
      {loading ? (
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
            <Placeholder.Line length="short" />
            <Placeholder.Line length="short" />
            <Placeholder.Line length="short" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      ) : (
        <Item.Group divided key={identified.postId}>
          <Label color="blue" ribbon>
            Identified
          </Label>
          <Item>
            <Item.Image src={identified.mediaUrl} size="small" circular />

            <Item.Content>
              <Item.Header as="a">{identified.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  Found From: {identified.location}
                </span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <Label>
                  <i class="fas fa-phone-square-alt"></i>
                  {identified.phoneNumber || " +923008442046"}
                </Label>
              </Item.Extra>
              <Item.Extra>
                <Label>
                  <i class="fas fa-map-marker-alt"></i>{" "}
                  {identified.policeStationWhereReported}
                </Label>
              </Item.Extra>
              <Item.Extra>
                <Label>
                  <i class="fas fa-city"></i> {identified.city}
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      )}
    </>
  );
}
