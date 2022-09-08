import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2';
import {Link} from 'react-router-dom';
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
  import { useReactToPrint } from "react-to-print";
import { Collections } from '@mui/icons-material';

export default function ModifierBC() {
    const [progress, setProgress] = useState(0);

    const [formData,setFormData] = useState(
            {
             uutilisateur : "",
             uqualite : "",
             unumero : "",
             udate: "",
             uobjet:"",
             umontant: "",
             uannee: "",
             uchapitre: "",
             uligne: "",
             uarticle: "",
             ureception: "",
             uBonLivraison:"",
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


          const [loader, setLoader] = useState(false);
          const handleSubmit =  async () => {
          
             

                updateDoc(doc(db, "Bon de Commande", formData.unumero), {
                 utilisateur: formData.uutilisateur,
                 qualite: formData.uqualite,
                 numero: formData.unumero,
                 date: formData.udate,
                 objet: formData.uobjet,
                 montant: formData.umontant,
                 annee: formData.uannee,
                 chapitre: formData.uchapitre,
                 ligne: formData.uligne,
                 article: formData.uarticle,
                 reception: formData.ureception,
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
                    udate: "",
                    uobjet:"",
                    umontant: "",
                    uannee: "",
                    uchapitre: "",
                    uligne: "",
                    uarticle: "",
                    ureception: "",
                    uBonLivraison:"",
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
            
       


    const batch = writeBatch(db);
   
    const location = useLocation()
    const { fromBC } = location.state
   
    const [bc, setBC] = useState([])
    const [decompte, setDecompte] = useState([])
    const [control, setControl] = useState([])
    const marcheCollectionRef = query(collection(db, "Bon de Commande"),where("numero","==",fromBC))
    useEffect(() => {
        onSnapshot(marcheCollectionRef, snapshot => {
            snapshot.docs.map(doc => {
        setFormData({
          uutilisateur : doc.data().utilisateur,
          uqualite : doc.data().qualite,
          unumero : doc.data().numero,
          udate : doc.data().date,
          uobjet : doc.data().objet,
          umontant : doc.data().montant,
          uannee : doc.data().annee,
          uchapitre : doc.data().chapitre,
          uligne : doc.data().ligne,
          uarticle : doc.data().article,
          ureception : doc.data().reception,
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
          uBonLivraison : doc.data().BonLivraison.name
         

        })
    
          })
        })
      }, [])
     
      const marcheCollectionRef1 = query(collection(db,"Bon de Commande","1","decompte"))
      useEffect(() => {
        
        onSnapshot(marcheCollectionRef1, snapshot => {
            setDecompte(snapshot.docs.map(doc => {
              var pc = parseInt(doc.data().decompte) / parseInt(doc.data().cumulatifs)
            return {
              id: doc.id,
              pc: pc,
              viewing: false,
              ...doc.data()
            }
          }))
        })
      }, [])
  return (
    <div>
<Header />
<Footer2 />
<br/><br/>
<h1 id = "titre">Modifier</h1>
    <br/>
    <div class="container mb-3 row">
   


       <label for="inputEmail4" class="form-label identification">I-Identification</label> 
       <form class="row g-3">
  <div class="col-md-3">
 
  <label  class="form-label">Nom de l'utilisateur</label></div>
  <div class="col-md-3">
  <input type="text" class="form-control" id="inputPassword4"  value={formData.uutilisateur}
              onChange={e => setFormData({...formData, uutilisateur: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">Qualité</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uqualite}
              onChange={e => setFormData({...formData, uqualite: e.target.value})}/>
</div>


<div class="col-3">
<label  class="form-label">N° BC</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.unumero}
              onChange={e => setFormData({...formData, unumero: e.target.value})}/>
</div>


<div class="col-md-3">
<label  class="form-label">Date</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.udate}
              onChange={e => setFormData({...formData, udate: e.target.value})}/>
<br/>

</div>
<div class="col-md-6">
<label  class="form-label">Objet</label></div>
<div class="col-md-6">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uobjet}
              onChange={e => setFormData({...formData, uobjet: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">Montant global</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.umontant}
              onChange={e => setFormData({...formData, uutilisateur: e.target.value})}/>
</div>


<div class="col-md-3">
<label  class="form-label">Année budgetaire</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uannee}
              onChange={e => setFormData({...formData, uannee: e.target.value})}/>
</div>
<div class="col-md-2">
<label  class="form-label">Article</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uarticle}
              onChange={e => setFormData({...formData, uarticle: e.target.value})}/>
</div>
<div class="col-md-2">
<label  class="form-label">Chapitre</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uchapitre}
              onChange={e => setFormData({...formData, uchapitre: e.target.value})}/>
</div>
<div class="col-md-2">
<label  class="form-label">ligne</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uligne}
              onChange={e => setFormData({...formData, uutilisateur: e.target.value})}/>
</div>

<div class="col-md-3">
<label  class="form-label">Reception le</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.ureception}
              onChange={e => setFormData({...formData, ureception: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">Bon de livraison</label></div>
<div class="col-md-3">
<input
      id="exampleFile"
      name="file"
      type="file"
      
              onChange={e => setFormData({...formData, uBonLivraison: e.target.files})}
    />
</div>

<label for="inputEmail4" class="form-label identification">II-Adjudicataire</label> 
<div class="col-md-3">
<label  class="form-label">Nom social</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.unsocial}
              onChange={e => setFormData({...formData, unsocial: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">Siege social</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.usiegesocial}
              onChange={e => setFormData({...formData, usiegesocial: e.target.value})}/>
</div>
<div class="col-md-2">
<label  class="form-label">RC N°</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.unrc}
              onChange={e => setFormData({...formData, unrc: e.target.value})}/>
</div>
<div class="col-md-2">
<label  class="form-label">TP N°</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.untp}
              onChange={e => setFormData({...formData, untp: e.target.value})}/>
</div> 
<div class="col-md-2">
<label  class="form-label">ICE N°</label></div>
<div class="col-md-2">
<input type="text" class="form-control" id="inputPassword4"  value={formData.unice}
              onChange={e => setFormData({...formData, unice: e.target.value})}/>
</div>
<div class="col-md-6">
<label  class="form-label">RIB</label></div>
<div class="col-md-6">
<input type="text" class="form-control" id="inputPassword4"  value={formData.urib}
              onChange={e => setFormData({...formData, urib: e.target.value})}/>
</div>

<div class="col-md-3">
<label  class="form-label">FAX</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.ufax}
              onChange={e => setFormData({...formData, ufax: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">FIXE</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.ufixe}
              onChange={e => setFormData({...formData, ufixe: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">GSM</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.ugsm}
              onChange={e => setFormData({...formData, ugsm: e.target.value})}/>
</div>
<div class="col-md-3">
<label  class="form-label">Email</label></div>
<div class="col-md-3">
<input type="text" class="form-control" id="inputPassword4"  value={formData.uemail}
              onChange={e => setFormData({...formData, uemail: e.target.value})}/>
</div>
</form>
<div className="col-3">
<button onClick={handleSubmit} className="btn btn-primary suivant">enregistrer</button>
</div>
<div className="col-6">
<Link to="/ModifierBonLivraison" className="btn btn-primary suivant" state={{ type1: "Bon de Commande", num: fromBC}}>Suivant</Link>
</div>
   </div>
   <br /><br /><br />
   </div>
  )
}
