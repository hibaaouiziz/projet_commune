import React from 'react';
import Header from '../headers/Header.js';
import {Link} from 'react-router-dom';
import Logout from '../Logout'
import { useLocation } from 'react-router-dom';

export default function Directeur() {

  return (
    <div>
   <Header />
   <Logout />
         
         <div className="d-grid gap-2 col-6 mx-auto">
        < Link to="/Control" className="btn btn-primary" type="button">Controle et evaluation</Link><br/><br/>

  <Link to="/listMarche" className="btn btn-primary" type="button">Output</Link><br/><br/>
  <Link to="/Depenses" className="btn btn-primary" type="button">Depense</Link><br/><br/>

</div>
<br /><br/><br /><br/><br /><br/>
    </div>
  )
}
