/*global google*/
import React, { useState } from "react";
import { Button, Container, Header, Segment, Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { listenToMissingPersons } from "../adminActions";
import { listenToMissingPersonForAdmin } from "../../app/firebase/firestoreService";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";

export default function AdminEditMissingPerson({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.admin.missingPersons.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.async);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const db = firebase.firestore();

  const [loadingLocal, setLoading] = useState(false);
  const regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

  const initialValues = selectedEvent ?? {
    name: "",
    nickName: "",
    gender: "",
    height: "",
    weight: "",
    dob: "",
    dateofMissing: "",
    complexion: "",
    physicalAppearence: "",
    hairStyle: "",
    description: "",
    phoneNumber: "",
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
    weight: Yup.string().required("You must provide a weight"),
    dob: Yup.string().required(),
    dateofMissing: Yup.string().required(),
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
    query: () => listenToMissingPersonForAdmin(match.params.id),
    data: (event) => dispatch(listenToMissingPersons([event])),
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
          setMissingPersonPhoto(downloadURL);
          setTimeLineMissingPhoto(downloadURL)
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
    
    return db
      .collection("posts")
      .doc(selectedEvent.ownerId)
      .collection("missing")
      .doc(match.params.id)
      .update({
        ...event,
        postId: match.params.id,
        ownerId: selectedEvent.ownerId,
        postedBy: selectedEvent.username || selectedEvent.postedBy,
        mediaUrl: null,
        city: event.city.address,
        address: event.venue.address,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  function updateFunctionInTimeLine(event) {
    return db
      .collection("timeline")
      .doc("type")
      .collection("missing")
      .doc(match.params.id)
      .update({
        ...event,
        postId: match.params.id,
        ownerId: selectedEvent.ownerId,
        postedBy: selectedEvent.username || selectedEvent.postedBy,
        mediaUrl: null,
        city: event.city.address,
        address: event.venue.address,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  async function setMissingPersonPhoto(downloadURL) {
    
    try {
      return await db
        .collection("posts")
        .doc(selectedEvent.ownerId)
        .collection("missing")
        .doc(match.params.id)
        .update({
          mediaUrl: downloadURL,
        });
    } catch (error) {
      throw error;
    }
  }

  async function setTimeLineMissingPhoto(downloadURL) {
    return db
      .collection("timeline")
      .doc("type")
      .collection("missing")
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
            updateFunctionInTimeLine(values);
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
              <Header sub color="teal" content="Add Missing Person Details" />
              <MyTextInput name="name" placeholder="FullName" />
              <MyTextInput name="nickName" placeholder=" NickName" />
              <MySelectInput
                name="gender"
                placeholder="Gender"
                options={gender}
              />
              <MyTextInput name="height" placeholder="Height" />
              <MyTextInput name="weight" placeholder="Weight" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <MyDateInput
                  name="dob"
                  placeholderText="Date of Birth"
                  type="date"
                  dateFormat="MMM d, yyyy h, mm a"
                />

                <MyDateInput
                  name="dateofMissing"
                  placeholderText="Date of Missing"
                  type="date"
                  timeFormat="HH:mm"
                  showTimeSelect
                  timeCaption="time"
                  dateFormat="MMM d, yyyy h, mm a"
                />
              </div>
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
                name="address"
                placeholder="Address"
                disabled={!values.city.latLng}
                options={{
                  location: new google.maps.LatLng(values.city.latLng),
                  radius: 1000,
                  types: ["establishment"],
                }}
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
