import "./App.css";
import NavBar from "./components/Nav bar/NavBar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import PetPage from "./Pages/PetPage";
import SearchPage from "./Pages/SearchPage";
import HomePage from "./Pages/HomePage";
import AddOrEditPetPage from "./Pages/AddOrEditPetPage";
import GetPetsContextProvider from "./context/GetPetsContext";
import AuthContextProvider from "./context/AuthContext";
import MyPetPage from "./Pages/MyPetPage";
import AdminPage from "./Pages/AdminPage";
import PrivateRoutes from "./Utilities/PrivateRoutes";
import AdminPrivateRoutes from "./Utilities/AdminPrivateRoutes";
import PhotoSlider from "./components/PhotoSlider/PhotoSlider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <GetPetsContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/test"
                element={<PhotoSlider min={0} max={100} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)} />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/Pets/?" element={<PetPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/MyPets" element={<MyPetPage />} />
              </Route>
              <Route element={<AdminPrivateRoutes />}>
                <Route path="/Admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GetPetsContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
