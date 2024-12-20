import React from "react"


const Footer = (props) =>{
    return(
        <section id="footer">
            <div>
                <ul>
                    <li><a href="/contact"><p>Contact</p></a></li>
                    <li><a href="/"><p>Politique de confidentialité</p></a></li>
                    <li><a href="/"><p>Droit de rétractation du consomateur</p></a></li>
                    <li><a href="/"><p>Garantie légale de conformité</p></a></li>
                </ul>
                <div>

                    <span className="italic">@ 2024 Axel Wouters</span>
                    <p className="bold">Merci</p>
                </div>
            </div>
        </section>
    )

}

export default Footer