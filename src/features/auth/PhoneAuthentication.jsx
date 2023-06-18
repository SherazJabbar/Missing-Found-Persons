import React,{Component} from 'react';
import firebase from './firebase';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      form: true,
      alert: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
      },
      defaultCountry: "PAK",
      
    });
  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+92" + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = this.state.otp;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+92" + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
    return (
      <>
      <div>
        <h1>Phone Login</h1>
        <form onSubmit={this.onSignInSubmit}>
        <div id="recaptcha-container"></div>
          <label>Enter Phone No.</label>
          <input type="number" name="mobile" onChange={this.onChangeHandler}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <form onSubmit={this.onSubmitOtp}>
          <input type="number" name="otp" onChange={this.onChangeHandler}>
          </input>
          <button type="submit">Submit OTP</button>
        </form>
      </div>
      </>
      
      
    );
  }
}

  


export default App;