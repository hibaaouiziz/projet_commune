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

export default function ModifierDecompte() {
  const location = useLocation()
  const { num1 } = location.state
  const { type1} = location.state
  const { typemarche} = location.state
    const [progress, setProgress] = useState(0);
    const [numero, setNumero] = useState("");
    const [type, setType] = useState("");
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
    const [marches, setMarches] = useState("");
    const [chapitre, setChapitre] = useState("");
    const [rubriques, setRubriques]  = useState("")
    const [etat, setEtat] = useState("");
    const [loader, setLoader] = useState(false);















    function get(){
        const marcheCollectionRef = query(collection(db, type1 ),where("numero", "==", num1))
       
            onSnapshot(marcheCollectionRef, snapshot => {
            snapshot.docs.map(doc => {
             var type = doc.data().type;
             var chap = doc.data().chapitre;
             var rub = doc.data().rubrique
             setMarches(type)
             setChapitre(chap)
             setRubriques(rub)
             console.log(marches)
              })
            })
          
          ajouter();
        }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      const batch = writeBatch(db);
      const ajouter = async() => {
        
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
             const nycRef=doc(db,type1,num1,"decompte",mission)
                setDoc(nycRef,{
                  type: marches,
                  chapitre: chapitre,
                  rubrique:rubriques,
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
    
    
        
    const marcheCollectionRef1 = query(collection(db,type1,num1,"decompte"))
    useEffect(() => {
      
      onSnapshot(marcheCollectionRef1, snapshot => {
          setDecomptes(snapshot.docs.map(doc => {
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
    const [decomptes, setDecomptes] = useState([]);
  return ( 
      <div>
  <Header />
  <Footer2  />
  <br/><br/>
  <h1 id = "titre">Modifier</h1>
    <div class="container mb-3 row">
    <label for="inputEmail4" class="form-label identification">Controle et evaluation</label><br />
        <label for="inputEmail4" class="form-label identification">Evaluation de l'execution budgetaire</label>  

<div class="table-responsive">
<table class="table">
<thead>
<tr>
<th scope="col">Mission</th>
<th scope="col">Nombre de jours de travail</th>
<th scope="col">Décomptes </th>
<th scope="col">Décomptes cumulatifs</th>
<th scope="col">% cumulatifs</th>

<th scope="col">Relicats</th>
<th scope="col">Virements</th>
<th scope="col">Dates de l'établissement des décomptes</th>
<th scope="col">Dates de dépot des décomptes</th>
<th scope="col">Dates de signature des décomptes</th>
<th scope="col">Dates des virements</th>
<th scope="col">Etats des virements</th>


</tr>
</thead>

<tbody>
  { decomptes.map((decompte, i) => (   

<tr>
<td>{decompte.id}</td>
<td>{decompte.jour}</td>
<td>{decompte.decompte}</td>
<td>{decompte.cumulatifs}</td>
<td>{decompte.pc}</td>
<td>{decompte.relicat}</td>
<td>{decompte.virements}</td>
<td>{decompte.etablissement}</td>
<td>{decompte.depot}</td>
<td>{decompte.signature}</td>
<td>{decompte.Dvirements}</td>
<td><a href={decompte.etat} target="_blank"> PDF!</a></td>


</tr>

))}
</tbody>

</table> 
<div/>
<br /><br />
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
   <td><input type="txt"  id="inputEmail4" value={mission} onChange={(e) => setMission(e.target.value)}/></td>
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
   
    </div> 
    <div className="col-3">
<button className="btn btn-primary suivant" type="submit" onClick={get}>Ajouter</button> 
</div>
<div className="col-6">
<Link to="/ModifierControl" className="btn btn-primary suivant" state={{ type2: type1, num2: num1, typemarche}}>Suivant</Link>
</div>
    
    
    </div>
    <br /><br /><br /><br />
    </div>
    

  )
}
