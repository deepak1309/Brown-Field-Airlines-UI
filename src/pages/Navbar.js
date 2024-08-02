import React, { useState } from 'react';
import { useAuth } from './Context/Auth';
import { Avatar, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const nav=useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    nav("/")
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : `${parts[0][0]}`;
  };


  const showIconOnPages = ['/searchPage',"/results","/results1","/flight/:flightNumber","/Book"].includes(location.pathname);

  return (
    <div className='nav'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ height: "60px", width: "1400px", margin: "2px" }}>
        <div className="container-fluid">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" style={{ color: "black" }} className="bi bi-airplane" viewBox="0 0 16 16">
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599" />
          </svg>&nbsp;&nbsp;&nbsp;
          <a className="navbar-brand" href="#" style={{ fontSize: "30px", color: "" }}>BrownField Airline</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" style={{ marginLeft: "100px" }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "280px" }} />
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "20px", margin: "9px", padding: "6px" }}>
              <li className="nav-item" style={{ marginLeft: "210px" }}>
                <a className="nav-link active" aria-current="page" href='/searchPage'>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Flight</a>
              </li>
              {isAuthenticated && showIconOnPages ? (
                <li className="nav-item" style={{ margin: "2px" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={handleClick}
                      edge="end"
                      color="success"
                    >
                      <Avatar sx={{ bgcolor: '#1976d2', width: 36, height: 36 }}>
                        {user ? getInitials(user.name) : 'U'}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem disabled>
                        {/* <Typography variant="body2">{user?.email || 'No email'}</Typography> */}
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                       <a href=''> <Typography variant="body2">Logout</Typography></a>
                      </MenuItem>
                    </Menu>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
