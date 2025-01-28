import React from "react"
import { Link } from 'react-router-dom'

const Footer = (props) =>{
    return(
        <section id="footer">
          <div>
            <p><Link to="/rgpd">Politique de confidentialité (RGPD)</Link></p>
        </div>
      <div className="contact">
        <h3>Contact</h3>
        <p>Téléphone : 05 02 04 25 69</p>
        <p>Email : <a href="mailto:axel@yahoo.com">axel@yahoo.com</a></p>
      </div>
                <div>

                    <span className="italic">@ 2025 Axel Wouters</span>
                    <p className="bold">Merci</p>
                </div>
            
        </section>
    )

}

export default Footer