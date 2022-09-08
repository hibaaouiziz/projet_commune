import React from 'react';
import logo from './././default.png';
import './Header.css';



 function Header() {
  return (
   
    <div>
       <nav className="navbar navbar-light ">
  <div className="container">
  <pre className="parag">Royaume du Maroc<br />
Région Marrakech-Safi<br />
Prefecture de Marrakech<br />
Commune urbaine Marrakech
        </pre>
    <a className="navbar-brand " href="#">
      <img src={logo} alt="" width="30" height="24" />
    </a>
  </div>
</nav>

    </div>
  
  )
}
export default Header;
