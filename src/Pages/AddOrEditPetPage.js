import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddPet from "../components/Admin/Add Pet/AddPet";
import EditPet from "../components/Admin/EditPet/EditPet";

export default function AddOrEditPetPage() {
  const [editPet, setEditPet] = useState(false);

  return (
    <>
      {editPet ? <EditPet /> : <AddPet />}
      <Button className="button-17 m-1" onClick={() => setEditPet(!editPet)}>
        {editPet ? `Add Pet` : `Edit Pet`}
      </Button>
    </>
  );
}

//{somthing && (<asdas>)}
