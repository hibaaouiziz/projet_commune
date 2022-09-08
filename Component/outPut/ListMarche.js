import React from 'react'
import Header from '../headers/Header.js';
import  '../buttons/Button.css';
import Footer2 from '../footer/Footer2.js';
import {Link} from 'react-router-dom';
import  { useState, useEffect } from "react";
import {  query, where } from "firebase/firestore";
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
  import { db, firestore } from '.././firebase';
 function ListMarche() {
    
    const [popupActive, setPopupActive] = useState(false)
    const [nentre, setNentre] = useState("");
    const [nBC, setNBC] = useState("");

 
   
  return (
    <div>
        <Header />
        <Footer2 />
        <br/><br/>
        <h1 id = "titre">Output</h1>
        <br/>
        <div className="container">  
  <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-6">
      <input type="text" className="form-control" id="marche" value={nentre}
        onChange={(e) => setNentre(e.target.value)}/>
    </div>
    <div className="col-auto">
    <Link to="/Output"
      state={{ from: nentre }} type="button" className="btnn btn--primary">Fiche </Link>
  </div>
  <div className="col-auto">
  <Link to="/ModifierMarche"
      state={{ from: nentre }} type="submit" className="btnn btn--primary">Modifier</Link>
  </div>

  </div>
  <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du bon de commande</label>
    <div className="col-sm-6">
      <input type="text" className="form-control" id="bc"  value={nBC}
        onChange={(e) => setNBC(e.target.value)}/>
    </div>
    <div className="col-auto">
    <Link to="/OutputBC"
      state={{ fromBC: nBC }} type="button" className="btnn btn--primary">Fiche</Link>
  </div>
  <div className="col-auto">
    <Link to="/ModifierBC"
      state={{ fromBC: nBC }} type="submit" className="btnn btn--primary">Modifier</Link>
  </div>
  </div>
        </div>
         

            </div>

   
  )
}
export default ListMarche;
