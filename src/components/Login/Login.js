import axios from "axios";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

export default function Login({ onHide, setSignUp }) {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const { setToken, setLoggedUser, setAdmin, setLoggedUserId } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (e) => {
    e.preventDefault();
    onHide();
    const user = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, user, { withCredentials: true });
      console.log(res.data);
      if (res.data.role === "admin") {
        setAdmin(true);
        setToken(res.data.token);
        setLoggedUser(res.data.userName);
        setLoggedUserId(res.data.userId);
        enqueueSnackbar(`Hello ${res.data.userName}, you logged in as admin`, { autoHideDuration: 2000, variant: "success" }, {});
      } else if (res.data.token) {
        setToken(res.data.token);
        setLoggedUser(res.data.userName);
        setLoggedUserId(res.data.userId);
        enqueueSnackbar(`Hello ${res.data.userName}`, { autoHideDuration: 2000, variant: "success" }, {});
      }
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar(err.response.data, { autoHideDuration: 2000, variant: "error" }, {});
    }
  };

  const changToSingup = () => {
    setSignUp(false);
  };
  return (
    <>
      <Form id="loginForm" onSubmit={onSubmit}>
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
            Login
          </Button>
          <p className="m-0" onClick={changToSingup}>
            Don't have a user?
          </p>
        </div>
      </Form>
    </>
  );
}
