import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import  '../buttons/Button.css';
import { db } from '.././firebase';
import { useReactToPrint } from "react-to-print";
import  { useState, useEffect } from "react";
import {  query, where } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import {
    collection,
    collectionGroup,
    onSnapshot,
    getDocs,
    doc,
    addDoc,
    deleteDoc,
    orderBy
  } from "firebase/firestore"


 function DepenseBonCommande() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    const [montantG, setMontantG] = useState([])
    const [decompte, setDecompte] = useState([])
    const [virements, setVirements] = useState([])
    const [type, setType] = useState("");

    function add () {
        var marcheCollectionRef = query(collection(db, "Bon de Commande"))
       
       setMontantG([])
       setDecompte([])
       setVirements([])

      
        onSnapshot(marcheCollectionRef, snapshot => {
            var sum1 = 0;
        
            snapshot.docs.map(doc => {
                 var getMontant = doc.data().montant;
                 var pMontant = parseInt(getMontant);
                 sum1 += pMontant;
                 setMontantG(sum1);

                 
            
          }
          )
        })
        var marcheCollectionRef1 =query(collectionGroup(db,"decompte"),where("type", "==", "Bon de Commande")) 
        onSnapshot(marcheCollectionRef1, snapshot => {
          
          var sum2 = 0;
       
          snapshot.docs.map(doc => {
         
    
               var getVirements = doc.data().virements;
               var pVirements = parseInt(getVirements);
               sum2 += pVirements;
               setVirements(sum2);
    
         
          
        }
        )
      })

      
      onSnapshot(marcheCollectionRef1, snapshot => {
        
        var sum3 = 0;
     
        snapshot.docs.map(doc => {
       
  
             var getDecompte = doc.data().decompte;
             var pDecompte = parseInt(getDecompte);
             sum3 += pDecompte;
             setDecompte(sum3);
  
       
        
      }
      )
    })
    }


      

    return (
    <div ref={componentRef}>
            <Header />
            <Footer2  />
<br/><br/>
<h1 id = "titre">Dépenses Bon de Commande</h1>
<br/>
<label htmlFor="inputEmail4" className="form-label">Type </label>
<label htmlFor="inputEmail4" className="form-label">Bon de Commande</label>
 
<br />
<div className="col-md-12">
<button className="btnn btn--medium" onClick={add}>Afficher</button>
</div>
<br />
<table className="table">

<thead>
<tr>

<th scope="col">Montant global</th>
<th scope="col">decompte</th>
<th scope="col">virements</th>
<th scope="col">% virements/Montant global</th>
<th scope="col">% virements/decompte</th>
</tr>
</thead>

<tbody>
<tr>

<td><label>{montantG}</label></td>
<td><label>{decompte}</label></td>
<td><label>{virements}</label></td>
<td><label>{virements/montantG}</label></td>
<td><label>{virements/decompte}</label></td>
</tr>
</tbody>
 
</table>
<button onClick={handlePrint} className="btnn btn--medium">  Print </button>
    </div>

  )
}
export default DepenseBonCommande;
