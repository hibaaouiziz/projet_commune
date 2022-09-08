import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
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


export default function ModifierFichier() {
  const location = useLocation()
  const { num } = location.state
  const { typemarche} = location.state

  const [fichiers, setFichiers] = useState([])
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
             const nycRef=doc(db,"Marche",num,"fichier",nom)
                setDoc(nycRef,{
                  nom: nom,
                  fichier: url,
                  
              
                })
                .then(() => {
                  
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
                 
                    setDoc(doc(db,"Marche",num,"fichier",nom),{
                      nom: nom,
                      fichier: url,
                      
                  
                    })
                    .then(() => {
                     
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
        


  const marcheCollectionRef3 =query(collection(db,"Marche",num,"fichier"))
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
    <div>
    <Header />
    <Footer2 />
    <br/><br/>
    <h1 id = "titre">Modifier</h1>
    <br/>
    <div className="container">

        <label for="inputEmail4" class="form-label identification">Fichiers :</label><br />
        <br/>
{ fichiers.map((fichier, i) => ( 
  <div>
    <form className="row g-3">
    <div className="col-6">
<label for="inputAddress2" class="form-label">{fichier.nom} :</label></div>
<div className="col-6">
<label><a href={ fichier.fichier} target="_blank"> PDF!</a></label>
</div>
</form>
  </div>
))}
<br/><br/>
<div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" value={numero} onChange={(e) => setNumero(e.target.value)}/>
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
<td><input type="txt"  id="inputEmail4" value={nom} onChange={(e) => setNom(e.target.value)}/></td>
<td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"  onChange={(e) => setFichier(e.target.files[0])}/></td>
</tr>
</tbody>

</table> 

          
</div>  
<br /><br /><br />
<div className="col-3">
<button className="btn btn-primary suivant" type="submit" onClick={enregistrer}>Enregister</button> 
</div>
<div className="col-6">
<Link to="/ModifierDecompte" className="btn btn-primary suivant" state={{ type1: "Marche", num1: num, typemarche}}>Suivant</Link>
</div>
</div>
    </div>
    </div>
  )
}
