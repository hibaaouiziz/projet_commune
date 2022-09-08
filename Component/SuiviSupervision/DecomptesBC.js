import React from 'react';
import Header from '../headers/Header.js';

import {Link} from 'react-router-dom';
import  { useState, useEffect } from "react";
import { setDoc, addDoc,writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import {db,
   storage} from '.././firebase';
import {
    collection,
    onSnapshot,
    doc,
   
    deleteDoc
  }from "firebase/firestore"


export default function DecomptesBC() {
  const [progress, setProgress] = useState(0);
  const [numero, setNumero] = useState("");
  const [ndecompte, setNdecompte] = useState("");
  const [objet, setObjet] = useState("");
  const [budget, setBudget] = useState("");
  const [montant, setMontant] = useState("");
  const [decomptes, setDecomptes] = useState("");
  const [relicat, setRelicat] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [depot, setDepot] = useState("");
  const [signature, setSignature] = useState("");
  const [virements, setVirements] = useState("");
  const [etat, setEtat] = useState("");
  const [loader, setLoader] = useState(false);





  const batch = writeBatch(db);
  const ajouter = async(e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `/images/${etat.name}`
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
        setNdecompte("");
        setObjet("");
        setBudget("");
        setMontant("");
        setDecomptes("");
        setRelicat("");
        setDepot("");
        setSignature("");
        setVirements("");
        setEtat("");
      }

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
         const nycRef=doc(db,"Bon de Commande",numero,"decompte",ndecompte)
            setDoc(nycRef,{
              ndecompte: ndecompte,
              objet: objet,
              budget: budget,
              montant: montant,
              decomptes: decomptes,
              relicat: relicat,
              depot: depot,
              signature: signature,
              virements: virements,
              etat: url,
          
            })
            .then(() => {
              await batch.commit();
              setLoader(false);
              alert("Your message has been submitted👍");
             })
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });
             setNdecompte("");
             setObjet("");
             setBudget("");
             setMontant("");
             setDecomptes("");
             setRelicat("");
             setDepot("");
             setSignature("");
             setVirements("");
             setEtat("");
            }))}
          

    const enregistrer = async(e) => {
      e.preventDefault();
      const storageRef = ref(
        storage,
        `/images/${etat.name}`
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
          
          setNdecompte("");
          setObjet("");
          setBudget("");
          setMontant("");
          setDecomptes("");
          setRelicat("");
          setDepot("");
          setSignature("");
          setVirements("");
          setEtat("");
        }
  
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
           const nycRef=doc(db,"Bon de Commande",numero,"decompte",ndecompte)
              setDoc(nycRef,{
                ndecompte: ndecompte,
                objet: objet,
                budget: budget,
                montant: montant,
                decomptes: decomptes,
                relicat: relicat,
                depot: depot,
                signature: signature,
                virements: virements,
                etat: url,
            
              })
              .then(() => {
                await batch.commit();
                setLoader(false);
                alert("Your message has been submitted👍");
               })
               .catch((error) => {
                alert(error.message);
                setLoader(false);
               });
               setNumero("");
               setNdecompte("");
               setObjet("");
               setBudget("");
               setMontant("");
               setDecomptes("");
               setRelicat("");
               setDepot("");
               setSignature("");
               setVirements("");
               setEtat("");
              }))}


  return (
    <div>
    <Header />
    <br/><br/>
    <h1 id = "titre">Décompte</h1>
         <br/>
    <div class="container">
    <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">N° du bon de commande</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="marche" value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>
    <div class="table-responsive">
<table class="table">

<thead>
<tr>
<th scope="col">N°Décompte</th>
<th scope="col">Objet</th>
<th scope="col">Budget global de la rebrique</th>
<th scope="col">Montant</th>
<th scope="col">Decomptes</th>

<th scope="col">Relicat</th>
<th scope="col">Dates de l'établissement des décomptes</th>
<th scope="col">Dates de dépot des décomptes</th>
<th scope="col">Dates de signature des décomptes</th>
<th scope="col">Dates des virements</th>
<th scope="col">L'etat des Virements</th>
</tr>
</thead>
<tbody>
<tr>
<td><input type="txt"  id="inputEmail4" value={ndecompte} onChange={(e) => setNdecompte(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={objet} onChange={(e) => setObjet(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={budget} onChange={(e) => setBudget(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={montant} onChange={(e) => setMontant(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={decomptes} onChange={(e) => setDecomptes(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4" value={relicat} onChange={(e) => setRelicat(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4" value={etablissement} onChange={(e) => setEtablissement(e.target.value)}/></td>
<td><input type="date"  id="inputEmail4" value={depot} onChange={(e) => setDepot(e.target.value)}/></td>
<td><input type="date" value={signature} onChange={(e) => setSignature(e.target.value)}/></td>
<td><input type="date" value={virements} onChange={(e) => setVirements(e.target.value)}/></td>
<td><input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={etat} onChange={(e) => setEtat(e.target.files[0])}/></td>

</tr>
</tbody>
</table>  
<input align="center" type="submit" onClick={ajouter} value="+ ajouter" />
            
</div>  
<br /><br /><br />
<button class="btn btn-primary suivant" type="submit" onClick={enregistrer}>Enregister</button> 
</div>
</div>
  )
}
