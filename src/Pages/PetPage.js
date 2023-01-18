import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GetPetsContext } from "../context/GetPetsContext";
import "./PagesStyle/PetPage.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useSnackbar } from "notistack";

export default function PetPage(pet) {
  const { onePet, getPetById, setUpdateStatus } = useContext(GetPetsContext);
  const { loggedUser, loggedUserId } = useContext(AuthContext);
  const [status, setStatus] = useState("");
  const [displyPetInfo, setdisplyPetInfo] = useState({});
  const { search } = window.location;
  const petId = search.replace("?", "");
  const { type, name, adoptionStatus, photos, gender, age, height, weight, color, bio, hypoallergnic, breed } = onePet;
  const [ownerId, setOwnerId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getPetById(petId);
  }, []);

  useEffect(() => {
    setStatus(adoptionStatus);
    setdisplyPetInfo({ name, type, age, gender, breed, color, adoptionStatus, height, weight, hypoallergnic });
    setOwnerId(onePet.ownerId);
  }, [adoptionStatus]);

  const handleAdopt = async () => {
    const user = {
      loggedUserId,
      action: `Adopted`,
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/adopt`, user, {
        withCredentials: true,
      });
      console.log(res.data);
      setStatus("Adopted");
      setOwnerId(loggedUserId);
      setUpdateStatus(true);
      enqueueSnackbar("Amazing! Now im yours!", { autoHideDuration: 2800, variant: "success" }, {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleFoster = async () => {
    const user = {
      loggedUserId,
      action: `Fostered`,
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/adopt`, user, {
        withCredentials: true,
      });
      console.log(res.data);
      setStatus("Fostered");
      setOwnerId(loggedUserId);
      setUpdateStatus(true);
      enqueueSnackbar("Wohoo! lets hang out for a while", { autoHideDuration: 2800, variant: "success" }, {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async () => {
    const action = {
      action: `Available`,
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/pets/${petId}/return`, action, {
        withCredentials: true,
      });
      console.log(res.data);
      setStatus("Available");
      setUpdateStatus(true);
      enqueueSnackbar(":(", { autoHideDuration: 3200, variant: "default" }, {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="petPage">
      <div id="petsInfo">
        {" "}
        <div className="card">
          <img src={photos} className="card__image" alt="" />
          <h1 id="nameAge">
            {name} {age} y/o
          </h1>
          {(status === "Adopted" || status === "Fostered") && loggedUserId == ownerId ? (
            <h1 id="imYours">I am your's :)</h1>
          ) : (
            <h1 id="adoptionStatusPetPage">{status}</h1>
          )}
          <div className="card__header">
            {/* <img className="card__thumb" src={Dog} alt="" /> */}
            <p className="card__description">{bio}</p>
            <div id="statusButtons">
              {status === "Available" && (
                <>
                  <Button
                    className="button-17 m-2"
                    onClick={() => {
                      handleAdopt();
                    }}
                  >
                    Adopt
                  </Button>
                  <Button
                    className="button-17 m-2"
                    onClick={() => {
                      handleFoster();
                      // setUpdateStatus(true);
                      // enqueueSnackbar("Wohoo! lets hang out for a while", { autoHideDuration: 2800, variant: "success" }, {});
                    }}
                  >
                    Foster
                  </Button>
                </>
              )}
              {status === "Fostered" && loggedUserId === ownerId && (
                <>
                  <Button
                    className="button-17 m-2"
                    onClick={() => {
                      handleAdopt();
                      setUpdateStatus(true);
                      // setOwnerId(loggedUserId);
                    }}
                  >
                    Adopt
                  </Button>
                  <Button
                    className="button-17 m-2"
                    onClick={() => {
                      handleReturn();
                      setUpdateStatus(true);
                      // setOwnerId(0);
                    }}
                  >
                    Return
                  </Button>
                </>
              )}
              {status === "Adopted" && loggedUserId === ownerId && (
                <>
                  <Button
                    className="button-17 m-2"
                    onClick={() => {
                      handleReturn();
                      setUpdateStatus(true);
                      // setOwnerId(0);
                    }}
                  >
                    Return
                  </Button>
                </>
              )}
              {(status === "Adopted" || status === "Fostered") && loggedUserId !== ownerId && (
                <>
                  <div>
                    <h3>Sorry This beautiful creature already found his home</h3>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <ul id="petInfoList" className="d-flex flex-row m-3">
              {displyPetInfo &&
                Object?.entries(displyPetInfo).map(([key, value]) => (
                  <li id="petInfoItem">
                    {key} : {value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
