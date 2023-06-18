import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuItem, Image, Dropdown, DropdownMenu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { signOutFirebase } from "../../app/firebase/firebaseService";

export default function SignedOutMenu() {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();
  const adminId = "gw5DdW9S9WZMTRYIV9kLirvYw0A3";

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* {currentUser.uid === adminId ? (
        <MenuItem as={Link} to="/adminPanel">
          Admin Panel
        </MenuItem>
      ) : null} */}

      <MenuItem
        position="right"
        style={{ marginRight: "20px", marginTop: "5px" }}
      >
        <Image
          avatar
          spaced="right"
          src={
            currentUserProfile?.photoURL || "../../../public/assets/user.png"
          }
        />
        <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
          <DropdownMenu>
            {currentUser.uid === adminId ? (
              <Dropdown.Item as={Link} to="/adminPanel" text="Dashboard" icon="dashboard"></Dropdown.Item>
            ) : null}

            <Dropdown.Item
              as={Link}
              to={`/profile/${currentUserProfile?.id}`}
              text="My Profile"
              icon="user"
            />
            <Dropdown.Item
              as={Link}
              to="/account"
              text="My Account"
              icon="settings"
            />
            <Dropdown.Item
              onClick={handleSignOut}
              text="Sign Out"
              icon="power"
            />
          </DropdownMenu>
        </Dropdown>
      </MenuItem>
    </>
  );
}
