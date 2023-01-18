import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { Button, Form, FloatingLabel, Card, InputGroup, Row, Col } from "react-bootstrap/";
import { AuthContext } from "../../../context/AuthContext";
import { useSnackbar } from "notistack";

export default function AddPet() {
  const { token } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
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
    ownerId: "0",
  });
  const [petImg, setPetImg] = useState("");

  const handlePetInfo = (e) => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const petInfoFormData = new FormData();
      petInfoFormData.append("type", petInfo.type);
      petInfoFormData.append("name", petInfo.name);
      petInfoFormData.append("adoptionStatus", petInfo.adoptionStatus);
      petInfoFormData.append("age", petInfo.age);
      petInfoFormData.append("photos", petImg);
      petInfoFormData.append("breed", petInfo.breed);
      petInfoFormData.append("gender", petInfo.gender);
      petInfoFormData.append("height", petInfo.height);
      petInfoFormData.append("weight", petInfo.weight);
      petInfoFormData.append("color", petInfo.color);
      petInfoFormData.append("bio", petInfo.bio);
      petInfoFormData.append("hypoallergenic", petInfo.hypoallergenic);
      petInfoFormData.append("dietaryRestrictions", petInfo.dietaryRestrictions);
      petInfoFormData.append("ownerId", petInfo.ownerId);

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pets`, petInfoFormData, {
        withCredentials: true,
      });
      enqueueSnackbar("Pet added", { autoHideDuration: 2800, variant: "success" }, {});
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Somthing went wrong.", { autoHideDuration: 2800, variant: "error" }, {});
    }
  };

  const handleImage = (e) => {
    setPetImg(e.target.files[0]);
  };

  return (
    <>
      <Card className="mx-auto p-3">
        <h1>Add Pet</h1>
        <form id="singupForm" onSubmit={handleSubmit}>
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
          </Row>
          <Row>
            <Col>
              {" "}
              <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control onChange={handlePetInfo} type="text" value={petInfo.name} placeholder="Name" name="name" />
              </FloatingLabel>
            </Col>
            <Col>
              {" "}
              <FloatingLabel controlId="floatingGender" label="Gender" className="mb-3">
                <Form.Control onChange={handlePetInfo} type="text" value={petInfo.gender} placeholder="Gender" name="gender" />
              </FloatingLabel>
            </Col>
            <Col>
              {" "}
              <FloatingLabel controlId="floatingAge" label="Age" className="mb-3">
                <Form.Control onChange={handlePetInfo} type="text" value={petInfo.age} placeholder="Age" name="age" />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
            <Col>
              {" "}
              <FloatingLabel controlId="floatingColor" label="Color" className="mb-3">
                <Form.Control onChange={handlePetInfo} type="text" value={petInfo.color} placeholder="Color" name="color" />
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
            <input type="file" accept="img/*" onChange={handleImage} />
          </div>
          <div className="d-flex flex-row align-items-center">
            <Button className="button-17 m-1" type="submit">
              Add Pet
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
