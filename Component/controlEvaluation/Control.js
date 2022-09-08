import React from 'react';
import Header from '../headers/Header.js';
import { Form } from "react-bootstrap";
import Footer2 from '../footer/Footer2';
import {Link, useNavigate} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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

export default function Control() {
  const [progress, setProgress] = useState(0);
  const [type, setType] = useState("");
  const [numero, setNumero] = useState("");
  const [mission, setMission] = useState("");
  const [date, setDate] = useState("");
  const [controleur, setControleur] = useState("");
  const [qualite, setQualite] = useState("");
  const [commite, setCommite] = useState("");
  const [remarque, setRemarque] = useState("");
  const [decision, setDecision] = useState("");
  const [pv, setPv] = useState("");
  const [loader, setLoader] = useState(false);
  const batch = writeBatch(db);
  const ajouter = async(e) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `/images/${commite.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, commite);
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
        setQualite("");
        setDate("");
        setControleur("");
        setPv("");
        setCommite("");
        setDecision("");
        setRemarque("");

        
     

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
       
           (
             ajouterRef(url)
          
              )
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });

             setMission("");
             setQualite("");
             setDate("");
             setControleur("");
             setPv("");
             setCommite("");
             setDecision("");
             setRemarque("");
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
                setQualite("");
                setDate("");
                setControleur("");
                setPv("");
                setCommite("");
                setDecision("");
                setRemarque("");
                
               
          
                  getDownloadURL(uploadImage.snapshot.ref).then((url1) => {
                   const nycRef=doc(db,type,numero,"control",mission)
                      setDoc(nycRef,{
                        mission: mission,
                        date: date,
                        controleur: controleur,
                        qualite: qualite,
                        commite: url,
                        remarque: remarque,
                        decision: decision,
                        pv: url1,
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


                      const enregistrer = async(e) => {
                        e.preventDefault();
                        const storageRef = ref(
                          storage,
                          `/images/${commite.name}`
                        );
                        const uploadImage = uploadBytesResumable(storageRef, commite);
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
                            setQualite("");
                            setDate("");
                            setControleur("");
                            setPv("");
                            setCommite("");
                            setDecision("");
                            setRemarque("");
                    
                            
                         
                    
                            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                           
                               (
                                 enregistrerRef(url)
                              
                                  )
                                 .catch((error) => {
                                  alert(error.message);
                                  setLoader(false);
                                 });
                                 setNumero("");
                                 setMission("");
                                 setQualite("");
                                 setDate("");
                                 setControleur("");
                                 setPv("");
                                 setCommite("");
                                 setDecision("");
                                 setRemarque("");
                                })})}
                    
                                const enregistrerRef = async(url) => {
                                 
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
                    
                                      setNumero("");
                                    setMission("");
                                    setQualite("");
                                    setDate("");
                                    setControleur("");
                                    setPv("");
                                    setCommite("");
                                    setDecision("");
                                    setRemarque("");
                                    
                                   
                              
                                      getDownloadURL(uploadImage.snapshot.ref).then((url1) => {
                                       const nycRef=doc(db,type,numero,"control",mission)
                                          setDoc(nycRef,{
                                            mission: mission,
                                            date: date,
                                            controleur: controleur,
                                            qualite: qualite,
                                            commite: url,
                                            remarque: remarque,
                                            decision: decision,
                                            pv: url1,
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
                     
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

  

    












                                          const navigate = useNavigate();
  return (
    <div>
         <Header />
         <Footer2 />
        
    <br/><br/>
    <form >
    <h1 id = "titre">Controle et evaluation des données</h1>
         <br/>
    <div className="container">
    <Form  onSubmit={ajouter}>
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
    <select className=" col-sm-10" aria-label="Default select example"  required value={type} onChange={(e) => setType(e.target.value)}>
       
       <option ></option>
       <option value="Marche">Marché </option>
       <option value="Bon de Commande">Bon de Commande</option>
     </select>
     <br/> <br/>
     <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° </label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" required value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>



    <div className="table-responsive">
<table className="table">

<thead>
<tr>
<th scope="col">Missions</th>
<th scope="col">Dates</th>
<th scope="col">Controleurs</th>
<th scope="col">Qualité</th>
<th scope="col">Liste des Commités</th>
<th scope="col">Principales remarques</th>
<th scope="col">Décisions</th>
<th scope="col">PV</th>

</tr>
</thead>
<tbody>
<tr>
<td><input type="txt"  id="inputEmail4" required value={mission} onChange={(e) => setMission(e.target.value)}/></td>
<td><input type="date" value={date} onChange={(e) => setDate(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={controleur} onChange={(e) => setControleur(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4" value={qualite} onChange={(e) => setQualite(e.target.value)}/></td>
<td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setCommite(e.target.files[0])}/></td>
<td><input type="txt"  id="inputEmail4" value={remarque} onChange={(e) => setRemarque(e.target.value)}/></td>
<td><input type="txt"  id="inputEmail4"value={decision} onChange={(e) => setDecision(e.target.value)}/></td>
<td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"  onChange={(e) => setType(e.target.file[0])}/></td>


</tr>
</tbody>

</table> 

          
</div>  
<br />
<button className="btn btn-primary suivant" type="submit" onClick={ajouter}>Ajouter</button> 
</Form>

</div>
</form>
<br /><br /><br /><br />
</div>

   
  )
}
