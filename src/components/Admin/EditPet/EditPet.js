import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Form, FloatingLabel, Card, InputGroup, Row, Col } from "react-bootstrap/";
import { GetPetsContext } from "../../../context/GetPetsContext";
import { AuthContext } from "../../../context/AuthContext";
import AddPet from "../Add Pet/AddPet";
import "./EditPet.css";

export default function EditPet(petIdFoEdit) {
  const { onePet, getPetById, setPetList } = useContext(GetPetsContext);
  const [petInfo, setPetInfo] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    age: "",
    photos: "",
    breed: "",
    gender: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
    ownerId: "",
  });

  useEffect(() => {
    getPetById(petIdFoEdit.petIdFoEdit);
  }, [petIdFoEdit.petIdFoEdit]);

  useEffect(() => {
    setPetInfo(onePet);
  }, [onePet]);

  const handlePetInfo = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/pets/:${petIdFoEdit}`, petInfo, { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const adminDeletePet = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/pets/:${petInfo.petId}`, { withCredentials: true });
      console.log(res.data);
      // setPetList()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!petInfo && <AddPet />}
      {petInfo && (
        <Card className="mx-auto p-3">
          <form id="singupForm" onSubmit={handleSubmit}>
            <Row>
              <h1 id="headerName">Edit {petInfo.name}</h1>
              <img id="editPetPhoto" src={petInfo.photos} className="card__image" alt="" />
            </Row>
            <Row>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingType" label="Type" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.type} placeholder="Type" name="type" />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingBreed" label="Breed" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.breed} placeholder="Breed" name="breed" />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.name} placeholder="Name" name="name" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingHeight" label="Height(cm)" className="mb-3">
                  <Form.Control
                    onChange={handlePetInfo}
                    type="number"
                    value={petInfo.height}
                    placeholder="Height(cm)"
                    name="height"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingWeight" label="weight(kg)" className="mb-3">
                  <Form.Control
                    onChange={handlePetInfo}
                    type="number"
                    value={petInfo.weight}
                    placeholder="weight(kg)"
                    name="weight"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.age} placeholder="Age" name="age" />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingColor" label="Color" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.color} placeholder="Color" name="color" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
                  <Form.Control onChange={handlePetInfo} type="text" value={petInfo.gender} placeholder="Gender" name="gender" />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingAdoptionStatus" label="Adoption Status" className="mb-3">
                  <Form.Control
                    onChange={handlePetInfo}
                    type="text"
                    value={petInfo.adoptionStatus}
                    placeholder="Adoption Status"
                    name="adoptionStatus"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                {" "}
                <FloatingLabel controlId="floatingHypoallergenic" label="Hypoallergenic(Y/N)" className="mb-3">
                  <Form.Control
                    onChange={handlePetInfo}
                    type="text"
                    value={petInfo.hypoallergenic}
                    placeholder="Hypoallergenic(Yes/No)"
                    name="hypoallergenic"
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel controlId="floatingDietaryRestrictions:" label="Dietary Restrictions" className="mb-3">
              <Form.Control
                onChange={handlePetInfo}
                type="text"
                value={petInfo.dietaryRestrictions}
                placeholder="Dietary Restrictions"
                name="dietaryRestrictions"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingAddBio" className="mb-3">
              <p className="mb-1">Add Bio:</p>
              <InputGroup>
                <Form.Control onChange={handlePetInfo} as="textarea" value={petInfo.bio} aria-label="With textarea" name="bio" />
              </InputGroup>
            </FloatingLabel>
            <div id="uploadPhotoImput">
              <input type="file" />
              <button id="uploadBtn">Upload Image</button>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Button className="button-17 m-1" type="submit">
                Edit
              </Button>
              <Button className="button-17 m-1" onClick={adminDeletePet}>
                Delete Pet(admin)
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
