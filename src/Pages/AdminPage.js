import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import AddPet from "../components/Admin/Add Pet/AddPet";
import AdminPetsList from "../components/Admin/AdminPetsList/AdminPetsList";
import UsersList from "../components/Admin/UsersList/UsersList";
import PetsList from "../components/PetsList/PetsList";
import { AuthContext } from "../context/AuthContext";
import AddOrEditPetPage from "./AddOrEditPetPage";
import "./PagesStyle/AdminPage.css";

export default function AdminPage() {
  const { loggedUser } = useContext(AuthContext);
  const [display, setDisplay] = useState("none");
  console.log(display);

  return (
    <>
      <div id="mainContainer" className="d-flex flex-row">
        <div id="sideBar">
          <h1 className="m-3">Hello</h1>
          <h1 className="m-3">{loggedUser}</h1>

          <Button className="m-1 button-17" onClick={() => setDisplay("AddPet")}>
            Add Pet
          </Button>
          <Button className="m-1 button-17" onClick={() => setDisplay("Users")}>
            Users List
          </Button>
          <Button className="m-1 button-17" onClick={() => setDisplay("Pets")}>
            Pets List
          </Button>
        </div>
        <div id="dashboaredContainer">
          {display === "AddPet" && (
            <>
              <div id="addPetContainer">
                <AddPet />
              </div>
            </>
          )}
          {display === "Users" && <UsersList />}
          {display === "Pets" && (
            <div>
              <AdminPetsList />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
