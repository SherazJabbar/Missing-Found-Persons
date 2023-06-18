import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/ModalReducer";

export default function SignedOutMenu() {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        style={{ marginTop: "10px", marginBottom: "10px" }}
        basic
        inverted
        content="Login"
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      ></Button>
      <Button
        style={{ marginTop: "10px", marginBottom: "10px" }}
        basic
        inverted
        content="Register"
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
      ></Button>
    </>
  );
}
