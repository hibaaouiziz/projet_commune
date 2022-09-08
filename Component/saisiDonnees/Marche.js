import React from 'react';
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import'././styleCss/Marche.css';
import {Link} from 'react-router-dom';
import  { useState, useEffect } from "react";
import { Form,  FormGroup } from "react-bootstrap";
import { setDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage} from '.././firebase';
import {
    collection,
    onSnapshot,
    doc,
   
    deleteDoc
  } from "firebase/firestore"

 function Marche() {
  const [type, setType] = useState("");
  const [utilisateur, setUtilisateur] = useState("");
  const [qualite, setQualite] = useState("");
  const [numero, setNumero] = useState("");
  const [objet, setObjet] = useState("");
  const [ouvrest, setOvrest] = useState("");
  const [dure, setDure] = useState("");
  const [cps, setCps] = useState("");
  const [montant, setMontant] = useState("");
  const [annee, setAnnee] = useState("");
  const [article, setArticle] = useState("");
  const [chapitre, setChapitre] = useState("");
  const [ligne, setLigne] = useState("");
  const [ouvert,setOuvert] = useState("");
  const [engagement, setEngagement] = useState("");
  const [approbation, setAppapprobation] = useState("");
  const [nsocial, setNsocial] = useState(""); 
  const [siegesocial, setSiegesocial] = useState("");
  const [nrc, setNrc] = useState("");
  const [ntp, setNtp] = useState("");
  const [nice, setNice] = useState("");
  const [rib, setRib] = useState("");
  const [fax, setFax] = useState("");
  const [fixe, setFixe] = useState("");
  const [email, setEmail] = useState("");
  const [gsm, setGsm] = useState("");
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(0);

 
  const handleSubmit = (e) => {

  
    e.preventDefault();
    setLoader(true);
    
        
  
    
    setDoc(doc(db, "Marche", numero),{
      utilisateur: utilisateur,
      qualite: qualite,
      numero: numero,
      dure: dure,
      type: type,
      objet: objet,
      montant: montant,
      annee: annee,
      chapitre: chapitre,
      ligne: ligne,
      article: article,
      ouvert: ouvert,
      engagement: engagement,
      approbation: approbation,
      nsocial: nsocial,
      siegesocial: siegesocial,
      nrc: nrc,
      ntp: ntp,
      nice: nice,
      rib: rib,
      fax: fax,
      fixe: fixe,
      gsm: gsm,
      email: email,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
      setUtilisateur("");
      setQualite("");
      setNumero("");
      setDure("");
      setType("");
      setMontant("");
      setObjet("");
      setOuvert("");
      setAnnee("");
      setChapitre("");
      setLigne("");
      setArticle("");
      setEngagement("");
      setAppapprobation("");
      setNsocial("");
      setSiegesocial("");
      setNrc("");
      setNtp("");
      setNice("");
      setRib("");
      setFax("");
      setFixe("");
      setGsm("");
      setEmail("");
    }
    
  
  
 








  return (
    <div>
       <Header />
       <Footer2  />
       <br/><br/>
       <h1 id = "titre">Masque de saisie des données</h1>
            <br/>
  
            <div className="container">
            <label htmlFor="inputEmail4" className="form-label identification">I-Identification</label>
       <Form className="row g-3" onSubmit={handleSubmit}>
       <label htmlFor="inputEmail4" className="form-label">Type de marchés</label>
       <select className="form-select" aria-label="Default select example" required value={type} onChange={(e) => setType(e.target.value)}>
       
  <option > </option>
  <option value="Marché des travaux">Marché des travaux</option>
  <option value="Marché des services">Marché des services</option>
  <option value="Marché des fournitures">Marché des fournitures</option>
  <option value="Marché des études">Marché des études</option>
  <option value="Contrats">Contrats</option>
  <option value="Conventions">Conventions</option>
  <option value="Marchés spéciaux">Marchés spéciaux</option>
</select>

  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Nom utilisateur</label>
    <input type="text" className="form-control" id="inputPassword4"  value={utilisateur}
        onChange={(e) => setUtilisateur(e.target.value)}/>
  </div>
  <div className="col-6">
    <label htmlFor="inputAddress" className="form-label">Qualité</label>
    <input type="text" className="form-control" id="inputAddress" value={qualite}
        onChange={(e) => setQualite(e.target.value)}/>
  </div>
  <div className="col-6">
    <label htmlFor="inputAddress2" className="form-label">N° du marché</label>
    <input type="text" className="form-control" id="inputAddress2" required value={numero}
        onChange={(e) => setNumero(e.target.value)} />
  </div>
  <div className="col-md-3">
      <br/><br/>
      <FormGroup check="false">
  <input
  value="Ouvert"
  onChange={(e) => setOuvert(e.target.value)}
        name="radio1"
        type="radio"
      />
      {' '}
      <label check="false">
      Ouvert 
      </label>
      </FormGroup>
      </div>
      
      <div className="col-md-3"> 
      <br/><br/>
    <FormGroup check="false">
      <input
        value="Restreint"
        onChange={(e) => setOuvert(e.target.value)}
        name="radio1"
        type="radio"
      />
      {' '}
      <label check="false">
      Restreint
      </label>
      </FormGroup>
  </div>
 
  <div className="col-md-6">
    <label htmlFor="inputState" className="form-label">Objet du marché</label>
    <br/>
<textarea value={objet}
        onChange={(e) => setObjet(e.target.value)}></textarea>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputZip" className="form-label">Durée du marché</label>
    <input type="text" className="form-control" id="inputZip" value={dure}
        onChange={(e) => setDure(e.target.value)} />
  </div>

  <div className="col-md-4">
    <label htmlFor="inputZip" className="form-label">Montant global du marché</label>
    <input type="text" className="form-control" id="inputZip" value={montant}
        onChange={(e) => setMontant(e.target.value)}/>
  </div>

  <div className="col-md-4">
 <label htmlFor="inputZip" className="form-label">Année budgetaire</label>
 <input type="text" className="form-control" id="inputZip" value={annee}
        onChange={(e) => setAnnee(e.target.value)}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Article</label>
 <input type="text" className="form-control" id="inputEmail4" value={article}
        onChange={(e) => setArticle(e.target.value)}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Chapitre</label>
 <input type="dtext" className="form-control" id="inputEmail4" value={chapitre}
        onChange={(e) => setChapitre(e.target.value)}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Ligne</label>
 <input type="text" className="form-control" id="inputEmail4" value={ligne}
        onChange={(e) => setLigne(e.target.value)}/>
</div>


  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Engagement</label>
    <input type="date" className="form-control" id="inputEmail4" value={engagement}
        onChange={(e) => setEngagement(e.target.value)}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Approbation</label>
    <input type="date" className="form-control" id="inputEmail4" value={approbation}
        onChange={(e) => setAppapprobation(e.target.value)}/>
  </div>
  <label htmlFor="inputEmail4" className="form-label identification">II-Adjudicataire</label>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Nom social</label>
    <input type="text" className="form-control" id="inputCity" value={nsocial}
        onChange={(e) => setNsocial(e.target.value)}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Siege social</label>
    <input type="text" className="form-control" id="inputCity" value={siegesocial}
        onChange={(e) => setSiegesocial(e.target.value)}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">RC N°</label>
    <input type="text" className="form-control" id="inputCity" value={nrc}
        onChange={(e) => setNrc(e.target.value)}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">TP N°</label>
    <input type="text" className="form-control" id="inputCity" value={ntp}
        onChange={(e) => setNtp(e.target.value)}/>
  </div> 
   <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">ICE N°</label>
    <input type="text" className="form-control" id="inputCity" value={nice}
        onChange={(e) => setNice(e.target.value)}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputCity" className="form-label">RIB</label>
    <input type="text" className="form-control" id="inputCity" value={rib}
        onChange={(e) => setRib(e.target.value)}/>
  </div>

  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">FAX</label>
    <input type="text" className="form-control" id="inputCity" value={fax}
        onChange={(e) => setFax(e.target.value)}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">FIXE</label>
    <input type="text" className="form-control" id="inputCity" value={fixe}
        onChange={(e) => setFixe(e.target.value)}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">GSM</label>
    <input type="text" className="form-control" id="inputCity" value={gsm}
        onChange={(e) => setGsm(e.target.value)}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">Email</label>
    <input type="text" className="form-control" id="inputCity" value={email}
        onChange={(e) => setEmail(e.target.value)}/>
  </div>



  


  <div className="col-3">
    <button type="submit" className="btn btn-primary suivant" >Enregister</button>
  </div>
  <div className="col-6">
    <Link to="/Fichier" className="btn btn-primary suivant" >SUIVANT</Link>
  </div>
  
</Form>
 <br/><br/>
 

    </div>
    </div>
  )
  }


export default Marche;
