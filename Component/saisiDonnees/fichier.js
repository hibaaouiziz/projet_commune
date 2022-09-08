import React from 'react';
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import { Form } from "react-bootstrap";
import'././styleCss/Marche.css';
import {Link} from 'react-router-dom';
import  { useState, useEffect } from "react";
import { setDoc, addDoc,writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage} from '.././firebase';
import {
    collection,
    onSnapshot,
    doc,
   
    deleteDoc
  } from "firebase/firestore"

export default function Fichier() {
    const [progress, setProgress] = useState(0);
    const [numero, setNumero] = useState("");
    const [nom, setNom] = useState("");
    const [fichier, setFichier] = useState("");
    const [loader, setLoader] = useState(false);
    const batch = writeBatch(db);
    const ajouter = async(e) => {
        e.preventDefault();
        const storageRef = ref(
          storage,
          `/images/${fichier.name}`
        );
        const uploadImage = uploadBytesResumable(storageRef, fichier);
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
            setNom("");
            setFichier("");
            
          
    
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
             const nycRef=doc(db,"Marche",numero,"fichier",nom)
                setDoc(nycRef,{
                  nom: nom,
                  fichier: url,
                  
              
                })
                .then(() => {
                   batch.commit();
                  setLoader(false);
                  alert("Your message has been submitted👍");
                 })
                 .catch((error) => {
                  alert(error.message);
                  setLoader(false);
                 });
                 setNom("");
                 setFichier("");
                })})}
    
    
    
        const enregistrer = async(e) => {
            e.preventDefault();
            const storageRef = ref(
              storage,
              `/images/${fichier.name}`
            );
            const uploadImage = uploadBytesResumable(storageRef, fichier);
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
                setNom("");
                
               
                
            
        
                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                 const nycRef=doc(db,"Marche",numero,"fichier",nom)
                    setDoc(nycRef,{
                      nom: nom,
                      fichier: url,
                      
                  
                    })
                    .then(() => {
                       batch.commit();
                      setLoader(false);
                      alert("Your message has been submitted👍");
                     })
                     .catch((error) => {
                      alert(error.message);
                      setLoader(false);
                     });
                     setNumero("");
                     setNom("");
                     setFichier("");
                    })})}
        



  return (
    <div>
<Header />
<Footer2  />
       <br/><br/>
       <h1 id = "titre">Masque de saisie des données</h1>
            <br/>
  
            <div className="container">
            <div className="mb-3 row">
            <Form  onSubmit={ajouter}>
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" required value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    <div className="table-responsive">
<table className="table">

<thead>
<tr>
<th scope="col">Nom du fichier</th>
<th scope="col">fichier</th>
</tr>
</thead>
<tbody>
<tr>
<td><input type="txt"  id="inputEmail4"  required value={nom} onChange={(e) => setNom(e.target.value)}/></td>
<td><input name="file"  id="exampleFile"  required type="file"  onChange={(e) => setFichier(e.target.files[0])}/></td>
</tr>
</tbody>

</table> 

          
</div>  
<br /><br />
<button className="btn btn-primary suivant" type="submit" >Ajouter</button> 
</Form>
</div>
</div>
</div>

  )
}
