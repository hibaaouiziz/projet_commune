import React from 'react';
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2';
import {Link, useLocation} from 'react-router-dom';
import { Form } from "react-bootstrap";
import  { useState, useEffect } from "react";

import { setDoc, addDoc,writeBatch,query,where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import {db,
   storage} from '.././firebase';
import {
    collection,
    onSnapshot,
    doc,
   updateDoc,
    deleteDoc
  }from "firebase/firestore"

 function Decomptes(props) {

  const location = useLocation()
  const { nom } = location.state
  
  const [progress, setProgress] = useState(0);
  const [numero, setNumero] = useState([])
  const [types, setTypes] = useState("");
  const [mission, setMission] = useState("");
  const [jour, setJour] = useState("");
  const [decompte, setDecompte] = useState("");
  const [cumulatifs, setCumulatifs] = useState("");
  const [relicat, setRelicat] = useState("");
  const [virements, setVirements] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [depot, setDepot] = useState("");
  const [signature, setSignature] = useState("");
  const [Dvirements, setDVirements] = useState("");
  const [marches, setMarches] = useState([]);
  const [chapitres, setChapitres] = useState("");
  const [lignes, setLignes]  = useState("")
  const [etat, setEtat] = useState("");
  const [loader, setLoader] = useState(false);

  function test() {
    console.log(types)
    console.log(numero)
    get(types, numero)
  }

  const get = async(e) => {
    e.preventDefault();
    updateDoc(doc(db, types, numero),{
      division: nom, 
    })
   
    const marcheCollectionRef = query(collection(db,types),where("numero","==",numero))
  
        onSnapshot(marcheCollectionRef, snapshot => {
          snapshot.docs.map(doc => {
           var type = doc.data().type;       
           var chapitres = doc.data().chapitre;
           var lignes = doc.data().ligne;
           var articles = doc.data().article;
             ajouter(type,chapitres,lignes,articles)
              }
            
          )
        
        })
      
    }
    




















  const batch = writeBatch(db);
  const ajouter = async(type,chapitres,lignes,articles) => {
    
  // e.preventDefault();
    const storageRef = ref(
      storage,
      `/images/${etat.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, etat);
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
        setMission("");
        setJour("");
        setCumulatifs("");
        setEtablissement("");
        setDecompte("");
        setRelicat("");
        setDepot("");
        setSignature("");
        setVirements("");
        setEtat("")
        setDVirements("");

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {

         const nycRef=doc(db,types,numero,"decompte",mission)
            setDoc(nycRef,{
              type: type,
              article: articles,
              chapitre: chapitres,
              ligne: lignes,
              mission: mission,
              jour: jour,
              decompte: decompte,
              cumulatifs: cumulatifs,
              etablissement: etablissement,
              decompte: decompte,
              relicat: relicat,
              depot: depot,
              signature: signature,
              virements: virements,
              Dvirements: Dvirements,
              etat: url,
          
             })
             
             .then(()  => {
              batch.commit();
              setLoader(false);
              alert("Your message has been submitted👍");
             })
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });
             setMission("");
             setJour("");
             setCumulatifs("");
             setEtablissement("");
             setDecompte("");
             setRelicat("");
             setDepot("");
             setSignature("");
             setVirements("");
             setDVirements("");
             setEtat("")
            })})}


    const enregistrer = async(e) => {
     
    const storageRef = ref(
      storage,
      `/images/${etat.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, etat);
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
        setNumero("");
        setMission("");
        setJour("");
        setCumulatifs("");
        setEtablissement("");
        setDecompte("");
        setRelicat("");
        setDepot("");
        setSignature("");
        setVirements("");
        setDVirements("");
        setEtat("")
    

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
         const nycRef=doc(db,types,numero,"decompte",mission)
            setDoc(nycRef,{
             // type: marches,
              chapitre: chapitres,
              ligne:lignes,
              mission: mission,
              jour: jour,
              decompte: decompte,
              etablissement: etablissement,
              cumulatifs: cumulatifs,
              relicat: relicat,
              depot: depot,
              signature: signature,
              virements: virements,
              Dvirements: Dvirements,
              etat: url,
          
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
             setMission("");
             setJour("");
             setCumulatifs("");
             setEtablissement("");
             setDecompte("");
             setRelicat("");
             setDepot("");
             setSignature("");
             setVirements("");
             setDVirements("");
             setEtat("")
            })})}



  return (
    <div>
    <Header />
    <Footer2  />
    <br/><br/>
    <h1 id = "titre">Décompte</h1>
         <br/>
    <div className="container">
    <Form  onSubmit={get}>
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
    <select className=" col-sm-10" aria-label="Default select example" required value={types} onChange={(e) => setTypes(e.target.value)}>
       
       <option ></option>
       <option value="Marche">Marché </option>
       <option value="Bon de Commande">Bon de Commande</option>
     </select>
     <br/> <br/>
    <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N°</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" required value={numero} onChange={(e) => setNumero(e.target.value)}/>
  </div>
  </div>
    
    <div className="table-responsive">
<table className="table">

     <thead>
 <tr>
   <th scope="col">Missions</th>
   <th scope="col">Nombre de jours de travail</th>
   <th scope="col">Décomptes </th>
   <th scope="col">Décomptes cumulatifs</th>
   
   <th scope="col">Relicats</th>
   <th scope="col">Virements</th>
   <th scope="col">Dates de l'établissement des décomptes</th>
   <th scope="col">Dates de dépot des décomptes</th>
   <th scope="col">Dates de signature des décomptes</th>
   <th scope="col">Dates des virements</th>
   <th scope="col">L'etat des Virements</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td><input type="txt"  id="inputEmail4" required value={mission} onChange={(e) => setMission(e.target.value)}/></td>
   <td><input type="txt"  id="inputEmail4" value={jour} onChange={(e) => setJour(e.target.value)}/></td>
   <td><input type="txt"  id="inputEmail4" value={decompte} onChange={(e) => setDecompte(e.target.value)}/></td>
   <td><input type="txt"  id="inputEmail4" value={cumulatifs} onChange={(e) => setCumulatifs(e.target.value)}/></td>
   <td><input type="txt"  id="inputEmail4"value={relicat} onChange={(e) => setRelicat(e.target.value)}/></td>
   <td><input type="txt"  id="inputEmail4"value={virements} onChange={(e) => setVirements(e.target.value)}/></td>
   <td><input type="date" value={etablissement} onChange={(e) => setEtablissement(e.target.value)}/></td>
   <td><input type="date" value={depot} onChange={(e) => setDepot(e.target.value)}/></td>
   <td><input type="date" value={signature} onChange={(e) => setSignature(e.target.value)}/></td>
   <td><input type="date" value={Dvirements} onChange={(e) => setDVirements(e.target.value)}/></td>
   <td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" value={etat} onChange={(e) => setEtat(e.target.value)}/></td>

 </tr>
</tbody>
</table>  

</div>  
<br />
<button className="btn btn-primary suivant" type="submit" onClick={get}>Ajouter</button>       
</Form>
</div>
<br /><br /><br /><br />
</div>
  )
}
export default Decomptes;
