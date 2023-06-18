import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
 import PostsTab from "./PostsTab";
import PhotosTab from "./PhotosTab";
import IdentifiedTab from './MyIdentified';

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    //  { menuItem: "Events", render: () => <EventsTab profile={profile}/> },
     { menuItem: "My Posts", render: () => <PostsTab profile={profile}/>},
     { menuItem: "My Identified", render: () =><IdentifiedTab profile={profile}/>  },
     
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      
    />
  );
}
