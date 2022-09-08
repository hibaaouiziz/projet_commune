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
  collectionGroup,
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore"
  import { useReactToPrint } from "react-to-print";
import { style } from '@mui/system';

export default function TravauxVisit(props) {
    const num = props.num
    const [visit, setVisit] = useState([])
    const marcheCollectionRef2 = query(collectionGroup(db,"travaux"),where("mission", "==", num ))
    useEffect(() => {
      
      onSnapshot(marcheCollectionRef2, snapshot => {
          setVisit(snapshot.docs.map(doc => {
           
          return {
            id: doc.id,
        
            viewing: false,
            ...doc.data(),
            
          }
         
        }))
      })
    }, [])
  

  return (
    <div>
        <table border="3" id="tab" class="table table-bordered">
         
              
         <tr>
         <th >N° de la visite/réunion</th>
         <th >Date de la visite/réunion</th>
         <th >Principales remarques</th>
         <th >Décisions</th>
         <th >PV de la visite/réunion</th>
         
         </tr>
{
//marcheCollectionRef2 = query(collectionGroup(db,"1"),where("mission", "==", "1"))
 //(collection(db,"Marche","5","suivi","1","Qicou2FZBKcXpiMWrvnT"))
}



        
         { visit.map((visit, i) => (
         <tr>
         <td >{visit.nvisit}</td>  
         <td >{visit.dvisit}</td>  
         <td >{visit.remarque}</td>  
         <td >{visit.decision}</td>
         <td ><a href={visit.pv} target="_blank"> PDF!</a></td>
         </tr>
         ))}
        
 </table>
    </div>
  )
}
