import React from 'react';
import Header from '../headers/Header.js';
import {Link} from 'react-router-dom';
import Logout from '../Logout'

export default function Manager() {
  return (
    <div>
         <Header />
         <Logout />
         <div className="d-grid gap-2 col-6 mx-auto">
< Link to="/SaisieDonnees" className="btn btn-primary" type="button">Saisie des données</Link><br/><br/>
<Link to="/Decomptes" className="btn btn-primary" type="button">Décompte</Link><br/><br/>
< Link to="/SuiviSupervision" className="btn btn-primary" type="button">Suivi et supervision</Link><br/><br/>
< Link to="/Control" className="btn btn-primary" type="button">Controle et evaluation</Link><br/><br/>
<Link to="/listMarche" className="btn btn-primary" type="button">Output</Link><br/><br/>
<Link to="/Depenses" className="btn btn-primary" type="button">Depense</Link><br/><br/>
    </div>
    <br /><br /><br />
    </div>
  )
}
