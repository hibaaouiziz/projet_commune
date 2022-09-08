import React ,{ useEffect} from 'react';
import Header from './headers/Header.js';
import { useAuthState } from "react-firebase-hooks/auth";


import './Identification.css';
import { useNavigate, Link} from "react-router-dom";

import { db, login} from './firebase';
import firebase from 'firebase/compat/app';
import {

  doc,
 getDoc,

} from "firebase/firestore"


import { state, useState } from "react";
import './firebase.js';
import {  auth,logout } from "./firebase";
import { 

  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,

} from "firebase/auth";

 function Identification() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      if (user) {
      addfunctions(user)
    }
    setEmail("");
    setPassword("");
    }, [user, loading]);

    async function addfunctions(user) {
        var userId= auth.currentUser.uid;
        console.log(userId)
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
       
          var path = docSnap.data().path;
          var Nom = docSnap.data().nom
         navigate(path,{state:{nom: Nom}})
    }
    
    return (
        <div >
        <Header />
        
        
       
       
        <section className = "section1" />
              <h1 id = "titre">Identification</h1>
              <br/>
              <div className = "div1">
                  <br />

                    <br/><br/><br/><br/>
                      <label className="label">Login </label>
                      <input type ="email" placeholder="" value = {email}  onChange={(e) => 
          setEmail(e.target.value)
        }/><br/><br/><br/>
                      <label className="label" >Mot de passe </label>
                      <input type="password" placeholder="" value = {password}   onChange={(e) => 
          setPassword(e.target.value)
        }/><br/><br/>
                      <input type = "submit" value="Se connecter" id="submit" onClick={() => login(email, password)} />
               </div>

         
    </div>
  )
        }
export default Identification;