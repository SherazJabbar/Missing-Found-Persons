import React from "react";
import Navbar from "../../features/nav/Navbar";
import SideDrawer from "../../features/nav/SideDrawer/SideDrawer";
import Backdrop from "../../features/nav/Backdrop/Backdrop";
import HomePage from "../../features/HomePage/Homepage";
import { Route, Switch } from "react-router-dom";
import ModalManager from "../common/modals/ModalManager";
import AddMissingPerson from "../../features/AddMissingPerson/AddMissingPerson";
import ProfilePage from "../../features/profile/profilePage/ProfilePage";
import AccountPage from "../../features/auth/AccountPage";
import Wrapper from "../../features/Views/Wrapper";
import AddFoundPerson from "../../features/AddFoundPerson/AddFoundPerson";
import EditMissingPerson from "../../features/EditMissingPerson/EditMissingPerson";
import EditFoundPerson from "../../features/EditFoundPerson/EditFoundPerson";
import FoundWrapper from "../../features/Views/FoundWrapper";
import SearchMissingPerson from "../../features/Search/SearchMissingPerson";
import MissingWrapper from "../../features/Views/TimelineMissingWrapper";
import FoundHomepageWrapper from "../../features/Views/TimelineFoundWrapper";
import AdminPanel from "../../admin/adminPanel";
import AdminEditMissingPerson from '../../admin/features/AdminEditMissingPerson';
import AdminMissingWrapper from '../../admin/adminViews/missingWrapper';
import AdminEditFoundPerson from '../../admin/features/AdminEditFoundPerson';
import AdminFoundWrapper from '../../admin/adminViews/adminFoundWrapper';
import SearchByLocation from '../../features/Search/SearchByLocation';
import IdentifiedWrapper from '../../features/Identified/IdentifiedWrapper';
import SearchLayout from "../../features/Search/searchLayout"

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <>
        <div></div>
        <ModalManager />
       

        <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}

        <Switch>
          <div style={{ marginTop: "60px" }}>
            <Route exact path="/" component={HomePage} />
            <Route path="/addMissingPerson" component={AddMissingPerson} />
            <Route path="/editMissingPerson/:id" component={EditMissingPerson}/>
            <Route path="/editFoundPerson/:id" component={EditFoundPerson} />
            <Route path="/addFoundPerson" component={AddFoundPerson} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/MissingWrapper/:id" component={MissingWrapper} />
            <Route path="/wrapper/:id" component={Wrapper} />
            <Route path="/foundWrapper/:id" component={FoundWrapper} />
            <Route path="/timelineFoundWrapper/:id" component={FoundHomepageWrapper}/>
            <Route path="/searchMissingPerson" component={SearchMissingPerson}/>

            {/* Admin routes */}
            <Route path="/adminPanel" component={AdminPanel} />
            <Route path="/adminEditMissing/:id" component={AdminEditMissingPerson}/>
            <Route path="/viewMissingPerson/:id" component={AdminMissingWrapper}/>
            <Route path="/adminEditFound/:id" component={AdminEditFoundPerson}/>
            <Route path="/viewFoundPerson/:id" component={AdminFoundWrapper}/>
            <Route path='/searchByLocation' component={SearchLayout}/>
            <Route path='/identified' component={IdentifiedWrapper}/>

          </div>
        </Switch>
      </>
    );
  }
}

export default App;
