/*global google*/
import React, { useState } from "react";
import { Button, Container, Header, Segment, Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyPlaceInput from "../../app/common/forms/MyPlaceInput";
import MyTextInput from "../../app/common/forms/MyTextInput";
import MyTextArea from "../../app/common/forms/MyTextArea";
import MySelectInput from "../../app/common/forms/MySelectInput";
import {
  gender,
  complexion,
  physicalAppearence,
  hairStyle,
} from "../../app/api/categoryOptions";
import MyDateInput from "../../app/common/forms/MyDateInput";
import LoadingComponent from "../../app/Layout/LoadingComponent";
import { toast } from "react-toastify";
import { getFileExtension } from "../../app/utils/util";
import PhotoWidgetDropzone from "../../app/common/photos/PhotoWidgetDropzone";
import PhotoWidgetCropper from "../../app/common/photos/PhotoWidgetCropper";
import firebase from "../../app/config/firebase";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { listenToFoundPerson } from "../AddFoundPerson/AddFoundPersonActions";
import { ListenToFoundPersonFromFirestore } from "../../app/firebase/firestoreService";

export default function AddFoundPerson({ history, match }) {
  const { loading, error } = useSelector((state) => state.async);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const db = firebase.firestore();

  const selectedEvent = useSelector((state) =>
    state.FoundPerson.FoundPerson.find((e) => e.id === match.params.id)
  );
  const dispatch = useDispatch();

  const [loadingLocal, setLoading] = useState(false);

  const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

  const initialValues = selectedEvent ?? {
    name: "",
    nickName: "",
    gender: "",
    height: "",
    weight: "",
    age: "",
    dateFound: "",
    complexion: "",
    physicalAppearence: "",
    hairStyle: "",
    description: "",
    phoneNumber: "",
    policeStationWhereReported: "",
    NGOWhereSubmitted: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("You must a provide a Name"),
    nickName: Yup.string().required("You must a provide a NickName"),
    gender: Yup.string().required("You must a provide a Gender"),
    height: Yup.string().required("You must provide a Height"),
    age: Yup.string().required(
      "Please Provide Approximate Age of person found"
    ),
    weight: Yup.string().required(),
    dateFound: Yup.string().required(),
    complexion: Yup.string().required(
      "You must provide complexion of missing person"
    ),
    physicalAppearence: Yup.string().required(
      "You must provide physicalAppearence of missing person"
    ),
    hairStyle: Yup.string().required(
      "You must provide hairstyle of missing person"
    ),
    description: Yup.string().required(),

    phoneNumber: Yup.string().matches(regex, "Please enter valid phoneNumber"),

    // city: Yup.object().shape({
    //   address: Yup.string().required("City is Required"),
    // }),

    // venue: Yup.object().shape({
    //   address: Yup.string().required("Venue is required"),
    // }),
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => ListenToFoundPersonFromFirestore(match.params.id),
    data: (event) => dispatch(listenToFoundPerson([event])),
    deps: [match.params.id, dispatch],
  });

  function handleUploadImage() {
    setLoading(true);
    const filename = "." + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        toast.error(error.messege);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setFoundPersonPhoto(downloadURL);
          setTimeLineFoundPhoto(downloadURL)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
  }
  function uploadToFirebaseStorage(file, filename) {
    console.log(file);
    const storageRef = firebase.storage().ref();
    return storageRef.child(`post_${match.params.id}.jpg`).put(file);
  }

  function updateFunctionInFirestore(event) {
    const user = firebase.auth().currentUser;

    return db
      .collection("posts")
      .doc(user.uid)
      .collection("found")
      .doc(match.params.id)
      .update({
        ...event,
        postId: match.params.id,
        ownerId: user.uid,
        postedBy: user.displayName,
        mediaUrl: null,
        city: event.city.address,
        location: event.venue.address,
        type: true,
        docType: "found",
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }
  function updateFunctionInTimeline(event) {
    const user = firebase.auth().currentUser;
    return db
      .collection("timeline")
      .doc("type")
      .collection("found")
      .doc(match.params.id)
      .update({
        ...event,
        postId: match.params.id,
        ownerId: user.uid,
        postedBy: user.displayName,
        mediaUrl: null,
        city: event.city.address,
        location: event.venue.address,
        type: false,
        docType: "found",
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  async function setFoundPersonPhoto(downloadURL) {
    const user = firebase.auth().currentUser;
    try {
      return await db
        .collection("posts")
        .doc(user.uid)
        .collection("found")
        .doc(match.params.id)
        .update({
          mediaUrl: downloadURL,
        });
    } catch (error) {
      throw error;
    }
  }

  async function setTimeLineFoundPhoto(downloadURL) {
    return db
      .collection("timeline")
      .doc("type")
      .collection("found")
      .doc(match.params.id)
      .update({
        mediaUrl: downloadURL,
      });
  }

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateFunctionInFirestore(values);
            updateFunctionInTimeline(values);
            handleUploadImage();
            history.push("/");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Container>
            <Form className="ui form">
              <Header sub color="teal" content="Add Found Person Details" />
              <MyTextInput name="name" placeholder="FullName" />
              <MyTextInput name="nickName" placeholder=" NickName" />
              <MySelectInput
                name="gender"
                placeholder="Gender"
                options={gender}
              />
              <MyTextInput name="age" placeholder="Age" />
              <MyTextInput name="height" placeholder="Height" />
              <MyTextInput name="weight" placeholder="Weight" />

              <MyDateInput
                name="dateFound"
                placeholderText="DateFound"
                type="date"
                timeFormat="HH:mm"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h, mm a"
              />

              <MySelectInput
                name="complexion"
                placeholder="Complexion"
                options={complexion}
              />
              <MySelectInput
                name="physicalAppearence"
                placeholder="Physical Appearence"
                options={physicalAppearence}
              />
              <MySelectInput
                name="hairStyle"
                placeholder="HairStyle"
                options={hairStyle}
              />

              <MyTextArea
                name="description"
                placeholder="Any further description about missing person such Mentally Fit or etc."
                rows="3"
              />
              <Header sub color="teal" content="Contact Details" />
              <MyTextInput name="phoneNumber" placeholder="PhoneNumber" />
              <Header sub color="teal" content="Location Details" />
              <MyPlaceInput name="city" placeholder="City" />
              <MyPlaceInput
                name="venue"
                placeholder="Address"
                disabled={!values.city.latLng}
                options={{
                  location: new google.maps.LatLng(values.city.latLng),
                  radius: 1000,
                  types: ["establishment"],
                }}
              />

              <MyTextInput
                name="policeStationWhereReported"
                placeholder="policeStationWhereReported"
              />
              <MyTextInput
                name="NGOWhereSubmitted"
                placeholder="NGO Where Submitted"
              />

              <Grid>
                <Grid.Column width={4}>
                  <Header
                    color="teal"
                    sub
                    content="Step 1 - Add Missing Person Photo"
                  />
                  <PhotoWidgetDropzone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                  <Header color="teal" sub content="Step 2 - Resize" />
                  {files.length > 0 && (
                    <PhotoWidgetCropper
                      setImage={setImage}
                      imagePreview={files[0].preview}
                    />
                  )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                  <Header
                    color="teal"
                    sub
                    content="Step 3 - Preview & upload"
                  />
                  {files.length > 0 && (
                    <>
                      <div
                        className="img-preview"
                        style={{
                          minHeight: 200,
                          minWidth: 200,
                          overflow: "hidden",
                        }}
                      />
                      <Button.Group>
                        <Button
                          disabled={loadingLocal}
                          onClick={handleCancelCrop}
                          style={{ width: 100 }}
                          icon="close"
                        />
                      </Button.Group>
                    </>
                  )}
                </Grid.Column>
              </Grid>

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                floated="right"
                positive
                content="Submit"
              />
              <Button
                disabled={isSubmitting}
                as={Link}
                to="/events"
                type="submit"
                floated="right"
                content="Cancel"
              />
            </Form>
          </Container>
        )}
      </Formik>
    </Segment>
  );
}
