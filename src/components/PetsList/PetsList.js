import React, { useContext, useEffect, useState } from "react";
import { GetPetsContext } from "../../context/GetPetsContext";
import PetCard from "../PetCard/PetCard";
import "./PetsList.css";

export default function PetsList() {
  const { petList, getPetsList } = useContext(GetPetsContext);

  useEffect(() => {
    getPetsList();
  }, []);

  return petList?.map((thisPet) => <PetCard key={thisPet.petId} pet={thisPet} />);
}
