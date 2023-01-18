import React, { useState, useContext, useEffect } from "react";
import "./PetCard.css";
import { useNavigate } from "react-router-dom";
import Heart from "./Heart.svg";
import HeartBeforeLike from "./HeartBeforeLike.svg";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { GetPetsContext } from "../../context/GetPetsContext";

export default function PetCard(pet) {
  const { loggedUserId } = useContext(AuthContext);
  const { likedPetsList, setLikedPetsList } = useContext(GetPetsContext);
  const navigate = useNavigate();
  const { height, weight, color, type, age, adoptionStatus, name, breed, petId, photos } = pet.pet;
  const [liked, setLiked] = useState(false);
  const goToPetPage = () => {
    navigate(`/pets/?${petId}`);
  };

  const checkIfLiked = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/doesLiked`, { withCredentials: true });
      res.data == [] ? setLiked(false) : setLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, []);

  const likeButtonHandler = async () => {
    if (!loggedUserId) {
      window.alert(`Only users can like pets :)`);
    } else {
      setLiked(!liked);
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/like`, {}, { withCredentials: true });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const dislikeLocaly = () => {
    const pop = likedPetsList.map((pet) => pet.petId).indexOf(petId);
    const newList = [...likedPetsList];
    newList.filter((pet, i) => i !== pop);
    setLikedPetsList(newList.filter((pet, i) => i !== pop));
  };

  const dislikeButtonHandler = async (setLikedPetsList) => {
    setLiked(!liked);

    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/like`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="my-1 mx-auto" id="petCardContainer">
        <div href={petId} className="card">
          <div>
            <h1 id="adoptionStatus">{adoptionStatus}</h1>
            {liked && (
              <img
                id="heartSvg"
                onClick={() => {
                  dislikeButtonHandler();
                  dislikeLocaly();
                }}
                src={Heart}
                alt="heart_logo"
              ></img>
            )}
            {!liked && <img id="heartSvg" onClick={likeButtonHandler} src={HeartBeforeLike} alt="heart_logo"></img>}
            <img src={photos} className="card__image" alt="" />
          </div>
          <div className="card__header">
            <div id="textAndButton">
              <div className="card__header-text">
                <h3 className="card__title">
                  {name}, {age} y/o
                </h3>
                <span className="card__tagline">
                  {breed} , {color}
                </span>
                <span className="card__tagline">
                  Height:{height}cm, Weight:{weight}kg
                </span>
              </div>
              <button onClick={goToPetPage} id="cardButton" className="button-17 ">
                More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
