import React from 'react';
import './App.css';
import FirstPage from './Component/FirstPage.js';
import SuiviSupervision from './Component/buttons/SuiviSupervision'


import Identification from './Component/Identification.js'

import PageOn from './Component/PageOn'

import {BrowserRouter , Route,Routes} from 'react-router-dom';
import Marche from'./Component/saisiDonnees/Marche.js';
import Fichier from'./Component/saisiDonnees/fichier';
import BonCommande from'./Component/saisiDonnees/BonCommande.js';
import MarcheEtude from'./Component/SuiviSupervision/MarcheEtude.js';
import Decomptes from'./Component/SuiviSupervision/Decomptes';
import MarcheTravaux from'./Component/SuiviSupervision/MarcheTravauxServices.js';
import MarcheFourniture from'./Component/SuiviSupervision/MarcheFourniture.js';

import Output from './Component/outPut/Output.js'
import Etude from './Component/outPut/Etude.js'
import Travaux from './Component/outPut/Travaux'
import OutputBC from './Component/outPut/OutputBC.js'
import ModifierBC from './Component/outPut/ModifierBC'
import ModifierMarche from './Component/outPut/ModifierMarche'
import ModifierDecompte from './Component/outPut/ModifierDecompte'
import ModifierControl from './Component/outPut/ModifierControl'
import ModifierFichier from './Component/outPut/ModifierFichier'
import ModifierSuivi from './Component/outPut/ModifierSuivi'
import ModifierBonLivraison from './Component/outPut/ModifierBonLivraison'
import DepenseParType from './Component/outPut/DepenseParType.js'
import DepenseParChapitre from './Component/outPut/DepenseParChapitre'
import DepenseParRubrique from './Component/outPut/DepenseParRubrique'
import DepenseBonCommande from './Component/outPut/DepenseBonCommande'
import ListMarche from './Component/outPut/ListMarche.js'
import Directeur from './Component/acceuil/directeur'
import Service from './Component/acceuil/service'
import Manager from './Component/acceuil/manager'
import Division from './Component/acceuil/division'
import Depenses from './Component/buttons/depenses'
import SaisieDonnees from './Component/buttons/SaisieDonnees'
import Control from './Component/controlEvaluation/Control.js'
 

function App() {
 
  return (
 
    <div className="App">
      
    <BrowserRouter>
    
    
          <Routes>
            <Route  path="/"  element={<PageOn/>} exact />
            <Route  path="/Identification"  element={<Identification/>} exact />
           
            <Route  path="/Etude"  element={<Etude />} exact />
            <Route  path="/Travaux"  element={<Travaux />} exact />
            <Route  path="/Manager"  element={<Manager />} exact />
         
         
            <Route  path="/SaisieDonnees"  element={<SaisieDonnees/>} exact />
            <Route  path="/Aceuil"  element={<FirstPage/>} exact />
            <Route  path="/AcceuilDirecteur"  element={<Directeur/>} exact />
            <Route  path="/AcceuilService"  element={<Service/>} exact />
            <Route  path="/AcceuilDivision"  element={<Division/>} exact />
            <Route  path="/Marche"  element={<Marche/>} exact />
            <Route  path="/Fichier"  element={<Fichier/>} exact />
            <Route  path="/BonCommande"  element={<BonCommande/>} exact />
            <Route  path="/MarcheEtude"  element={<MarcheEtude/>} exact />
            <Route  path="/MarcheTravaux"  element={<MarcheTravaux/>} exact />
            <Route  path="/MarcheFourniture"  element={<MarcheFourniture/>} exact />
            <Route  path="/Control"  element={<Control/>} exact />
         
          <Route  path="/OutputBC"  element={<OutputBC/>} exact />
          <Route  path="/ModifierBC"  element={<ModifierBC/>} exact />
          <Route  path="/ModifierMarche"  element={<ModifierMarche/>} exact />
          <Route  path="/ModifierDecompte"  element={<ModifierDecompte/>} exact />
          <Route  path="/ModifierControl"  element={<ModifierControl/>} exact />
          <Route  path="/ModifierFichier"  element={<ModifierFichier/>} exact />
          <Route  path="/ModifierSuivi"  element={<ModifierSuivi/>} exact />
          <Route  path="/ModifierBonLivraison"  element={<ModifierBonLivraison/>} exact />
          <Route  path="/Output"  element={<Output/>} exact />
          <Route  path="/Decomptes"  element={<Decomptes/>} exact />
          <Route  path="/Depenses"  element={<Depenses/>} exact />
          <Route  path="/ListMarche"  element={<ListMarche/>} exact />
         
          <Route  path="/DepenseParType"  element={<DepenseParType/>} exact />
          <Route  path="/DepenseParRubrique"  element={<DepenseParRubrique/>} exact />
          <Route  path="/DepenseParChapitre"  element={<DepenseParChapitre/>} exact />
          <Route  path="/DepenseBonCommande"  element={<DepenseBonCommande/>} exact />
          <Route  path="/SuiviSupervision"  element={<SuiviSupervision/>} exact />
          </Routes>
    
    </BrowserRouter>
   
      
    
   


    </div>
   
   
  ); 
}

export default App;
