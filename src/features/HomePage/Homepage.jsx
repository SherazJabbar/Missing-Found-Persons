import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { useSelector } from "react-redux";
import MissingPersonTimline from "../Views/MissingPersonTimline";
import FoundPersonTimeline from "../Views/FoundPersonTimeline";
import LoadingComponent from "../../app/Layout/LoadingComponent";

import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Segment,
  Tab,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const HomepageHeading = ({ mobile }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Container text>
      <Header
        as="h1"
        content="Talash-e-Ghumshuda"
        inverted
        style={{
          fontSize: mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1.5em" : "3em",
        }}
      />
      <Header
        as="h2"
        content="Help Us Find Missing Persons"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em",
        }}
      />
      {authenticated && (
        <>
          <Button as={Link} to="/addMissingPerson" primary size="small">
            Add Missing Person
            <Icon name="right arrow" />
          </Button>
          <div style={{ marginTop: "10px" }}>
            <Button as={Link} to="/addFoundPerson" inverted>
              Report a Sighting
              <Icon name="right arrow" />
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Media greaterThan="mobile">
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 700, padding: "1em 0em", marginTop: "-5px" }}
          vertical
        >
          <HomepageHeading />
        </Segment>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Media at="mobile">
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 350, padding: "1em 0em", marginTop: "-5px" }}
          vertical
        >
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = ({ history }) => {
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content="Loadng app..." />;

  const panes = [
    {
      menuItem: { content: "Missing Person Timeline", icon: "users" },
      render: () => (
        <Tab.Pane>
          <MissingPersonTimline />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: "Found Person Timeline", icon: "users" },
      render: () => (
        <Tab.Pane>
          <FoundPersonTimeline />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle" columns={1}>
          <Grid.Column>
            <Tab
              menu={{ fluid: true, horizontal: true }}
              menuPosition="right"
              panes={panes}
            />
          </Grid.Column>
        </Grid>
      </Segment>

      {/* <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column
              style={{ paddingBottom: "5em", paddingTop: "5em" }}
            ></Grid.Column>
            <Grid.Column
              style={{ paddingBottom: "5em", paddingTop: "5em" }}
            ></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}></Header>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          ></Divider>
        </Container>
      </Segment> */}

      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Talash-e-Ghumshuda</List.Item>
                  <List.Item as="a">Contact: +923008442046</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Add Missing Person</List.Item>
                  <List.Item as="a">Add Found Person</List.Item>
                  <List.Item as="a">Search By Location</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Talash-e-Ghumshuda
                </Header>
                <p>Please Help us Find the missing persons</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  );
};

export default HomepageLayout;
