import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { AuthContext } from "../context/AuthContext";
import "./PagesStyle/HomePage.css";
import DogSearchHome from "../SVG/DogSearchHome.svg";
import CatSearchHome from "../SVG/CatSearchHome.svg";
import PawSearchHome from "../SVG/PawSearchHome.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAllCats = async () => {
    try {
      const res = axios.get();
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDogs = async () => {
    try {
      const res = axios.get();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(event.data.state);
  // }, [navigat]);
  return (
    <>
      <div id="">
        <div id="homePageMainContainer">
          {/* <div id="pagePhoto"></div> */}
          <div id="greatingHeader">
            {loggedUser ? (
              <h1>Hi {loggedUser}, Welcome Back!</h1>
            ) : (
              <>
                <h1>Hi, Welcome To Let's Pet</h1>
                <h2>We will help you to find your new BEST FRIEND!</h2>
              </>
            )}
          </div>
          <div id="homePageCardContainer">
            <div id="homePageCard">
              <p id="svgHeader">Looking For A Dog?</p>
              <img id="homePageSearchSvg" src={DogSearchHome} alt="dog search"></img>
            </div>
            <div id="homePageCard">
              <p id="svgHeader">Looking For A Cat?</p>
              <img id="homePageSearchSvg" src={CatSearchHome} alt="cat search"></img>
            </div>
            <div id="homePageCard">
              <p id="svgHeader">Take A Look At Our Pets</p>
              <img id="homePageSearchSvg" onClick={() => navigate("/search")} src={PawSearchHome} alt="pet searchx`"></img>
            </div>
          </div>
          <Carousel fade id="photosSlider">
            <Carousel.Item interval={3200}>
              <img className="d-block w-100" src={require("../Utilities/picturs/1.jpg")} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item interval={3200}>
              <img className="d-block w-100" src={require("../Utilities/picturs/2.jpeg")} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item interval={3200}>
              <img className="d-block w-100" src={require("../Utilities/picturs/3.png")} alt="Third slide" />
              {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
}
