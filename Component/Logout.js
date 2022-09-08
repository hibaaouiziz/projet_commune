import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import logeout from './Identification'
import { getAuth, signOut } from "firebase/auth";
import {  auth,logout } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/Identification");
    
  }, [user, loading]);

const navigate = useNavigate();
  return (
    <div>
                <section className="logout">
            <nav>
                <button onClick={logout}>deconnexion</button>
            </nav>
        </section>

    </div>
  )
}














