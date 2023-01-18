import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const GetPetsContext = createContext();

export default function GetPetsContextProvider({ children }) {
  const { loggedUserId } = useContext(AuthContext);
  const [petList, setPetList] = useState([]);
  const [onePet, setOnePet] = useState("");
  const [likedPetsList, setLikedPetsList] = useState([]);
  const [loggedUserPetList, setloggedUserPetList] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(true);

  const getPetsList = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets`, { withCredentials: true });
      setPetList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPetById = async (petId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets/${petId}`, { withCredentials: true });
      console.log(res.data);
      setOnePet(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPetsList();
  }, []);

  const getPetByUserId = async (userId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets/user/${userId}`, { withCredentials: true });
      setloggedUserPetList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPetByUserId();
    setUpdateStatus(false);
  }, [updateStatus]);

  useEffect(() => {
    getPetByUserId();
  }, [loggedUserId]);

  const getLikedPets = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets/get/likedPets`, { withCredentials: true });
      setLikedPetsList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GetPetsContext.Provider
      value={{
        petList,
        getPetsList,
        onePet,
        getPetById,
        getPetByUserId,
        loggedUserPetList,
        getLikedPets,
        likedPetsList,
        setLikedPetsList,
        setUpdateStatus,
      }}
    >
      {children}
    </GetPetsContext.Provider>
  );
}
