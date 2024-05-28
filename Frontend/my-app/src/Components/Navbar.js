import React, { useState } from "react";
import Logo from "../Assets/logo3.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import '../App.css';


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav>
     <div className="fixed-top-navbar">
  <div className="nav-logo-container">
    <img src={Logo} alt="" style={{ maxWidth: '10rem', maxHeight: '6rem' }} />
  </div>
          
  <Nav className="justify-content-end" activeKey="/home" >
    <Nav.Item>
      <Nav.Link onClick={() => scrollToSection('home')} style={{ fontSize: '20px' }}>Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => scrollToSection('about')} style={{ fontSize: '20px' }}>About</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => scrollToSection('work')} style={{ fontSize: '20px' }}>Work</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => scrollToSection('scan')} style={{ fontSize: '20px' }}>Scan me</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => scrollToSection('predict')} style={{ fontSize: '20px' }}>Know me</Nav.Link>
    </Nav.Item>
  </Nav>
</div>

 

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {["home", "about", "work", "scan"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => scrollToSection(text)}>
                  <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
