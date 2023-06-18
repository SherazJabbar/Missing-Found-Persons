import React from "react";
import { Tab, Segment, Grid } from "semantic-ui-react";
import SearchMissingPerson from "./SearchByLocation";
import SearchFoundLocation from "./SearchLocationFound";

export default function searchLayout() {
  const panes = [
    {
      menuItem: { content: "Search Missing By Location", icon: "search" },
      render: () => (
        <Tab.Pane>
          <SearchMissingPerson />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: "Search Found By Location ", icon: "search" },
      render: () => (
        <Tab.Pane>
          <SearchFoundLocation />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Segment style={{ padding: "2em 0em" }} vertical>
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
  );
}
