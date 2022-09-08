import React from 'react'
import './Footer.css';
import {Link} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
export default function Footer2() {


    const navigate = useNavigate();
  return (
    <div>
  
        <footer id="footer2">
     
<button onClick={() => navigate(-1)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
</svg>
</button >
        </footer>
       
    </div>
  )
}
