import React from 'react'
import Logout from '../Logout'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2';
import {Link} from 'react-router-dom';

export default function saisiDonnees() {
  return (
    <div>
<Header />
<Footer2  />
<Logout />       
         <div className="d-grid gap-2 col-6 mx-auto">
        < Link to="/Marche" className="btn btn-primary" type="button">Marché</Link><br/><br/>
        <Link to="/BonCommande" className="btn btn-primary" type="button">Bon de Commande</Link><br/><br/>
 
</div>

    </div>
  )
}