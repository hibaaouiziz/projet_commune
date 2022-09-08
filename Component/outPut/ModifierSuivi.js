import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Etude from './Etude'
import Fourniture from './Fourniture'
import Footer2 from '../footer/Footer2';
import Travaux from './Travaux'
import MarcheTravauxServices from '../SuiviSupervision/MarcheTravauxServices'
import MarcheFourniture from '../SuiviSupervision/MarcheFourniture'
import MarcheEtude from '../SuiviSupervision/MarcheEtude'
import 'firebase/firestore';
import  { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import {  query, where,writeBatch } from "firebase/firestore";
import { useLocation, Link } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from ".././firebase";


import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    updateDoc,
    addDoc,
    deleteDoc,
    collectionGroup, getDocs 
  } from "firebase/firestore"

export default function ModifierSuivi() {
    const location = useLocation()
    const { typemarche} = location.state
    const { num2} = location.state
  return (
      <div>
          <Header />
          <Footer2 />
          <br/><br/>
          <h1 id = "titre">Modifier</h1>
    <div className="container">
    <label for="inputEmail4" class="form-label identification"> Suivi et supervision :</label> 
    <br/><br/>
        { 
typemarche === "Marché des études"? <Etude num = { num2}/> : ((typemarche === "Marché des services" || typemarche === "Marché des travaux") ?  <Travaux num = { num2}/>  : <Fourniture num = { num2}/>)
}
<br/><br/>
{ 
typemarche === "Marché des études"? <MarcheEtude/> : ((typemarche === "Marché des services" || typemarche === "Marché des travaux") ?  <MarcheTravauxServices/>  : <MarcheFourniture />)
}
    </div>
    </div>
  )
}
