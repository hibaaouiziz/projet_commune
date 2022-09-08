import React from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2';
import {Link} from 'react-router-dom';
import MarcheEtude from '../SuiviSupervision/MarcheEtude'
import MarcheTravauxServices from '../SuiviSupervision/MarcheTravauxServices'
import MarcheFourniture from '../SuiviSupervision/MarcheFourniture'
import { useLocation } from 'react-router-dom';
import  { useState, useEffect } from "react"
export default function SuiviSupervision() {
  const location = useLocation()
  const { nom } = location.state

    const [type, setType] = useState("1");
    const [goto, setGoto] = useState("");
    function add() {
      return (
        " ",
    (type == "1")? " " :((type==='Marché des travaux'||type==='Marché des services')?<MarcheTravauxServices nom1={nom}/>:(type==='Marché des études'?<MarcheEtude nom1={nom}/>:<MarcheFourniture nom1={nom}/>))
      )
    }
  return (
    <div>
        <Header />
        <Footer2  />
        <br/><br/>
       <h1 id = "titre">Masque de saisie des données</h1>
       <br/>
       <div className="container">
       <label htmlFor="inputEmail4" className="form-label identification">II-Suivi et supervision</label><br />
       
       <label htmlFor="inputEmail4" className="form-label">Type de marchés</label>
       <select className="form-select" aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
       
  <option   value="1" >Choisi le type ...</option>
  <option  value="Marché des travaux">Marché des travaux</option>
  <option value="Marché des services">Marché des services</option>
  <option value="Marché des fournitures">Marché des fournitures</option>
  <option value="Marché des études">Marché des études</option>
  <option value="Contrats">Contrats</option>
  <option value="Conventions">Conventions</option>
  <option value="Marchés spéciaux">Marchés spéciaux</option>
</select>
{add()}


    </div>
    </div>
  )
}
