import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import { db } from '.././firebase';
import 'firebase/firestore';
import  { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import {  query, where,writeBatch } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    collectionGroup, getDocs 
  } from "firebase/firestore"
  import { useReactToPrint } from "react-to-print";
import { Collections } from '@mui/icons-material';
 
export default function OutputBC() {





  const batch = writeBatch(db);
  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



    const location = useLocation()
    const { fromBC } = location.state
   
    const [bc, setBC] = useState([])
    const [decompte, setDecompte] = useState([])
    const [control, setControl] = useState([])
    const marcheCollectionRef = query(collection(db, "Bon de Commande"),where("numero","==",fromBC))
    useEffect(() => {
        onSnapshot(marcheCollectionRef, snapshot => {
            setBC(snapshot.docs.map(doc => {
            return {
              id: doc.id,
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
      const marcheCollectionRef1 = query(collection(db,"Bon de Commande",fromBC,"decompte"))
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
      const marcheCollectionRef2 =query(collection(db,"Bon de Commande",fromBC,"control"))
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

  return (
    <div>
      <div ref={componentRef}>
    <Header />
    <Footer2 />
<br/><br/>
<h1 id = "titre">Fiche</h1>
    <br/>
    <div class="container">
    { bc.map((bc, i) => (   
<div>

       <label for="inputEmail4" class="form-label identification">I-Identification</label> 

  <form class="row g-3">
  <div class="col-md-6">
  <label for="inputEmail4" class="form-label">Division :</label></div>
  <div class="col-md-6">
  <label>{bc.division}</label>
  </div>
  <div class="col-md-3">
  <label for="inputEmail4" class="form-label">Nom de l'utilisateur :</label></div>
  <div class="col-md-3">
  <label>{bc.utilisateur}</label>
  </div>

<div class="col-md-3">
<label for="inputPassword4" class="form-label">Qualité :</label></div>
<div class="col-md-3">
<label >{bc.qualite}</label>
</div>


<div class="col-3">
<label for="inputAddress2" class="form-label">N° BC :</label></div>
<div class="col-3">
<label>{bc.numero}</label>
</div>


<div class="col-md-3">
<label for="inputState" class="form-label">Date :</label></div>
<div class="col-3">
<label>{bc.date}</label>
<br/>

</div>
<div class="col-md-6">
<label for="inputZip" class="form-label">Objet :</label></div>
<div class="col-6">
<label>{bc.objet}</label>
</div>
<div class="col-md-3">
<label for="inputZip" class="form-label">Montant global :</label></div>
<div class="col-3">
<label>{bc.montant}</label>
</div>


<div class="col-md-3">
<label for="inputEmail4" class="form-label">Année budgetaire :</label></div>
<div class="col-md-3">
<label>{bc.annee}</label>
</div>

  <div class="col-md-2">
<label for="inputEmail4" class="form-label">Article :</label></div>
<div class="col-md-2">
<label>{bc.article}</label>
</div>
<div class="col-md-2">
<label for="inputEmail4" class="form-label">Chapitre :</label></div>
<div class="col-md-2">
<label>{bc.chapitre}</label>
</div>
<div class="col-md-2">
<label for="inputEmail4" class="form-label">ligne :</label></div>
<div class="col-md-2">
<label>{bc.ligne}</label>
</div>

<div class="col-md-3">
<label for="inputEmail4" class="form-label">Reception le :</label></div>
<div class="col-md-3">
<label>{bc.reception}</label>
</div>
<div class="col-md-3">
<label for="inputEmail4" class="form-label">Bon de livraison : </label></div>
<div class="col-md-3">
<label><a href={bc.BonLivraison} target="_blank"> PDF!</a></label>
</div>

<label for="inputEmail4" class="form-label identification">II-Adjudicataire</label> 
<div class="col-md-3">
<label for="inputCity" class="form-label">Nom social</label></div>
<div class="col-md-3">
<label>{bc.nsocial}</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">Siege social</label></div>
<div class="col-md-3">
<label>{bc.siegesocial}</label>
</div>
<div class="col-md-2">
<label for="inputCity" class="form-label">RC N°</label></div>
<div class="col-md-2">
<label>{bc.nrc}</label>
</div>
<div class="col-md-2">
<label for="inputCity" class="form-label">TP N°</label></div>
<div class="col-md-2">
<label>{bc.ntp}</label>
</div> 
<div class="col-md-2">
<label for="inputCity" class="form-label">ICE N°</label></div>
<div class="col-md-2">
<label>{bc.nice}</label>
</div>
<div class="col-md-6">
<label for="inputCity" class="form-label">RIB</label></div>
<div class="col-md-6">
<label>{bc.rib}</label>
</div>

<div class="col-md-3">
<label for="inputCity" class="form-label">FAX</label></div>
<div class="col-md-3">
<label>{bc.fax}</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">FIXE</label></div>
<div class="col-md-3">
<label>{bc.fixe}</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">GSM</label></div>
<div class="col-md-3">
<label>{bc.gsm}</label>
</div>
<div class="col-md-3">
<label for="inputCity" class="form-label">Email</label></div>
<div class="col-md-3">
<label>{bc.email}</label>
</div>
</form>
</div>
))}
<br /><br /><br />

       <label for="inputEmail4" class="form-label identification">VI-Controle et evaluation</label><br />
       <label for="inputEmail4" class="form-label identification">1-Controle</label> 
       <table class="table">
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

<br/><br/>


</div>
<button onClick={handlePrint} className="btnn btn--medium">  Print </button> 
<br /><br /><br /><br />
</div>
</div> 
   


  )
}

