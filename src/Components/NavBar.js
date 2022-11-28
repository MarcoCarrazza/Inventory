import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const color = {textDecoration: 'none', color: 'white'}

export default function NavBar() {
  return (
    <>
      <Navbar expand='md' sticky="top" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="navbarScroll" />
      {/* <Navbar.Brand>
        <img
            src={logo}
            width="120"
            height="30"
            style={{marginLeft:20}}
            alt="Repo logo"
          />
        </Navbar.Brand> */}
        <Navbar.Collapse id="navbarScroll" className="justify-content-end" style={{marginRight:50}}>
          <Nav>
            <Nav.Link><Link to="/inventory" style={color}>Inventario</Link></Nav.Link>
            <Nav.Link><Link to="/reports" style={color}>Informes</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}