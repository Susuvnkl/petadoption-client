import React, { useContext, useEffect, useState } from "react";
import { GetPetsContext } from "../../context/GetPetsContext";
import PetCard from "../PetCard/PetCard";
import "./LoggedUserPets.css";

export default function LoggedUserPets() {
  const { loggedUserPetList } = useContext(GetPetsContext);

  return loggedUserPetList?.map((thisPet, i) => <PetCard key={thisPet.petId} pet={thisPet} />);
}
