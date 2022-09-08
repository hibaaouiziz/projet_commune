import React,{useRef} from 'react'
import Etude from './Etude'
import Fourniture from './Fourniture'
import Footer2 from '../footer/Footer2.js';
import  '../buttons/Button.css';
import Travaux from './Travaux'
import { getStorage, ref } from "firebase/storage";
import Header from '../headers/Header.js';
import { useNavigate } from "react-router-dom";
import { db } from '.././firebase';
import  { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import {  query, where } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { PDFReader } from 'reactjs-pdf-reader';
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
  import { useReactToPrint } from "react-to-print";
 
export default function Output() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
    const location = useLocation()
    const { from } = location.state
   
    const [marches, setMarches] = useState([])
    const [decompte, setDecompte] = useState([])
    const [control, setControl] = useState([])
    const [fichier, setFichier] = useState([])
    const marcheCollectionRef = query(collection(db, "Marche"),where("numero","==",from))
    useEffect(() => {
        onSnapshot(marcheCollectionRef, snapshot => {
            setMarches(snapshot.docs.map(doc => {
            return {
              id: doc.id,
              viewing: false,
              ...doc.data()
            }
          }))
        })
      },
     
      [] )
      
      const marcheCollectionRef1 = query(collection(db,"Marche",from,"decompte"))
      useEffect(() => {
        
        onSnapshot(marcheCollectionRef1, snapshot => {
            setDecompte(snapshot.docs.map(doc => {
              var pc = parseInt(doc.data().decompte) / parseInt(doc.data().cumulatifs)
            return {
              id: doc.id,
              pc: pc,
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
      const marcheCollectionRef2 =query(collection(db,"Marche",from,"control"))
      useEffect(() => {
        
        onSnapshot(marcheCollectionRef2, snapshot => {
            setControl(snapshot.docs.map(doc => {
              
            return {
              id: doc.id,
             
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
      const marcheCollectionRef3 =query(collection(db,"Marche",from,"fichier"))
      useEffect(() => {
        
        onSnapshot(marcheCollectionRef3, snapshot => {
            setFichier(snapshot.docs.map(doc => {
              
            return {
              id: doc.id,
             
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
  return (
    <div>
    <div ref={componentRef} className="card">
    <Header />
    <Footer2 />
<br/><br/>
<h1 id = "titre">Fiche</h1>
    <br/>
    <div class="container">
    { marches.map((marche, i) => (   
<div>

       <label for="inputEmail4" class="form-label identification">I-Identification</label> 

  <form class="row g-3">
  <div class="col-md-6">
  <label for="inputEmail4" class="form-label">Division :</label></div>
  <div class="col-md-6">
  <label>{marche.division}</label>
  </div>
  <div class="col-md-6">
  <label for="inputEmail4" class="form-label">Type de marchés :</label></div>
  <div class="col-md-6">
  <label>{ marche.type }</label>
</div>
<div class="col-md-6">
<label for="inputPassword4" class="form-label">N° du marché :</label></div>
<div class="col-md-6">
<label >{ marche.numero }</label>
</div>

<div class="col-6">
<label for="inputAddress2" class="form-label">Objet du marché :</label></div>
<div class="col-6">
<label>{ marche.objet }</label>
</div>


<div class="col-md-3">
<label for="inputState" class="form-label">Montant globale du marché :</label></div>
<div class="col-md-3">
<label>{ marche.montant }</label>
<br/>

</div>
<div class="col-md-3">
<label for="inputZip" class="form-label">Durée du marché :</label></div>
<div class="col-md-3">
<label>{ marche.dure }</label>
</div>

<div class="col-md-2">
<label for="inputEmail4" class="form-label">Article :</label></div>
<div class="col-md-2">
<label>{marche.article}</label>
</div>
<div class="col-md-2">
<label for="inputEmail4" class="form-label">Chapitre :</label></div>
<div class="col-md-2">
<label>{marche.chapitre}</label>
</div>
<div class="col-md-2">
<label for="inputEmail4" class="form-label">ligne :</label></div>
<div class="col-md-2">
<label>{marche.ligne}</label>
</div>
<div class="col-md-3">
<label for="inputZip" class="form-label">Date d'engagement :</label></div>
<div class="col-md-3">
<label>{ marche.engagement }</label>
</div>
<div class="col-md-3">
<label for="inputEmail4" class="form-label">Date d'approbation :</label></div>
<div class="col-md-3">
<label>{ marche.approbation }</label>
</div>
<label for="inputEmail4" class="form-label identification">II-Adjudicataire</label> 
<div class="col-md-3">
<label for="inputCity" class="form-label">Nom social :</label></div>
<div class="col-md-3">
<label>{ marche.nsocial }</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">Siege social :</label></div>
<div class="col-md-3">
<label>{ marche.siegesocial }</label>
</div>
<div class="col-md-2">
<label for="inputCity" class="form-label">RC N° :</label></div>
<div class="col-md-2">
<label>{ marche.nrc }</label>
</div>
<div class="col-md-2">
<label for="inputCity" class="form-label">TP N° :</label></div>
<div class="col-md-2">
<label>{ marche.ntp }</label>
</div> 
<div class="col-md-2">
<label for="inputCity" class="form-label">ICE N° :</label></div>
<div class="col-md-2">
<label>{ marche.nice }</label>
</div>
<div class="col-md-6">
<label for="inputCity" class="form-label">RIB :</label></div>
<div class="col-md-6">
<label>{ marche.rib }</label>
</div>

<div class="col-md-3">
<label for="inputCity" class="form-label">FAX :</label></div>
<div class="col-md-3">
<label>{ marche.fax }</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">FIXE :</label></div>
<div class="col-md-3">
<label>{ marche.fixe }</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">GSM :</label></div>
<div class="col-md-3">
<label>{ marche.gsm }</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">Email :</label></div>
<div class="col-md-3">
<label>{ marche.email }</label>
</div>
</form>


<br /><br /><br />
<label for="inputEmail4" class="form-label identification">III-Suivi et supervision</label> 
<div>
{ 
marche.type === "Marché des études"? <Etude num = {marche.numero}/> : ((marche.type === "Marché des services" || marche.type === "Marché des travaux") ? <Travaux num = {marche.numero}/> : <Fourniture num = {marche.numero}/>)
}
</div>
</div>
))}
      <br/><br /><br />
       <label for="inputEmail4" class="form-label identification">IV-Controle et evaluation</label><br />
       <label for="inputEmail4" class="form-label identification">1-Controle</label> 
       <table border="3" id="tab" class="table table-bordered">
<tr>


<th scope="col">mission</th>
<th scope="col">Controleur</th>
<th scope="col">Comité</th>
<th scope="col">Date</th>
<th scope="col">Principales remarques</th>
<th scope="col">Décisions</th>


</tr>
{ control.map((control, i) => (   
<tr>
<td>{control.mission}</td>
<td>{control.controleur}</td>
<td><a href={control.commite} target="_blank"> PDF!</a></td>
<td>{control.date}</td>
<td>{control.remarque}</td>
<td>{control.decision}</td>
</tr>
))}





</table>  
<label for="inputEmail4" class="form-label identification">2-Evaluation de l'execution budgetaire</label>  

  <div class="table-responsive">
<table class="table">
<thead>
<tr>
<th scope="col">Mission</th>
<th scope="col">Nombre de jours de travail</th>
<th scope="col">Décomptes </th>
<th scope="col">Décomptes cumulatifs</th>
<th scope="col">% cumulatifs</th>

<th scope="col">Relicats</th>
<th scope="col">Virements</th>
<th scope="col">Dates de l'établissement des décomptes</th>
<th scope="col">Dates de dépot des décomptes</th>
<th scope="col">Dates de signature des décomptes</th>
<th scope="col">Dates des virements</th>
<th scope="col">Etats des virements</th>


</tr>
</thead>

<tbody>
  { decompte.map((decompte, i) => (   

<tr>
<td>{decompte.mission}</td>
<td>{decompte.jour}</td>
<td>{decompte.decompte}</td>
<td>{decompte.cumulatifs}</td>
<td>{decompte.pc}</td>
<td>{decompte.relicat}</td>
<td>{decompte.virements}</td>
<td>{decompte.etablissement}</td>
<td>{decompte.depot}</td>
<td>{decompte.signature}</td>
<td>{decompte.Dvirements}</td>
<td><a href={decompte.etat} target="_blank"> PDF!</a></td>


</tr>

))}
</tbody>

</table> 

</div>
<label for="inputEmail4" class="form-label identification">V-Fichiers</label><br />

{ fichier.map((fichier, i) => ( 
  <div>
    <form class="row g-3">
    <div class="col-6">
<label for="inputAddress2" class="form-label">{fichier.nom} :</label></div>
<div class="col-6">
<label><a href={ fichier.fichier} target="_blank"> PDF!</a></label>
</div>
</form>
  </div>
))}
<br/><br/>



</div>
</div> 
<button onClick={handlePrint} className="btnn btn--medium">  Print </button> 
<br /><br /><br /><br />

</div>


  )
}

