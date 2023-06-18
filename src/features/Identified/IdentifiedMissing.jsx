import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Placeholder, Item, Label } from "semantic-ui-react";
import firebase from "../../app/config/firebase";

export default function IdentifiedMissing({ Id }) {
  const db = firebase.firestore();

  const [IdentifiedMissing, setIdentifiedMissing] = useState(0);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    db.collection("timeline")
      .doc("type")
      .collection("missing")
      .doc(Id)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setIdentifiedMissing(doc.data());
        } else {
          //   console.log("No such document!");
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
        <Item.Group divided key={IdentifiedMissing.postId}>
          <Label color="red" ribbon>
            Missing
          </Label>
          <Item>
            <Item.Image
              src={IdentifiedMissing.mediaUrl}
              size="small"
              circular
            />

            <Item.Content>
              <Item.Header as="a">{IdentifiedMissing.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  Missing From: {IdentifiedMissing.address}
                </span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <Label>
                  <i class="fas fa-phone-square-alt"></i>{" "}
                  {IdentifiedMissing.phoneNumber || " +923008442046"}
                </Label>
              </Item.Extra>
              <Item.Extra>
                <Label>
                  <i class="fas fa-city"></i> {IdentifiedMissing.city}
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      )}
    </>
  );
}
