import React,{useRef} from 'react'
import Header from '../headers/Header.js';
import Footer2 from '../footer/Footer2.js';
import { db } from '.././firebase';
import  '../buttons/Button.css';
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
import Item from 'antd/lib/list/Item';

export default function DepenseParRubrique() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    const [numero, setNumero] = useState([])
    const [nmarche, setNmarche] = useState([])
    const [marches, setMarche] = useState([])
    const [ligne, setLigne] = useState([])
    const [montantM, setMontantM] = useState([])
    const [montantB, setMontantB] = useState([])
    const [ident,setIdent] = useState([])
    const [decompte, setDecompte] = useState([])
    const [virements, setVirements] = useState([])
    


    function add () {
      var marcheCollectionRef = query(collection(db, "Marche"),where("ligne", "==", numero))
     


    
      onSnapshot(marcheCollectionRef, snapshot => {
          var sum1 = 0;
      
          snapshot.docs.map(doc => {
               var getMontantM = doc.data().montant;
               var pMontantM = parseFloat(getMontantM);
               sum1 += pMontantM;
               setMontantM(sum1);

               
          
        }
        )
      })
      var marcheCollectionRef1 = query(collection(db, "Bon de Commande"),where("ligne", "==", numero))
     


    
      onSnapshot(marcheCollectionRef1, snapshot => {
          var sum2 = 0;
      
          snapshot.docs.map(doc => {
               var getMontantB = doc.data().montant;
               var pMontantB = parseFloat(getMontantB);
               sum2 += pMontantB;
               setMontantB(sum2);

               
          
        }
        )
      })
      var marcheCollectionRef2 =query(collectionGroup(db,"decompte"),where("ligne", "==", numero)) 
      onSnapshot(marcheCollectionRef2, snapshot => {
     
        var sum2 = 0;
     
        snapshot.docs.map(doc => {
       
  
             var getDecompte = doc.data().decompte;
             var pDecompte = parseInt(getDecompte);
             sum2 += pDecompte;
             setDecompte(sum2);
  
       
        
      }
      )
    })
    onSnapshot(marcheCollectionRef2, snapshot => {
          
      var sum3 = 0;
   
      snapshot.docs.map(doc => {
     

           var getVirements = doc.data().virements;
           var pVirements = parseFloat(getVirements);
           sum3 += pVirements;
           setVirements(sum3);

     
      
    }
    )
  })

  }






  return (
    <div ref={componentRef}>
 <Header />
 <Footer2  />
<br/><br/>
<h1 id = "titre">Dépenses Par Ligne</h1>
<br/>
<div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Ligne</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="marche" value={numero} onChange={(e) => setNumero(e.target.value)}/>
    </div>
    </div>

<button className="btnn btn--medium" onClick={add}>Afficher</button>
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


<td><label>{montantM+montantB}</label></td>
<td><label>{decompte}</label></td>
<td><label>{virements}</label></td>
<td><label>{virements/(montantM+montantB)}</label></td>
<td><label>{virements/decompte}</label></td>
</tr>
</tbody>

</table>
<button onClick={handlePrint} className="btnn btn--medium">  Print </button>
    </div>
  )
}
