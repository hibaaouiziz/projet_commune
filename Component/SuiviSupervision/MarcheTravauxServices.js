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

export default function MarcheTravaux(props) {
  const [progress, setProgress] = useState(0);
  const [numero, setNumero] = useState("");
  const [mission, setMission] = useState("");
  const [nvisit, setNvisit] = useState("");
  const [dvisit, setDvisit] = useState("");
  const [remarque, setRemarque] = useState("");
  const [decision, setDecision] = useState("");
  const [pv, setPv] = useState("");
  const [dordre, setDordre] = useState("");
  const [ordre, setOrdre] = useState("");
  const [dreunion, setDreunion] = useState("");
  const [rapport, setRapport] = useState("");
  const [dvalidation, setDvalidation] = useState("");
  const [rappvalid, setRappvalid] = useState("");
  const [loader, setLoader] = useState(false);

  const fonct = (e) =>{
    e.preventDefault();
    updateDoc(doc(db, "Marche", numero),{
      division: props.nom1, 
    },
    ajouterMission()
  
  )}

  const batch = writeBatch(db);
  const ajouterLigne = async(e) => {
   
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
        
        setNvisit("");
        setDvisit("");
        setRemarque("");
        setDecision("");
        setPv("");

     

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
         const nycRef=doc(db,"Marche",numero,"suivi",mission,"travauxservice",nvisit)
            setDoc(nycRef,{
              mission: mission,
              nvisit: nvisit,
              dvisit: dvisit,
              remarque: remarque,
              decision: decision,
              pv: url,

          
             })
             
             .then(()  => {
              //batch.commit();
              setLoader(false);
              alert("Your message has been submitted👍");
             })
             .catch((error) => {
              alert(error.message);
              setLoader(false);
             });

             setNvisit("");
             setDvisit("");
             setRemarque("");
             setDecision("");
             setPv("");
            })})}

            const ajouterMission = async() => {
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
                  setDordre("");
                  setOrdre("");
                  setDreunion("");
                  setRapport("");
                  setMission("");
                  setNvisit("");
                  setDvisit("");
                  setRemarque("");
                  setDecision("");
                  setDvalidation("");
                  setRappvalid("");
                  setPv("");
          
                  
               
          
                  getDownloadURL(uploadImage.snapshot.ref).then((url1) => {
                 
                     (
                       ajouterMissionRef(url1)
                    
                        )
                       .catch((error) => {
                        alert(error.message);
                        setLoader(false);
                       });
  
                      })})}
          
                      const ajouterMissionRef = async(url1) => {
                       
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
                            setDordre("");
                            setOrdre("");
                            setDreunion("");
                            setRapport("");
                            setMission("");
                            setNvisit("");
                            setDvisit("");
                            setRemarque("");
                            setDecision("");
                            setDvalidation("");
                            setRappvalid("");
                            setPv("");
                          
                         
                    
                            getDownloadURL(uploadImage.snapshot.ref).then((url2) => {
                            
                             (
                              ajouterMissionRef1(url1,url2)
                           
                               ).then(() => {
                                
                                setLoader(false);
                               
                               })
                                 .catch((error) => {
                                  alert(error.message);
                                  setLoader(false);
                                 });
                           
                                })})}
                                  const ajouterMissionRef1 = async(url1,url2) => {
                        
                                    const storageRef = ref(
                                      storage,
                                      `/images/${rappvalid.name}`
                                    );
                                    const uploadImage = uploadBytesResumable(storageRef, rappvalid);
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
                                        setDordre("");
                                        setOrdre("");
                                        setDreunion("");
                                        setRapport("");
                                        setMission("");
                                        setNvisit("");
                                        setDvisit("");
                                        setRemarque("");
                                        setDecision("");
                                        setDvalidation("");
                                        setRappvalid("");
                                        setPv("");
                                      
                                    
                                
                                        getDownloadURL(uploadImage.snapshot.ref).then((url3) => {
                                          const nycRef=doc(db,"Marche",numero,"suivi",mission)
                                          setDoc(nycRef,{
                                            dordre: dordre,
                                            ordre:url1,
                                            dreunion: dreunion,
                                            rapport:url2,
                                            division: props.nom1,
                                            dvalidation: dvalidation,
                                            rappvalid:url3,
                                           

                                          })
                          
                                        }).then(() => {
                                            
                                            ajouterLigne();
  
                                            setLoader(false);
                                         
                                          })
                                            .catch((error) => {
                                              alert(error.message);
                                              setLoader(false);
                                            });
                                            setDordre("");
                                            setOrdre("");
                                            setDreunion("");
                                            setRapport("");
                                            setMission("");
                                            setNvisit("");
                                            setDvisit("");
                                            setRemarque("");
                                            setDecision("");
                                            setDvalidation("");
                                            setRappvalid("");
                                            setPv("");
                                      
                                            })};


                                           
  return (


      
      
       <div className="container">
         <br /><br />
       <Form  onSubmit={fonct}>
            <fieldset>
            <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">N° du marché</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche"  required value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>
                
                <table border="3" id="tab" className="table table-bordered">
          
                    
                        <tr>
                        <th colSpan="2">Date d'ordre de service</th>
                        <td colSpan="3"><input type="date" value={dordre} onChange={(e) => setDordre(e.target.value)}/></td>  
                        </tr>
                        <tr>
                        <th colSpan="2">Ordre de service</th>
                        <td colSpan="3"><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setOrdre(e.target.files[0])}/></td>  
                        </tr>
                        <tr>
                        <th colSpan="2">Date de la réunion de cadrage</th>
                        <td colSpan="3"><input type="date" value={dreunion} onChange={(e) => setDreunion(e.target.value)}/></td>  
                        </tr>
                        <tr>
                        <th colSpan="2">Rapport de la réunion de cadrage</th>
                        <td colSpan="3"><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"  onChange={(e) => setRapport(e.target.files[0])}/></td>  
                        </tr>
                    <tr>
                        <th >Mission 1</th>
                        <th >N° de la visite/réunion</th>
                        <th>Date de la visite/réunion</th>
                        <th>Principales remarques</th>
                        <th>Décisions</th>
                        <th>PV de la visite/réunion</th>
                
                    </tr>
                    
                    
                    <tr>
                        <td align="center"><input type="text" required value={mission} onChange={(e) => setMission(e.target.value)}/></td>
                        <td align="center"><input type="text" required value={nvisit} onChange={(e) => setNvisit(e.target.value)}/></td>
                        <td align="center"><input type="date" value={dvisit} onChange={(e) => setDvisit(e.target.value)}/></td>
                        <td align="center"><textarea value={remarque} onChange={(e) => setRemarque(e.target.value)}></textarea></td>
                        <td align="center"><input type="text"value={decision} onChange={(e) => setDecision(e.target.value)}/></td>
                        <td><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"  onChange={(e) => setPv(e.target.files[0])}/></td>
                    </tr>
                    <tr>
                    <td  colSpan="5"align="center"><input align="center" type="submit"  onClick={ajouterLigne} value="+ ajouter"/></td>
                    </tr>
                    <tr>
                        <th colSpan="2">Date de la validation de la mission</th>
                        <td colSpan="3"><input type="date" value={dvalidation} onChange={(e) => setDvalidation(e.target.value)}/></td>  
                        </tr>
                        <tr>
                        <th colSpan="2">Rapport de la validation de la mission</th>
                        <td colSpan="3"><input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => setRappvalid(e.target.files[0])}/></td>  
                        </tr>
                    
                </table>
               
            </fieldset>
            <br/>
            
            <div className="col-12">
            <button className="btn btn-primary suivant" type="submit">Ajouter</button>
    <br/><br/><br/><br/>
  </div>
       
    </Form>
    </div>
  )
}
