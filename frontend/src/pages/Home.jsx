import React from 'react';
import hardcoreGallery from "../assets/image/galerie1.jpg";
import hardcoreGallery1 from "../assets/image/galerie2.jpg";
import hardcoreGallery2 from "../assets/image/galerie3.jpg";
import hardcoreGallery3 from "../assets/image/galerie4.jpg";
import hardcoreGallery4 from "../assets/image/galerie5.jpg";
import hardcoreGallery5 from "../assets/image/galerie6.jpg";
import hardcoreGallery6 from "../assets/image/galerie7.jpg";
import hardcoreGallery7 from "../assets/image/galerie8.jpg";
import hardcoreGallery8 from "../assets/image/galerie9.jpg";
import hardcoreGallery9 from "../assets/image/galerie10.jpg";
import hardcoreGallery10 from "../assets/image/galerie11.jpg";
import hardcoreGallery11 from "../assets/image/galerie12.jpg";
import hardcoreGallery12 from "../assets/image/galerie13.jpg";
import hardcoreGallery13 from "../assets/image/galerie14.jpg";
import hardcoreGallery14 from "../assets/image/galerie15.jpg";
import hardcoreGallery15 from "../assets/image/galerie16.jpg";
import hardcoreGallery16 from "../assets/image/galerie17.jpg";

//On crée un tableau avec toutes les informations sur nos images
const galleryImages = [
  { src: hardcoreGallery, alt: "Graffiti art" },
  { src: hardcoreGallery1, alt: "Colorful stairs" },
  { src: hardcoreGallery2, alt: "Dark figure" },
  { src: hardcoreGallery3, alt: "Comic speech bubble" },
  { src: hardcoreGallery4, alt: "Abstract face art" },
  { src: hardcoreGallery5, alt: "Colorful faces" },
  { src: hardcoreGallery6, alt: "Graffiti character" },
  { src: hardcoreGallery7, alt: "Abstract art" },
  { src: hardcoreGallery8, alt: "Graffiti building" },
  { src: hardcoreGallery9, alt: "Yellow silhouette" },
  { src: hardcoreGallery10, alt: "Colorful building" },
  { src: hardcoreGallery11, alt: "Abstract graffiti" },
  { src: hardcoreGallery12, alt: "Street art face" },
  { src: hardcoreGallery13, alt: "Graffiti text" },
  { src: hardcoreGallery14, alt: "Abstract portrait" },
  { src: hardcoreGallery15, alt: "Dual face art" },
  { src: hardcoreGallery16, alt: "Faded graffiti" },
];

//On va créer un composant pour afficher notre galerie d'images
const CollageGallery = () => (
  <div className="collage-gallery">
    {/* On parcourt chaque image de notre tableau*/}
    {galleryImages.map((img, index) => (
      //Pour chaque image, on crée une div avec une image dedans
      <div key={index} className="gallery-item">
        <img src={img.src} alt={img.alt} />
      </div>
    ))}
  </div>
);

//On créer notre composant principal appelé Home
const Home = () => {
  return (
    //On utilise la balise main pour notre contenu principal de la page
    <main id="bienvenue">
      <section>
        <h2>Hardcore Gallery</h2>
        {/*On affiche notre galerie d'images ici */}
        <CollageGallery />
      </section>
    </main>
  );
};

export default Home;