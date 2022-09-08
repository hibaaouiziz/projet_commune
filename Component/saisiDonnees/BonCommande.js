import React from 'react';
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import'././styleCss/Marche.css';
import { addDoc } from "firebase/firestore";
import { Form,  FormGroup } from "react-bootstrap";
import  { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from ".././firebase";


import {
    collection,
    onSnapshot,
    doc,
   setDoc,
    deleteDoc
  } from "firebase/firestore"
 function BonCommande() {
  const [progress, setProgress] = useState(0);
        const [formData,setFormData] = useState(
                {
                  type: "",
                 utilisateur : "",
                 qualite : "",
                 numero : "",
                 date: "",
                 objet:"",
                 montant: "",
                 annee: "",

                 chapitre: "",
                 ligne: "",
                 article: "",
                 reception: "",
                 BonLivraison:"",
                 nsocial: "",
                 siegesocial: "",
                 nrc: "",
                 ntp: "",
                 nice: "",
                 rib: "",
                 fax: "",
                 fixe: "",
                 gsm: "",
                 email: ""
                }
              )
          
             
  const [loader, setLoader] = useState(false);
 const handleSubmit =  async (e) => {
    e.preventDefault();
    setLoader(true);
    const storageRef = ref(
      storage,
      `/images/${formData.BonLivraison.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.BonLivraison);
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
      setFormData({
        type:"",
                         utilisateur : "",
                 qualite : "",
                 numero : "",
                 date: "",
                 objet:"",
                 montant: "",
                 annee: "",
                 chapitre: "",
                 ligne: "",
                 article: "",
                 reception: "",
                 BonLivraison:"",
                 nsocial: "",
                 siegesocial: "",
                 nrc: "",
                 ntp: "",
                 nice: "",
                 rib: "",
                 fax: "",
                 fixe: "",
                 gsm: "",
                 email: ""
        });
              getDownloadURL(uploadImage.snapshot.ref).then((url) => {
       setDoc(doc(db, "Bon de Commande", formData.numero), {
        type: "Bon de Commande",
        utilisateur: formData.utilisateur,
        qualite: formData.qualite,
        numero: formData.numero,
        date: formData.date,
        objet: formData.objet,
        montant: formData.montant,
        annee: formData.annee,
        chapitre: formData.chapitre,
        ligne: formData.ligne,
        article: formData.article,
        reception: formData.reception,
        nsocial: formData.nsocial,
        siegesocial: formData.siegesocial,
        nrc: formData.nrc,
        ntp: formData.ntp,
        nice: formData.nice,
        rib: formData.rib,
        fax: formData.fax,
        fixe: formData.fixe,
        gsm: formData.gsm,
        email: formData.email,


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
       setFormData({
                utilisateur : "",
                 qualite : "",
                 numero : "",
                 date: "",
                 objet:"",
                 montant: "",
                 annee: "",
                 chapitre: "",
                 ligne: "",
                 article: "",
                 reception: "",
                 BonLivraison:"",
                 nsocial: "",
                 siegesocial: "",
                 nrc: "",
                 ntp: "",
                 nice: "",
                 rib: "",
                 fax: "",
                 fixe: "",
                 gsm: "",
                 email: ""
      });
    })})
   
  };









  return (
    <div>
    <Header />
    <Footer2  />
    <br/><br/>
    <h1 id = "titre">Masque de saisie des données</h1>
         <br/>

         <div className="container">
         <label htmlFor="inputEmail4" className="form-label identification">Bon de commande</label><br/>
         <label htmlFor="inputEmail4" className="form-label identification">I-Identification</label>
    <Form className="row g-3" onSubmit={handleSubmit}>
    

<div className="col-md-6">
 <label htmlFor="inputPassword4" className="form-label">Nom de l'utilisateur</label>
 <input type="text" className="form-control" id="inputPassword4"  value={formData.utilisateur}
              onChange={e => setFormData({...formData, utilisateur: e.target.value})}/>
</div>
<div className="col-6">
 <label htmlFor="inputAddress" className="form-label">Qualité</label>
 <input type="text" className="form-control" id="inputAddress" value={formData.qualite}
              onChange={e => setFormData({...formData, qualite: e.target.value})}/>
</div>
<div className="col-6">
 <label htmlFor="inputAddress2" className="form-label">N° BC</label>
 <input type="text" className="form-control" id="inputAddress2" required value={formData.numero}
              onChange={e => setFormData({...formData, numero: e.target.value})}/>
</div>

   <div className="col-md-6"> 
  <label htmlFor="inputAddress2" className="form-label">Date</label>
 <input type="date" className="form-control" id="inputAddress2" value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}/>
   
</div>

<div className="col-md-6">
 <label htmlFor="inputState" className="form-label">Objet </label><br/>
<textarea value={formData.objet}
              onChange={e => setFormData({...formData, objet: e.target.value})}></textarea>
</div>
<div className="col-md-6">
 <label htmlFor="inputZip" className="form-label">Montant global</label>
 <input type="text" className="form-control" id="inputZip" value={formData.montant}
              onChange={e => setFormData({...formData, montant: e.target.value})} />
</div>
<div className="col-md-4">
 <label htmlFor="inputZip" className="form-label">Année budgetaire</label>
 <input type="text" className="form-control" id="inputZip" value={formData.annee}
              onChange={e => setFormData({...formData, annee: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Article</label>
 <input type="text" className="form-control" id="inputEmail4" value={formData.article}
              onChange={e => setFormData({...formData, article: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Chapitre</label>
 <input type="dtext" className="form-control" id="inputEmail4" value={formData.chapitre}
              onChange={e => setFormData({...formData, chapitre: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">ligne</label>
 <input type="text" className="form-control" id="inputEmail4" value={formData.ligne}
              onChange={e => setFormData({...formData, ligne: e.target.value})}/>
</div>


<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Reception le </label>
 <input type="date" className="form-control" id="inputEmail4" value={formData.reception}
              onChange={e => setFormData({...formData, reception: e.target.value})} />
</div>
<FormGroup>
    <label htmlFor="exampleFile">
      Bon de livraison 
    </label>
    <input
      id="exampleFile"
      name="file"
      type="file"
      
              onChange={e => setFormData({...formData, BonLivraison: e.target.files[0]})}
    />
  
  </FormGroup>
  <label htmlFor="inputEmail4" className="form-label identification">II-Fournisseur</label>
<div className="col-md-6">
 <label htmlFor="inputCity" className="form-label">Nom social</label>
 <input type="text" className="form-control" id="inputCity" value={formData.nsocial}
              onChange={e => setFormData({...formData, nsocial: e.target.value})}/>
</div>
<div className="col-md-6">
 <label htmlFor="inputCity" className="form-label">Siege social</label>
 <input type="text" className="form-control" id="inputCity" value={formData.siegesocial}
              onChange={e => setFormData({...formData, siegesocial: e.target.value})}/>
</div>
<div className="col-md-4">
 <label htmlFor="inputCity" className="form-label">RC N°</label>
 <input type="text" className="form-control" id="inputCity" value={formData.nrc}
              onChange={e => setFormData({...formData, nrc: e.target.value})}/>
</div>
<div className="col-md-4">
 <label htmlFor="inputCity" className="form-label">TP N°</label>
 <input type="text" className="form-control" id="inputCity" value={formData.ntp}
              onChange={e => setFormData({...formData, ntp: e.target.value})}/>
</div> 
<div className="col-md-4">
 <label htmlFor="inputCity" className="form-label">ICE N°</label>
 <input type="text" className="form-control" id="inputCity" value={formData.nice}
              onChange={e => setFormData({...formData, nice: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputCity" className="form-label">RIB</label>
 <input type="text" className="form-control" id="inputCity" value={formData.rib}
              onChange={e => setFormData({...formData, rib: e.target.value})}/>
</div>

<div className="col-md-3">
 <label htmlFor="inputCity" className="form-label">FAX</label>
 <input type="text" className="form-control" id="inputCity" value={formData.fax}
              onChange={e => setFormData({...formData, fax: e.target.value})}/>
</div>
<div className="col-md-3">
 <label htmlFor="inputCity" className="form-label">FIXE</label>
 <input type="text" className="form-control" id="inputCity" value={formData.fixe}
              onChange={e => setFormData({...formData, fix: e.target.value})}/>
</div>
<div className="col-md-3">
 <label htmlFor="inputCity" className="form-label">GSM</label>
 <input type="text" className="form-control" id="inputCity" value={formData.gsm}
              onChange={e => setFormData({...formData, gsm: e.target.value})}/>
</div>
<div className="col-md-3">
 <label htmlFor="inputCity" className="form-label">Email</label>
 <input type="text" className="form-control" id="inputCity" value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}/>
</div>
<div className="col-md-4">

</div>
<div className="col-12">
    <button type="submit" className="btn btn-primary suivant" >Enregister</button>
  </div>

</Form>
<br/><br/>


 </div>
 </div>
  )
}
export default BonCommande;