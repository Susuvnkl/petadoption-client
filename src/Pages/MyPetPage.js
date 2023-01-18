import React, { useState } from "react";
import { ButtonGroup, Button, Form, Dropdown, DropdownButton, Container, InputGroup, Row, Col } from "react-bootstrap/";

import LikedPets from "../components/LikedPets/LikedPets";
import LoggedUserPets from "../components/LoggedUserPets/LoggedUserPets";

export default function MyPetPage() {
  const [likedPets, setLikedPets] = useState(false);
  return (
    <div className="m-5">
      <Form.Check
        label="Show Liked Pets"
        onChange={() => setLikedPets(!likedPets)}
        className="m-3"
        type="switch"
        id="custom-switch"
      />
      <div id="petListContainer">
        {!likedPets && <LoggedUserPets />}
        {likedPets && <LikedPets />}
      </div>
    </div>
  );
}
