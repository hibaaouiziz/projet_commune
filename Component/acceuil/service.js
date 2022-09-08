import React from 'react'
import Logout from '../Logout'

import Header from '../headers/Header.js';
import {Link} from 'react-router-dom';

export default function Service() {
  return (
    <div>
<Header />
<Logout />
         
         <div className="d-grid gap-2 col-6 mx-auto">
        < Link to="/SaisieDonnees" className="btn btn-primary" type="button">Saisie des données</Link><br/><br/>
        {/*<Link to="/Decomptes" className="btn btn-primary" type="button">Décompte</Link><br/><br/>*/}
 
</div>

    </div>
  )
}
