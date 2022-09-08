import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2';
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


export default function ModifierBonLivraison() {
  const location = useLocation()
  const { num } = location.state
  const {type1} = location.state
    const [progress, setProgress] = useState(0);
    const [loader, setLoader] = useState(false);
    const [fichiers, setFichiers] = useState([])
    const [formData,setFormData] = useState(
        {
         uBonLivraison : "",
        })

    const ajouter = async(e) => {
        e.preventDefault();
        const storageRef = ref(
          storage,
          `/images/${formData.uBonLivraison.name}`
        );
        const uploadImage = uploadBytesResumable(storageRef, formData.uBonLivraison);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const progressPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progressPercent);
          },
          (err) => {
            console.log(err);
          },
          () => {
            
            
          
    
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
             const nycRef=doc(db, type1, num)
             updateDoc(nycRef,{
                
                  BonLivraison: url,
                  
              
                })
                .then(() => {
                   
                  setLoader(false);
                  alert("Your message has been submitted👍");
                 })
                 .catch((error) => {
                  alert(error.message);
                  setLoader(false);
                 });
                 
                })})}
    
    
    
       

    const marcheCollectionRef3 =query(collection(db,type1),where("numero","==",num))
      useEffect(() => {
        
        onSnapshot(marcheCollectionRef3, snapshot => {
            setFichiers(snapshot.docs.map(doc => {
              
            return {
              id: doc.id,
             
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
  return (

<div >
    <Header />
    <Footer2 />
    <br/><br/>
    <h1 id = "titre">Modifier</h1>
    <br/>
    <div class="container mb-3 row">
        <label for="inputEmail4" class="form-label identification">Fichiers</label><br />
        <br/>
{ fichiers.map((fichier, i) => ( 
  <div>
    <form class="row g-3">
    <div class="col-6">
<label for="inputAddress2" class="form-label">Bon de livraison:</label></div>
<div class="col-6">
<label><a href={ fichier.BonLivraison} target="_blank"> PDF!</a></label>
</div>
</form>
  </div>
))}
<br/><br/>
<div class="col-md-6">
<label  class="form-label">Bon de livraison</label></div>
<div class="col-md-6">
<input
      id="exampleFile"
      name="file"
      type="file"
      
              onChange={e => setFormData({...formData, uBonLivraison: e.target.files[0]})}
    />
</div>
<br /><br /><br /><br />
<div className="col-3">
    <button type="submit" className="btn btn-primary suivant" onClick={ajouter}>Enregister</button> 
   </div>
   <div className="col-6">
    <Link to="/ModifierDecompte" className="btn btn-primary suivant" state={{ type1: "Bon de Commande", num1: num }}>Suivant</Link>
</div>
    </div>
    </div>
  )
}
