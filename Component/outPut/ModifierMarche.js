
import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import 'firebase/firestore';
import  { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import {  query, where,writeBatch } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
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
  import { Form,  FormGroup } from "react-bootstrap";
  import {Link} from 'react-router-dom';

export default function ModifierMarche() {
  const location = useLocation()
  const { from } = location.state
    const [loader, setLoader] = useState(false);
    const [formData,setFormData] = useState(
        {
        uouvert: "",
         uutilisateur : "",
         uqualite : "",
         unumero : "",
         utype: "",
         uobjet:"", 
         udure: "",
         umontant: "",
         uannee: "",
         uchapitre: "",
         uligne: "",
         uarticle: "",
         uapprobation: "",
         uengagement:"",
         unsocial: "",
         usiegesocial: "",
         unrc: "",
         untp: "",
         unice: "",
         urib: "",
         ufax: "",
         ufixe: "",
         ugsm: "",
         uemail: ""
        }
      )


      const handleSubmit = (e) => {

  
        e.preventDefault();
        setLoader(true);
        
            
      
        
        updateDoc(doc(db, "Marche", formData.unumero),{
          utilisateur: formData.uutilisateur,
          qualite: formData.uqualite,
          numero: formData.unumero,
          dure: formData.udure,
          type: formData.utype,
          objet: formData.uobjet,
          ouvert: formData.uouvert,
          montant: formData.umontant,
          annee: formData.uannee,
          chapitre: formData.uchapitre,
          ligne: formData.uligne,
          article: formData.uarticle,
          engagement: formData.uengagement,
          approbation: formData.uapprobation,
          nsocial: formData.unsocial,
          siegesocial: formData.usiegesocial,
          nrc: formData.unrc,
          ntp: formData.untp,
          nice: formData.unice,
          rib: formData.urib,
          fax: formData.ufax,
          fixe: formData.ufixe,
          gsm: formData.ugsm,
          email: formData.uemail,
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
            uutilisateur : "",
         uqualite : "",
         unumero : "",
         utype: "",
         uobjet:"", 
         udure: "",
         umontant: "",
         uannee: "",
         uchapitre: "",
         uligne: "",
         uarticle: "",
         uapprobation: "",
         uengagement:"",
         unsocial: "",
         usiegesocial: "",
         unrc: "",
         untp: "",
         unice: "",
         urib: "",
         ufax: "",
         ufixe: "",
         ugsm: "",
         uemail: ""
          
       });
        }
        const marcheCollectionRef = query(collection(db, "Marche"),where("numero","==",from))
        useEffect(() => {
            onSnapshot(marcheCollectionRef, snapshot => {
                snapshot.docs.map(doc => {
            setFormData({
              utype : doc.data().type,
              uutilisateur : doc.data().utilisateur,
              uqualite : doc.data().qualite,
              unumero : doc.data().numero,
              udate : doc.data().date,
              uobjet : doc.data().objet,
              umontant : doc.data().montant,
              udure : doc.data().dure,
              uannee : doc.data().annee,
              uchapitre : doc.data().chapitre,
              uligne : doc.data().ligne,
              uarticle: doc.data().article,
              uapprobation: doc.data().approbation ,
              uengagement: doc.data().engagement,
              unsocial : doc.data().nsocial,
              usiegesocial : doc.data().siegesocial,
              unrc : doc.data().nrc,
              untp : doc.data().ntp,
              unice : doc.data().nice,
              urib : doc.data().rib,
              ufax : doc.data().fax,
              ufixe : doc.data().fixe,
              ugsm : doc.data().gsm,
              uemail : doc.data().email,
              uouvert : doc.data().ouvert,
             
             
    
            })
        
              })
            })
          }, [])
        
      
  return (
<div>
       <Header />
       <Footer2 />
       <br/><br/>
       <h1 id = "titre">Modifier</h1>
            <br/>
  
            <div className="container">
            <label htmlFor="inputEmail4" className="form-label identification">I-Identification</label>
       <Form className="row g-3" onSubmit={handleSubmit}>
       <label htmlFor="inputEmail4" className="form-label">Type de marchés</label>
       <select className="form-select" aria-label="Default select example" value={formData.utype}
              onChange={e => setFormData({...formData, utype: e.target.value})}>
       
  <option defaultValue>Choisi le type ...</option>
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
    <input type="text" className="form-control" id="inputPassword4"  value={formData.uutilisateur}
              onChange={e => setFormData({...formData, uutilisateur: e.target.value})}/>
  </div>
  <div className="col-6">
    <label htmlFor="inputAddress" className="form-label">Qualité</label>
    <input type="text" className="form-control" id="inputAddress" value={formData.uqualite}
              onChange={e => setFormData({...formData, uqualite: e.target.value})}/>
  </div>
  <div className="col-6">
    <label htmlFor="inputAddress2" className="form-label">N° du marché</label>
    <input type="text" className="form-control" id="inputAddress2" value={formData.unumero}
              onChange={e => setFormData({...formData, unumero: e.target.value})} />
  </div>
  <div className="col-md-3">
      <br/><br/>
      <FormGroup check="false">
  <input
       value="Ouvert"
       onChange={e => setFormData({...formData, uouvert: e.target.value})}
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
    onChange={e => setFormData({...formData, uouvert: e.target.value})}
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
<textarea value={formData.uobjet}
              onChange={e => setFormData({...formData, uobjet: e.target.value})}></textarea>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputZip" className="form-label">Durée du marché</label>
    <input type="text" className="form-control" id="inputZip" value={formData.udure}
              onChange={e => setFormData({...formData, udure: e.target.value})} />
  </div>

  <div className="col-md-4">
    <label htmlFor="inputZip" className="form-label">Montant global du marché</label>
    <input type="text" className="form-control" id="inputZip" value={formData.umontant}
              onChange={e => setFormData({...formData, umontant: e.target.value})}/>
  </div>

  <div className="col-md-4">
 <label htmlFor="inputZip" className="form-label">Année budgetaire</label>
 <input type="text" className="form-control" id="inputZip" value={formData.uannee}
              onChange={e => setFormData({...formData, uannee: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Article</label>
 <input type="text" className="form-control" id="inputEmail4" value={formData.uarticle}
              onChange={e => setFormData({...formData, uarticle: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Chapitre</label>
 <input type="dtext" className="form-control" id="inputEmail4" value={formData.uchapitre}
              onChange={e => setFormData({...formData, uchapitre: e.target.value})}/>
</div>
<div className="col-md-12">
 <label htmlFor="inputEmail4" className="form-label">Ligne</label>
 <input type="text" className="form-control" id="inputEmail4" value={formData.uligne}
              onChange={e => setFormData({...formData, uligne: e.target.value})}/>
</div>


  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Engagement</label>
    <input type="date" className="form-control" id="inputEmail4" value={formData.uengagement}
              onChange={e => setFormData({...formData, uengagement: e.target.value})}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Approbation</label>
    <input type="date" className="form-control" id="inputEmail4" value={formData.uapprobation}
              onChange={e => setFormData({...formData, uapprobation: e.target.value})}/>
  </div>
  <label htmlFor="inputEmail4" className="form-label identification">II-Adjudicataire</label>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Nom social</label>
    <input type="text" className="form-control" id="inputCity" value={formData.unsocial}
              onChange={e => setFormData({...formData, unsocial: e.target.value})}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputCity" className="form-label">Siege social</label>
    <input type="text" className="form-control" id="inputCity" value={formData.usiegesocial}
              onChange={e => setFormData({...formData, usiegesocial: e.target.value})}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">RC N°</label>
    <input type="text" className="form-control" id="inputCity" value={formData.unrc}
              onChange={e => setFormData({...formData, unrc: e.target.value})}/>
  </div>
  <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">TP N°</label>
    <input type="text" className="form-control" id="inputCity" value={formData.untp}
              onChange={e => setFormData({...formData, untp: e.target.value})}/>
  </div> 
   <div className="col-md-4">
    <label htmlFor="inputCity" className="form-label">ICE N°</label>
    <input type="text" className="form-control" id="inputCity"value={formData.unice}
              onChange={e => setFormData({...formData, unice: e.target.value})}/>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputCity" className="form-label">RIB</label>
    <input type="text" className="form-control" id="inputCity" value={formData.urib}
              onChange={e => setFormData({...formData, urib: e.target.value})}/>
  </div>

  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">FAX</label>
    <input type="text" className="form-control" id="inputCity" value={formData.ufax}
              onChange={e => setFormData({...formData, ufax: e.target.value})}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">FIXE</label>
    <input type="text" className="form-control" id="inputCity" value={formData.ufixe}
              onChange={e => setFormData({...formData, ufixe: e.target.value})}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">GSM</label>
    <input type="text" className="form-control" id="inputCity" value={formData.ugsm}
              onChange={e => setFormData({...formData, ugsm: e.target.value})}/>
  </div>
  <div className="col-md-3">
    <label htmlFor="inputCity" className="form-label">Email</label>
    <input type="text" className="form-control" id="inputCity" value={formData.uemail}
              onChange={e => setFormData({...formData, uemail: e.target.value})}/>
  </div>



  


  <div className="col-3">
    <button type="submit" className="btn btn-primary suivant" >Enregister</button>
  </div>
  <div className="col-6">
    <Link to="/ModifierFichier" state={{ num: from , typemarche : formData.utype }} className="btn btn-primary suivant" >SUIVANT</Link>
  </div>
  
</Form>
 <br/><br/> <br/><br/>
 

    </div>
    </div>
  
  )
}
