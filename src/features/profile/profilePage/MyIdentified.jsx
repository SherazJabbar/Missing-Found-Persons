import React from "react";
import { Grid, Header, Tab, Card, Image } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { fetchUserIdentified } from "../../../app/firebase/firestoreService";
import { listenToUserIdentified } from "../profileActions";

export default function PostsTab({ profile }) {

  const dispatch = useDispatch();
  const { userIdentified } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => fetchUserIdentified( profile.id),
    data: (events) => dispatch(listenToUserIdentified(events)),
    deps: [dispatch, profile.id],
  });

  

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="My Identified" />
        </Grid.Column>
        <Grid.Column width={16}>
          
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {userIdentified.map((event) => (
              <Card key={event.id}>
                <Image
                  src={event.missing_url}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.name} textAlign="center" />
                  <Card.Meta textAlign="center">Name:{event.missing_name || event.found_name}</Card.Meta>
                </Card.Content>
              </Card>
        
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
