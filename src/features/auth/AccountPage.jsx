import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Button,
  Label,
  Container,
  Grid,
} from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { updateUserPassword } from "../../app/firebase/firebaseService";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    // <Segment style={{margin:'100px 200px 0px 200px'}}>
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser.providerId === "password" && (
        <div>
          <Header color="teal" sub content="change Passsword" />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword1: "", newPassword2: "" }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required(),
              newPassword2: Yup.string().oneOf(
                [Yup.ref("newPassword1"), null],
                "passsword donot match"
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  placeholder="New Password"
                />
                <MyTextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    styles={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}
                <Button
                  style={{ display: "block" }}
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  size="large"
                  loading={isSubmitting}
                  positive
                  content="Update Password"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
      {currentUser.providerId === "facebook.com" && (
        <div>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please Visit facebook to update your accout</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="Go to Facebook"
          />
        </div>
      )}

      {currentUser.providerId === "google.com" && (
        <Grid>
          <Grid.Column width={16}>
              <Container>
            <Segment
             
            >
              <Grid>
                <Grid.Column width={12}>
                
                    <Header color="teal" sub content="Google Account" />
                    <p>Please Visit Gmail to update your accout</p>
                    <Button
                      icon="google"
                      color="google plus"
                      as={Link}
                      to="https://facebook.com"
                      content="Go to Google"
                    />
               
                </Grid.Column>
              </Grid>
            </Segment>
            </Container>
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
}
