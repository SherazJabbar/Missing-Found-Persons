import React, { Component } from "react";
import firebase from "../../app/config/firebase";
import * as firebaseui from "firebaseui";
import HomePage from '../HomePage/Homepage'

class PhoneAuth extends Component {
  componentDidMount() {
    const uiConfig = {
      
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      tosUrl: null, 
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  render() {
    return (
      <>
        <div id="firebaseui-auth-container"></div>
      </>
    );
  }
}

export default PhoneAuth;
