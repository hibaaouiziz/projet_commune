import React,{useRef} from 'react'
import TravauxVisit  from './TravauxVisit.js';
import ImageButton from 'react-image-button';
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
  collectionGroup,
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
  import { useReactToPrint } from "react-to-print";
import { style } from '@mui/system';

export default function Travaux(props) {
 
  const [suivi, setSuivi] = useState([])
  const [visit, setVisit] = useState([])
  const [missions, setMissions]  = useState()
  const num = props.num
  const marcheCollectionRef1 = query(collection(db,"Marche",num,"suivi"))
  useEffect(() => {
    
    onSnapshot(marcheCollectionRef1, snapshot => {

        setSuivi(snapshot.docs.map(doc => {
         
        return {
         
          id: doc.id,
         
          viewing: false,
          ...doc.data()
        }
         
      })
   
      ) 
      
        
    })
   
  },[])





 
  return (
    <div>
      { suivi.map((suivi, i) => ( 

        
        <div>
          <form class="row g-3">
                <div class="col-md-6">
                 
<label for="inputEmail4" class="form-label">Mission :</label></div>
<div class="col-md-6">
<label>{suivi.id}</label>
</div>
<div class="col-md-3">
  <label for="inputEmail4" class="form-label">Date d'ordre de service :</label></div>
  <div class="col-md-3"> 
  <label>{suivi.dordre}</label>
  </div>
<div class="col-md-3">
<label for="inputPassword4" class="form-label">Ordre de service :</label></div>
<div class="col-md-3">
<label ><a href={suivi.ordre} target="_blank">  PDF!</a></label>
</div>

<div class="col-3">
<label for="inputAddress2" class="form-label">Date de la réunion de cadrage :</label></div>
<div class="col-3">
<label>{suivi.dreunion}</label>
</div>


<div class="col-md-3">
<label for="inputState" class="form-label">Rapport de la réunion de cadrage :</label></div>
<div class="col-md-3">
<label><a href={suivi.rapport} target="_blank">  PDF!</a></label>
<br/>

</div>
<div class="col-md-3">
<label for="inputZip" class="form-label">Date de la validation de la mission :</label></div>
<div class="col-md-3">
<label>{suivi.validation}</label>
</div>
<div class="col-md-3">
<label for="inputZip" class="form-label">Rapport de la validation de la mission :</label></div>
<div class="col-md-3">
<label><a href={suivi.rappvalid} target="_blank">  PDF!</a></label>
</div>
</form>
<TravauxVisit num = {suivi.id}/>
     <br /> <br />
 </div>
 
      ))}
 
</div>
  )
 
}
