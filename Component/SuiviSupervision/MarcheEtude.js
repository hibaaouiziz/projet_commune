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
export default function MarcheEtude(props) {
  const [progress, setProgress] = useState(0);
  const [numero, setNumero] = useState("");
  const [mission, setMission] = useState("");
  const [date, setDate] = useState("");
  const [ordre, setOrdre] = useState("");
  const [validation, setValidation] = useState("");
  const [rapport, setRapport] = useState("");
  const [loader, setLoader] = useState(false);

  const batch = writeBatch(db);
const fonct = (e) =>{
  e.preventDefault();
  updateDoc(doc(db, "Marche", numero),{
    division: props.nom1, 
  },
    ajouter()

)}
 



  const ajouter = async() => {
    //e.preventDefault();
    const storageRef = ref(
      storage,
      `/images/${ordre.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, ordre);
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
        setDate("");
        setOrdre("");
        setValidation("");
        setRapport("");
        
     

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
       
           (
             ajouterRef(url)
          
              )
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });
             setMission("");
             setDate("");
             setOrdre("");
             setValidation("");
            })})}

            const ajouterRef = async(url) => {
             
              const storageRef = ref(
                storage,
                `/images/${rapport.name}`
              );
              const uploadImage = uploadBytesResumable(storageRef, rapport);
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
                  setDate("");
                  setOrdre("");
                  setValidation("");
                  setRapport("");
                
               
          
                  getDownloadURL(uploadImage.snapshot.ref).then((url1) => {
                   const nycRef=doc(db,"Marche",numero,"suivi",mission)
                      setDoc(nycRef,{
                     division: props.nom1,
                       mission:mission,
                       date: date,
                       ordre: url, 
                       validation: validation,
                       rapport: url1,
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
    <div className="container" >
         
       <br/><br/>
      <Form  onSubmit={fonct}>
       <div className="mb-3 row">
       
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche"  required value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>
       <table border="3" id="tab" className="table table-bordered">
         
   <thead>
                    
                        <tr>
                        <th >N° de mission</th>
                        <th >Date d'ordre de service</th>
                        <th >Ordre de service</th>
                        <th >Date de la validation de la mission</th>
                        <th >Rapport de la validation de la mission</th>
                        
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td ><input type="text" required value={mission} onChange={(e) => setMission(e.target.value)}/></td>  
                        <td ><input type="date" value={date} onChange={(e) => setDate(e.target.value)}/></td>  
                        <td ><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setOrdre(e.target.files[0])}/></td>  
                        <td ><input type="date" value={validation} onChange={(e) => setValidation(e.target.value)}/></td>  
                        <td ><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"  onChange={(e) => setRapport(e.target.files[0])}/></td>
                        </tr>
                        </tbody>
                       
                </table>
              
     
    
       <br/><br/>
     
            <br/><br/>
            <div className="col-12">
    <button className="btn btn-primary suivant" type="submit" >Ajouter</button>
    <br/><br/><br/><br/>
   
    </div> 
    </Form>
    </div>

  )
}
