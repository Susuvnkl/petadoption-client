import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

export default function SignUp({ onHide, setLogin }) {
  const [newUserInfo, setNewUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPaswword: "",
  });

  const singup = async () => {
    try {
      const singup = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, newUserInfo);
      console.log(singup.data);
      changToLogin();
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    singup();
  };

  const onChangeHandel = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const changToLogin = () => {
    setLogin(true);
  };

  return (
    <>
      <Form id="singupForm" onSubmit={onSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="email" type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="password" type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingConfirmedPassword" label="Confirm Password" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="confirmPaswword" type="password" placeholder="Confirm Password" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="firstName" type="text" placeholder="First Name" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="lastName" type="text" placeholder="Last Name" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number" className="mb-3">
          <Form.Control onChange={onChangeHandel} name="phoneNumber" type="number" placeholder="Phone number" />
        </FloatingLabel>
        <div className="d-flex flex-row align-items-center">
          <Button className="button-17 m-3" type="submit">
            Singup
          </Button>
          <p className="m-0" onClick={changToLogin}>
            Have a user?
          </p>
        </div>
      </Form>
    </>
  );
}
