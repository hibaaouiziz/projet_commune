import React from 'react';
import Header from '../headers/Header.js';
import { Form } from "react-bootstrap";
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
    updateDoc,
    deleteDoc
  }from "firebase/firestore"


export default function MarcheFourniture(props) {
  const [progress, setProgress] = useState(0);
  const [numero, setNumero] = useState("");
  const [mission, setMission] = useState("");
  const [bon, setBon] = useState("");
  const [pv, setPv] = useState("");
  const [loader, setLoader] = useState(false);


  const fonct = (e) =>{
    e.preventDefault();
    updateDoc(doc(db, "Marche", numero),{
      division: props.nom1, 
    },
      ajouter()
  
  )}

  const batch = writeBatch(db);
  const ajouter = async() => {
   // e.preventDefault();
    const storageRef = ref(
      storage,
      `/images/${bon.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, bon);
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
        setBon("");
        setPv("");

        
     

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
       
           (
             ajouterRef(url)
          
              )
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });
             setMission("");
             setBon("");
             setPv("");
            })})}

            const ajouterRef = async(url) => {
             
              const storageRef = ref(
                storage,
                `/images/${pv.name}`
              );
              const uploadImage = uploadBytesResumable(storageRef, pv);
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
                setBon("");
                setPv("");
                
               
          
                  getDownloadURL(uploadImage.snapshot.ref).then((url1) => {
                   const nycRef=collection(db,"Marche",numero,"suivi","missions",mission)
                      addDoc(nycRef,{
                      mission:mission,
                      bon: url,
                      pv: url1,
                      division: props.nom1
                     }).then(() => {
                       batch.commit();
                      setLoader(false);
                      alert("Your message has been submitted👍");
                     })
                       .catch((error) => {
                        alert(error.message);
                        setLoader(false);
                       });
                 
                      })})}


  return (
    <div className="container">
         
       
       <br /><br/>
       <Form  onSubmit={fonct}>
       <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" required value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>
       
       <div className="table-responsive">
<table className="table">

     <thead>
 <tr>
   <th scope="col">Missions</th>
   <th scope="col">Bon de reception</th>
   <th scope="col">PV de reception</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td><input type="txt"  id="inputEmail4"  required value={mission} onChange={(e) => setMission(e.target.value)}/></td>
   <td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setBon(e.target.files[0])}/></td>
   <td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setPv(e.target.files[0])}/></td>
 </tr>
</tbody>
</table>  

<br/><br/>
     
     <br/><br/>
     <div className="col-12">
<button className="btn btn-primary suivant" type="submit">Ajouter</button>
<br/><br/><br/><br/>
</div>
          
</div>  
</Form>
       </div>
  
    

  )
}

