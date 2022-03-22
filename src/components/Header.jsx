import React from 'react';
import logo from "../assets/img/Logo.png";
import {Container} from "react-bootstrap";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header style={{width: 600}}>
      <Container style={{width: 600}}>
        <img src={logo} style={{width: 60}} />
      </Container>
      <NavBar />
    </header>
  );
};

export default Header;