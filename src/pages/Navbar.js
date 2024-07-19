import React from 'react'





export default function Navbar() {

  
  return (
<div className='nav'>
<nav class="navbar navbar-expand-lg bg-body-tertiary" style={{height:"60px",width:"1400px", margin:"2px"}}>
  <div class="container-fluid">
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" style={{color:"black"}} class="bi bi-airplane" viewBox="0 0 16 16">
  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599"/>
</svg>&nbsp;&nbsp;&nbsp;
    <a class="navbar-brand" href="#" style={{fontSize:"30px",color:""}}> BrownField Airline</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <form class="d-flex" role="search" style={{marginLeft:"100px" }}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"280px"}}/>
        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
      </form>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{fontSize:"20px", margin:"9px",padding:"6px"}}>
        <li class="nav-item" style={{marginLeft:"210px"}}>
          <a class="nav-link active" aria-current="page" href='/' >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Flight</a>
        </li>
        <li class="nav-item" style={{margin:"2px"}}>
          <button class="btn btn-info">
           <a className="nav-link btn btn-info" href='/Admin'>
             Admin
           </a>
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
{/* <Login/> */}
</div>
  )
}
