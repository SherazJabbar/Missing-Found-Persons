import React from "react";
import {
  Segment,
  Grid,
  Item,
  Header,
  Reveal,
  Divider,
  Button,
} from "semantic-ui-react";

export default function ProfileHeader({ profile, isCurrentUser }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.photoURL} />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
                <Item.Meta><i class="fas fa-phone-square-alt"></i> {profile.phn}</Item.Meta>
                <Item.Meta><i class="far fa-envelope"></i> {profile.email}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          {/* <Statistic.Group>
            <Statistic label="Followers" value={10} />
            <Statistic label="Following" value={5} />
          </Statistic.Group> */}
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color="teal" content="Following" />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button basic fluid color="red" content="Unfollow" />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
