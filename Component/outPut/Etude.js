import React,{useRef} from 'react'

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
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
  import { useReactToPrint } from "react-to-print";
import { style } from '@mui/system';

export default function Etude(props) {
  const [suivi, setSuivi] = useState([])
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
      }))
    })
  }, [])



  return (
    <div>
      <br /><br />
      
         <table border="3" id="tab" class="table table-bordered">
         
              
         <tr>
         <th >N° de mission</th>
         <th >Date d'ordre de service</th>
         <th >Ordre de service</th>
         <th >Date de la validation de la mission</th>
         <th >Rapport de la validation de la mission</th>
         
         </tr>
         { suivi.map((suivi, i) => (  
            
         <tr>
         <td >{suivi.mission}</td>  
         <td >{suivi.date}</td>  
         <td ><a href={suivi.ordre} target="_blank"> PDF!</a></td>  
         <td >{suivi.validation}</td>
         <td ><a href={suivi.rapport} target="_blank"> PDF!</a></td>
         </tr>
     
         ))}
 </table>
    </div>
  )
}
