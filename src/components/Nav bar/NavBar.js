import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import "./NavBar.css";
import SignUp from "../SignUp/SignUp";
import { Nav, Navbar, Modal, Dropdown, Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Logo from "../../SVG/Logo.svg";
import SearchPaw from "../../SVG/SearchPaw.svg";
import ProfileIcon from "../../SVG/ProfileIcon.svg";

export default function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [displayLoginInModal, setDisplayLoginInMoadal] = useState(true);
  const { admin, loggedUser, setToken, setLoggedUser, setAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [checked, setChecked] = useState(false);
  // const [showNav, setShowNav] = useState(true);

  const deleteCookie = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users`, { withCredentials: true });
    console.log(res.data);
  };

  const handleLogeOut = () => {
    setToken("");
    setAdmin(false);
    setLoggedUser("");
    deleteCookie();
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;
      if (currentScrollPos === 0) {
        setIsNavbarVisible(true);
      } else if (visible) {
        setIsNavbarVisible(true);
      } else if (!visible) {
        setIsNavbarVisible(false);
      }
      setPrevScrollpos(currentScrollPos);
      console.log(1, currentScrollPos, 2, prevScrollpos, 3, visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);
  return (
    <>
      <Navbar className={`${isNavbarVisible ? "fadeIn" : "fadeOut"}`}>
        <Container id="navBarContainer">
          <img id="logoImg" onClick={() => navigate("/")} src={Logo} alt="Logo"></img>
          <img id="SearchPawImg" onClick={() => navigate("/search")} src={SearchPaw} alt="SearchPaw"></img>

          <Nav id="navBar" className="me-auto" defaultActiveKey="/">
            {loggedUser ? (
              <>
                <div id="desktopButton">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" className="button-17" id="dropdown-basic">
                      {loggedUser}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate("/MyPets")}>My Pets</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/profile")}>Profile Page</Dropdown.Item>
                      {admin && (
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/Admin");
                          }}
                        >
                          Admin Page
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item onClick={handleLogeOut}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div id="humburgerMenu">
                  <section className="p-menu1">
                    <nav id="navbar" className="navigation" role="navigation">
                      <input id="toggle1" type="checkbox" checked={checked} />
                      <label onClick={() => setChecked(!checked)} className="hamburger1" htmlFor="toggle1">
                        <div className="top"></div>
                        <div className="meat"></div>
                        <div className="bottom"></div>
                      </label>
                      <nav className="menu1">
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/MyPets");
                            setChecked(!checked);
                          }}
                        >
                          My Pets
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/profile");
                            setChecked(!checked);
                          }}
                        >
                          Profile Page
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogeOut}>Log Out</Dropdown.Item>
                      </nav>
                    </nav>
                  </section>
                </div>
              </>
            ) : (
              <>
                <button id="loginBtn" className="button-17" onClick={handleShow}>
                  Login or Signup
                </button>
                <img id="profileIcon" src={ProfileIcon} onClick={handleShow} alt="Profile Icon"></img>
              </>
            )}
            {/* </div> */}
          </Nav>
          <Modal id="modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              {displayLoginInModal && <Login onHide={handleClose} setSignUp={setDisplayLoginInMoadal} />}
              {!displayLoginInModal && <SignUp onHide={handleClose} setLogin={setDisplayLoginInMoadal} />}
            </Modal.Body>
          </Modal>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
