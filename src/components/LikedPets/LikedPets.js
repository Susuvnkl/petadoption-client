import React, { useContext, useEffect, useState } from "react";
import { GetPetsContext } from "../../context/GetPetsContext";
import PetCard from "../PetCard/PetCard";

export default function LikedPets() {
  const { getLikedPets, likedPetsList } = useContext(GetPetsContext);

  useEffect(() => {
    console.log(likedPetsList);
    getLikedPets();
  }, []);

  return likedPetsList?.map((thisPet, i) => <PetCard key={thisPet.petId} pet={thisPet} />);
}
