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

export default function Fourniture(props) {
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
          <div class="table-responsive">
<table class="table">

     <thead>
 <tr>
   <th scope="col">Missions</th>
   <th scope="col">Bon de reception</th>
   <th scope="col">PV de reception</th>
 </tr>
</thead>
<tbody>
{ suivi.map((suivi, i) => (  
             <div> 
 <tr>
   <td>{suivi.mission}</td>
   <td><a href={suivi.bon} target="_blank"> PDF!</a></td>
   <td><a href={suivi.pv} target="_blank"> PDF!</a></td>
 </tr>
 </div> 
         ))}
</tbody>
</table>  
    </div>
    </div>
  )
}
