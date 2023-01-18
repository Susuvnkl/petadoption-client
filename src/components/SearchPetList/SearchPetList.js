import React, { useEffect, useState } from "react";

import PetCard from "../PetCard/PetCard";

export default function SearchPetList({ searchList }) {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    setPetList(searchList);
  }, [searchList]);

  return petList?.map((thisPet) => <PetCard key={thisPet.petId} pet={thisPet} />);
}
