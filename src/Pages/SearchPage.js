import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Dropdown, Container, InputGroup, Row } from "react-bootstrap/";
import PetsList from "../components/PetsList/PetsList";
import PhotoSlider from "../components/PhotoSlider/PhotoSlider";
import SearchPetList from "../components/SearchPetList/SearchPetList";
import "./PagesStyle/SearchPage.css";
import { useSnackbar } from "notistack";

export default function SearchPage() {
  const [searchList, setSearchList] = useState([]);
  const [advanced, setAdvanced] = useState(false);
  const [adoptionStatus, setAdoptionStatus] = useState(["Available"]);
  const [serachOptions, setSearchOptions] = useState([]);
  //
  const [type, setType] = useState([]);
  //
  const [adopted, setAdopted] = useState(true);
  const [foster, setFoster] = useState(true);
  const [available, setAvailable] = useState(true);
  //
  const [name, setName] = useState("");
  const [Weight, setWeight] = useState([]);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(50);
  const [Height, setHeight] = useState([0, 50]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setWeight([minSize, maxSize]);
  }, [minSize, maxSize]);

  useEffect(() => {
    setAdoptionStatus([adopted ? "Adopted" : "", available ? "Available" : "", foster ? "Fostered" : ""]);
  }, [adopted, available, foster]);

  const handleSearch = async () => {
    advancedSearch();
  };

  const advancedSearch = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/pets/search`,
        { params: { adoptionStatus, name, Weight, Height, type } },
        { withCredentials: true }
      );
      setSearchList(res.data);
      console.log(res.data);
      res.data.length == 0 &&
        enqueueSnackbar("Couldn't find pet that metch to your search", { autoHideDuration: 3800, variant: "info" }, {});
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOption = (e, index) => {
    e.preventDefault();
    setSearchOptions(serachOptions.filter((item, newIndex) => newIndex !== index));
    setType(type.filter((item, newIndex) => newIndex !== index));
  };

  console.log(window.scrollY);
  console.log(window.pageYOffset);

  return (
    <>
      <div id="pageContainer">
        <div className="w-100 d-flex flex-column align-items-center">
          <img id="searchImg" src={require("./PagesStyle/searchDogs.png")}></img>
        </div>
        <div id="serachAndList">
          <Container className="d-flex align-items-center justify-content-around flex-column">
            <Form>
              <div className="d-flex flex-column">
                <div id="basicOrAdvanced" className="d-flex justify-content-center w-25 m-auto">
                  {" "}
                  <Form.Check
                    label="Advanced Search"
                    onChange={() => setAdvanced(!advanced)}
                    className="m-3 text-nowrap"
                    type="switch"
                    id="custom-switch"
                  />
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <Dropdown className="m-2">
                    <Dropdown.Toggle
                      className=" my-3 d-flex align-items-center justify-content-center button-17"
                      id="dropdown-basic"
                      title="Pet Type"
                    >
                      Pet Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setType([...type, `Dog`]);
                          setSearchOptions([...serachOptions, `Dog`]);
                        }}
                      >
                        Dog
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setType([...type, `Cat`]);
                          setSearchOptions([...serachOptions, `Cat`]);
                        }}
                      >
                        Cat
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setType([...type, `Cow`]);
                          setSearchOptions([...serachOptions, `Cow`]);
                        }}
                      >
                        Cow
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {/* </DropdownButton> */}
                  </Dropdown>
                  {advanced && (
                    <Dropdown className="m-2">
                      <Dropdown.Toggle
                        className=" my-3 d-flex align-items-center justify-content-center button-17"
                        id="dropdown-basic"
                        title="Pet Type"
                      >
                        Pet Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu id="statusContainer">
                        <Form.Group className="mb-1" controlId="formBasicCheckbox">
                          <Form.Check defaultChecked onChange={() => setAdopted(!adopted)} type="checkbox" label="Adopted" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox">
                          <Form.Check defaultChecked onChange={() => setFoster(!foster)} type="checkbox" label="Foster" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox">
                          <Form.Check
                            defaultChecked
                            onChange={() => setAvailable(!available)}
                            type="checkbox"
                            label="Available"
                          />
                        </Form.Group>
                      </Dropdown.Menu>
                      {/* </DropdownButton> */}
                    </Dropdown>
                  )}
                </div>
              </div>
              {advanced && (
                <div>
                  <Row>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => {
                          setName(`${e.target.value}`);
                        }}
                        value={name.name}
                        name="name"
                        type="text"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                  </Row>
                  {/* <Row id="Status">
                    <Col>
                      {" "}
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check defaultChecked onChange={() => setAdopted(!adopted)} type="checkbox" label="Adopted" />
                      </Form.Group>
                    </Col>
                    <Col>
                      {" "}
                      <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicCheckbox">
                        <Form.Check defaultChecked onChange={() => setFoster(!foster)} type="checkbox" label="Foster" />
                      </Form.Group>
                    </Col>
                    <Col>
                      {" "}
                      <Form.Group className="mb-3 d-flex justify-content-end" controlId="formBasicCheckbox">
                        <Form.Check defaultChecked onChange={() => setAvailable(!available)} type="checkbox" label="Available" />
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    <PhotoSlider
                      min={0}
                      max={50}
                      onChange={({ min, max }) => {
                        setMinSize(min);
                        setMaxSize(max);
                      }}
                    />
                  </Row>
                </div>
              )}
              <Row>
                <Button onClick={handleSearch} className="m-0 button-17">
                  Search
                </Button>
              </Row>
              <Row>
                <div id="serachOptionsContainer">
                  {serachOptions &&
                    serachOptions.map((option, index) => (
                      <div id="serachOptions" key={index}>
                        <h5>{option}</h5>
                        <button
                          id="serachOptionsButton"
                          onClick={(e) => {
                            deleteOption(e, index);
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                </div>
              </Row>
            </Form>
          </Container>
          <div id="petListContainer">
            {searchList.length == 0 && <PetsList />}
            {searchList.length > 0 && <SearchPetList searchList={searchList} />}
          </div>
        </div>
      </div>
    </>
  );
}
