import { Formik, Form } from "formik";
import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/ModalReducer";
import { registerInFirebase } from "../../app/firebase/firebaseService";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Register to Talash-e-Ghumshuda">
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          phn: "",
        }}
        validationSchema={Yup.object({
          displayName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
          phn: Yup.string().length(10).required(),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="DisplayName" />
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <MyTextInput
              name="phn"
              placeholder="+92XXX-XXXXXXX"
              type="number"
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
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
