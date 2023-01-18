import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/userInfo`, { withCredentials: true });
      setUserInfo(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const updateInfo = async () => {
    try {
      const singup = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/UpdateUserInfo`, userInfo, {
        withCredentials: true,
      });
      console.log(singup.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandel = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const itsMe = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const verify = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/passwordVerify`, user, {
        withCredentials: true,
      });
      setCheck(verify.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    itsMe();
    setShow(false);
  };

  return (
    <>
      <Card className="mx-auto p-3" style={{ width: "70vw" }}>
        <h1>Profile Details</h1>
        <Form id="singupForm">
          <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
            <Form.Control
              onChange={onChangeHandel}
              name="firstName"
              type="text"
              placeholder="First Name"
              value={userInfo.firstName}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
            <Form.Control
              onChange={onChangeHandel}
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={userInfo.lastName}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control
              onChange={onChangeHandel}
              name="email"
              type="email"
              placeholder="name@example.com"
              value={userInfo.email}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number" className="mb-3">
            <Form.Control
              onChange={onChangeHandel}
              name="phoneNumber"
              type="number"
              placeholder="Phone number"
              value={userInfo.phoneNumber}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="New Password" className="mb-3">
            <Form.Control onChange={onChangeHandel} name="password" type="password" placeholder=" New Password" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingConfirmedPassword" label="Confirm New Password" className="mb-3">
            <Form.Control onChange={onChangeHandel} name="confirmPaswword" type="password" placeholder="Confirm New Password" />
          </FloatingLabel>
          <div className="d-flex flex-row align-items-center">
            {check ? (
              <Button onClick={() => updateInfo()} className="button-17 m-1 Success" style={{ color: "green" }}>
                V Update Profile
              </Button>
            ) : (
              <Button onClick={handleShow} className="button-17 m-1">
                Update Profile
              </Button>
            )}
          </div>
        </Form>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lets Make sure its you (:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="loginForm" onSubmit={(e) => onSubmit(e)}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
            <div className="d-flex flex-row align-items-center">
              <Button className="button-17 m-3" type="submit">
                Its Me!
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
