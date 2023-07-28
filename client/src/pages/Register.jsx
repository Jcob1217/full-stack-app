import { React, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(20)
      .required("Username is a required field"),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
        console.log(data)
    })
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="formContainer">
          <label htmlFor="inputCreatePost">Username</label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputCreatePost" name="username" autoComplete="off" />

          <label htmlFor="inputCreatePost">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field type="password" id="inputCreatePost" name="password" autoComplete="off" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
