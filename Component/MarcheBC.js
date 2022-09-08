import React from 'react'
import Header from '././headers/Header.js';
import Footer from '././footer/Footer.js';
import {Link} from 'react-router-dom';

export default function MarcheBC() {
  return (
    <div>
    <Header />
    
    <div className="d-grid gap-2 col-6 mx-auto ">

   < Link to="/Marche" className="btn btn-primary" type="button">Marché</Link><br/><br/>
<Link to="/BonCommande" className="btn btn-primary" type="button">Bon de commande</Link>
</div>
</div>

  )
}
