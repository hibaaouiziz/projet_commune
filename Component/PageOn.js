import React from 'react'
import Header from './headers/Header.js';
import { useNavigate} from "react-router-dom";
import Footer from './footer/Footer.js';
import  {  useEffect } from "react";
export default function PageOn() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
          navigate('/Identification')
        }, 5000)
      }, [])
  return (
 
    <div>
 <Header />
 <Footer />
 <br /><br /><br /><br />
 <section class = "section1" />
 <h1 id = "titre">Suivi, supervision, control et evaluation de l'exécution des dépenses</h1>
 <h1 id = "titre">Ville de Marrakech</h1>
    </div>
  )
}
