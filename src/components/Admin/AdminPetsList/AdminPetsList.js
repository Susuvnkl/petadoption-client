import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { GetPetsContext } from "../../../context/GetPetsContext";
import EditPet from "../EditPet/EditPet";
import "./AdminPetsList.css";
import ListRow from "./ListRow/ListRow";

export default function AdminPetsList() {
  const { petList, getPetsList } = useContext(GetPetsContext);
  const [rowPetId, setRowPetId] = useState();
  const [petIdFoEdit, setPetIdForEdit] = useState();

  const handleClick = (e, rowPetId) => {
    e.preventDefault();
    setPetIdForEdit(rowPetId);
  };

  useEffect(() => {
    getPetsList();
  }, []);

  return (
    <>
      <h1>Admin Pets List</h1>
      <div id="mainContainer">
        <div id="petsTable">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>pet Id</th>
                <th>type</th>
                <th>name</th>
                <th>adoption Status</th>
                <th>owner Id</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {petList.length > 0 && petList.map((pet, index) => <ListRow key={pet.petId} pet={pet} handleClick={handleClick} />)}
            </tbody>
          </Table>
        </div>
        <div id="petDetails">
          <EditPet petIdFoEdit={petIdFoEdit} />
        </div>
      </div>
    </>
  );
}
