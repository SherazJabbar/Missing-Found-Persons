import React from "react";
import IdentifiedMissing from "./IdentifiedMissing";
import IdentifiedFound from "./IdentifiedFound";
import {
  Header,
  Grid,
  Segment,
  Container,
  Divider,
  Icon
} from "semantic-ui-react";

export default function Identified({ identified }) {
  return (
    <div>
      <Header as='h2' icon textAlign='center'>
      <Header.Content><i class="far fa-id-badge"></i> Identified</Header.Content>
    </Header>
      {identified.map((person) => (
        <>
          <Container>
            <Grid columns={3} doubling>
              <Grid.Column>
                <Segment>
                  <IdentifiedMissing Id={person.missing_post} />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Divider vertical><i class="fas fa-arrows-alt-h"></i></Divider>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <IdentifiedFound personId={person.found_post} />
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        </>
      ))}
    </div>
  );
}
