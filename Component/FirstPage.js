import React from 'react';
import Header from '././headers/Header.js';
import Footer from '././footer/Footer.js';
import {Link} from 'react-router-dom';
import './FirstPage.css'


 function FirstPage() {
  return (
    <div>
         <Header />
         
         <div className="d-grid gap-2 col-6 mx-auto">
        < Link to="/MarcheBC" className="btn btn-primary" type="button">Saisie des données</Link><br/><br/>
  <Link to="/Output" className="btn btn-primary" type="button">Modifier</Link>
</div>
    </div>
  )
}
export default FirstPage;
