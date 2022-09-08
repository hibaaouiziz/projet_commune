import React from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import {Link} from 'react-router-dom';
import Logout from '../Logout'

export default function Depenses() {
  return (
    <div>
           <Header />
           <Footer2  />
   <Logout />
         
         <div className="d-grid gap-2 col-6 mx-auto">
  < Link to="/DepenseParType" className="btn btn-primary" type="button">Depense par type</Link><br/><br/>
  < Link to="/DepenseBonCommande" className="btn btn-primary" type="button">Depense Bon de commande</Link><br/><br/>
  <Link to="/DepenseParChapitre" className="btn btn-primary" type="button">Depense par chapitre</Link><br/><br/>
  <Link to="/DepenseParRubrique" className="btn btn-primary" type="button">Depense par ligne</Link><br/><br/>
   
    </div>
    <br /><br/> <br /><br/>
    </div>
  )
}
