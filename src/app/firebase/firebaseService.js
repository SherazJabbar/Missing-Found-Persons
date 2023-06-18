import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

const db = firebase.firestore();

export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

export async function registerInFirebase(creds) {
  try {
    console.log(creds);
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    console.log(result.user);

    await result.user.updateProfile({
      displayName: creds.displayName,
    });

    const phoneNumber = creds.phn;
    const user = result.user.uid;

    return await db
      .collection("users")
      .doc(user)
      .set({
        id: user,
        displayName: result.user.displayName,
        email: result.user.email,
        phn: "+92" + phoneNumber,
        photoURL: result.user.photoURL,
        username: result.user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() =>
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            url: "http://localhost:3000/",
          })
          .then(function () {
            console.log("email Sent");
          })
          .catch(function (error) {
            console.log(error);
          })
      );
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;

  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);

    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    console.log(error);
  }
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}
