import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function setUserProfileData(user) {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    phn: user.phoneNumber,
    photoURL: user.photoURL,
    username: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

export function ListenToEventFromFirestore(eventId) {
  return db
    .collection("timeline")
    .doc("type")
    .collection("missing")
    .doc(eventId);
}
export function ListenToEventsFromFirestore(predicate, searchValue) {
  let eventsRef = db.collection("timeline").doc("type").collection("missing");
  switch (predicate.get("filter")) {
    case "Cities":
      return eventsRef.where("city", "==", searchValue);
    case "Gender":
      return eventsRef.where("gender", "==", searchValue);

    default:
      return eventsRef;
  }
}

export function deleteEventFromFireStore(eventId) {
  return db
    .collection("timeline")
    .doc("type")
    .collection("missing")
    .doc(eventId)
    .delete();
}

export function deleteFoundPersonFromFireStore(eventId) {
  return db
    .collection("timeline")
    .doc("type")
    .collection("found")
    .doc(eventId)
    .delete();
}

export function ListenToFoundPersonFromFirestore(eventId) {
  return db.collection("timeline").doc("type").collection("found").doc(eventId);
}

export function ListenToFoundPersonsFromFireStore(predicate, searchValue) {
  let foundpersons = db.collection("timeline").doc("type").collection("found");
  switch (predicate.get("filter")) {
    case "Cities":
      return foundpersons.where("city", "==", searchValue);
    case "Gender":
      return foundpersons.where("gender", "==", searchValue);
    default:
      return foundpersons;
  }
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {}
}

export async function updateUserProfilePhoto(downloadURL,filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
   
  } catch (error) {
    throw error;
  }
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

export function uploadToStorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function getUserMissingPersonQuery(activeTab, userUid) {
  let Ref = db.collection("timeline").doc("type").collection("missing");
  let FoundRef = db.collection("timeline").doc("type").collection("found");

  switch (activeTab) {
    case 1:
      return FoundRef.where("ownerId", "==", userUid);

    default:
      return Ref.where("ownerId", "==", userUid);
  }
}

//Functions for admin

export default function listenToMissingPersonsForAdmin() {
  return db.collection("timeline").doc("type").collection("missing");
}

export function listenToMissingPersonForAdmin(eventId) {
  return db
    .collection("timeline")
    .doc("type")
    .collection("missing")
    .doc(eventId);
}

export function listentoRegisterUsers() {
  return db.collection("users");
}


export  function listenToFoundPersonsForAdmin() {
  return db.collection("timeline").doc("type").collection("found");
}

export  function listenToFoundPersonForAdmin(eventId) {
  return db
    .collection("timeline")
    .doc("type")
    .collection("found")
    .doc(eventId);
}

export function deleteUserFromFireStore(id) {
  return db 
  .collection("users")
  .doc(id)
  .delete()
}



//Function for Identfied

export function fetchIdentifiedFromFireStore() {
  return db
  .collection("identified")
}

export function fetchUserIdentified( userUid) {
  return  db.collection("identified").where("missing_owner", '==', userUid || "found_owner", "==", userUid)

}