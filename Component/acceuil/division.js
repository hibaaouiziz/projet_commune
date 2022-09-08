import React from 'react';
import Header from '../headers/Header.js';
import {Link} from 'react-router-dom';
import Logout from '../Logout'
import { useLocation } from 'react-router-dom';
export default function Division() {
  const location = useLocation()
  const { nom } = location.state
  console.log(nom)
  
  return (
    <div>
           <Header />
           <Logout />
           <br />
           <h1 id = "titre">{nom}</h1>
       
         <div className="d-grid gap-2 col-6 mx-auto">
        < Link to="/SuiviSupervision" state={{ nom }} className="btn btn-primary" type="button">Suivi et supervision</Link><br/><br/>
        <Link to="/Decomptes" state={{ nom }} className="btn btn-primary" type="button">Décompte</Link><br/><br/>
        <Link to="/Control" className="btn btn-primary" type="button">Controle et evaluation</Link><br/><br/>
 
</div>
<br/><br/><br/><br/>
    </div>
  )
}
