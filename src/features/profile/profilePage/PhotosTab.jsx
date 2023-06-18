import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Grid, Header, Button, Tab, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../ReactCropper/upload";

import {  updateUserProfilePhoto } from "../../../app/firebase/firestoreService";

export default function PhotosTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);

  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setupdating] = useState({ isUpdating: false, target: null });

  async function handleSetMainPhoto(photo, target) {
    console.log(photo)
    setupdating({ isUpdating: true, target });
    try {
      await  updateUserProfilePhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setupdating({ isUpdating: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Update Profile Picture`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid width={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      basic
                      color="green"
                      content="Main"
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
