import React from "react";
import { Link } from "react-router-dom";
import DrawerToggleButton from "./SideDrawer/DrawerToggleButton";
import { useSelector } from "react-redux";
import SignedOutMenu from "../nav/SignedOutMenu";
import SignedInMenu from "../nav/SignedInMenu";
import "./NavBar.css";
import { Menu, Container} from "semantic-ui-react";

const Navbar = (props) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <Menu fixed="top" inverted className="menu">
        <Container>
          <div className="toolbar-toggle">
            <Menu.Item>
              <DrawerToggleButton click={props.drawerClickHandler} />
            </Menu.Item>
          </div>
          <div className="toolbar__logo">
            <Menu.Item>Talash-e-Ghumshuda</Menu.Item>
          </div>

          <div className="spacer"></div>

          <Menu.Item as={Link} to='/'><i class="home icon"></i></Menu.Item>
          <Menu.Item as ={Link} to='/searchByLocation'><i class="fas fa-search-location"></i></Menu.Item>
          <Menu.Item as={Link} to='/identified'><i class="far fa-id-badge"></i></Menu.Item>
   
          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;
