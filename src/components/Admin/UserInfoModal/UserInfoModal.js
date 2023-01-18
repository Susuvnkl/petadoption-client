import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PetCard from "../../PetCard/PetCard";

export default function UserInfoModal({ setShowModal, user }) {
  const [show, setShow] = useState(true);
  const [userPetsList, setUserPetsList] = useState([]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setShow(false);
  };

  const getPetByUserId = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets/user/admin/${user.user.userId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setUserPetsList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPetByUserId();
  }, [user.user.userId]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {user.firstName} {user.lastName} Information{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userPetsList?.map((thisPet) => (
            <PetCard key={thisPet.petId} pet={thisPet} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
