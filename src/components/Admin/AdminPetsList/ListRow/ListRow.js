import React from "react";
import { Button } from "react-bootstrap";

export default function ListRow({ pet, handleClick }) {
  //   const handleSubmit = () => {};
  return (
    <tr key={pet.petId}>
      <td>{pet.petId}</td>
      <td>{pet.type}</td>
      <td>{pet.name}</td>
      <td>{pet.adoptionStatus}</td>
      <td>{pet.ownerId}</td>
      <td>
        <Button
          onClick={(e) => {
            handleClick(e, pet.petId);
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}
