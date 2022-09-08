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

export default function ModifierControl() {
  const location = useLocation()
  const { num2 } = location.state
  const { type2} = location.state
  const { typemarche} = location.state
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
                   const nycRef=doc(db,type2,num2,"control",mission)
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

    const [control, setControl] = useState([])
    const marcheCollectionRef2 =query(collection(db,type2,num2,"control"))
    useEffect(() => {
      
      onSnapshot(marcheCollectionRef2, snapshot => {
          setControl(snapshot.docs.map(doc => {
            
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
      <div class="container mb-3 row">
    
 <label for="inputEmail4" class="form-label identification">Controle et evaluation</label><br />
<label for="inputEmail4" class="form-label identification">Controle</label> 
<table class="table">
<tr>


<th scope="col">mission</th>
<th scope="col">Controleur</th>
<th scope="col">Comité</th>
<th scope="col">Date</th>
<th scope="col">Principales remarques</th>
<th scope="col">Décisions</th>


</tr>
{ control.map((control, i) => (   
<tr>
<td>{control.mission}</td>
<td>{control.controleur}</td>
<td><a href={control.commite} target="_blank"> PDF!</a></td>
<td>{control.date}</td>
<td>{control.remarque}</td>
<td>{control.decision}</td>
</tr>
))}
</table>


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
<td><input type="txt"  id="inputEmail4" value={mission} onChange={(e) => setMission(e.target.value)}/></td>
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
<div className="col-3">
<button className="btn btn-primary suivant" type="submit" onClick={ajouter}>Enregister</button> 
    </div>
    <div className="col-6">
<Link to="/ModifierSuivi" className="btn btn-primary suivant" state={{  typemarche, num2}}>Suivant</Link>
</div>
    
    </div>
    <br /><br /><br /><br />
    </div>
  )
}
