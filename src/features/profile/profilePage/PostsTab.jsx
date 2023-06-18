import React, { useState } from "react";
import { Grid, Header, Tab, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { getUserMissingPersonQuery } from "../../../app/firebase/firestoreService";
import { listenToUserEvents } from "../profileActions";

export default function PostsTab({ profile }) {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { profileEvents } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getUserMissingPersonQuery(activeTab, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id],
  });

  const panes = [
    { menuItem: "MissingPersonPosts", pane: { key: "MissingPerson" } },
    { menuItem: "FoundPersonPosts", pane: { key: "past" } },
    
  ];

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content="My Posts" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            
          />
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {profileEvents.map((event) => (
              event.dob ? 
              <Card as={Link} to={`/wrapper/${event.id}`} key={event.id}>
                <Image
                
                 src={event.mediaUrl}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.name} textAlign="center" />
                  <Card.Meta textAlign="center">
                    
                  </Card.Meta>
                </Card.Content>
              </Card>

              : 
              <Card as={Link} to={`/foundWrapper/${event.id}`} key={event.id}>
                <Image
                
                 src={event.mediaUrl}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header content={event.name} textAlign="center" />
                  <Card.Meta textAlign="center">
                    
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
