// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\Gallery\Gallery.jsx
import React from 'react';
import DomeGallery from '../DomeGallery/DomeGallery.jsx';

// Import your images
import emImage from '../../assets/resources/em.jpg';
import wewImage from '../../assets/resources/wew.jpg';
import portrImage from '../../assets/resources/portr.png';

// Create an array with all your images
const galleryImages = [
  { src: emImage, alt: 'Beautiful memory 1' },
  { src: wewImage, alt: 'Beautiful memory 2' },
  { src: portrImage, alt: 'Birthday portrait' },
  { src: emImage, alt: 'Beautiful memory 3' },
  { src: wewImage, alt: 'Beautiful memory 4' },
  { src: portrImage, alt: 'Birthday memory' },
  { src: emImage, alt: 'Beautiful memory 5' },
  { src: wewImage, alt: 'Beautiful memory 6' },
  { src: portrImage, alt: 'Special moment' },
  { src: emImage, alt: 'Beautiful memory 7' },
  { src: wewImage, alt: 'Beautiful memory 8' },
  { src: portrImage, alt: 'Celebration' },
  // Add more images as needed - you can repeat them
];

const Gallery = () => {
  return (
    <div style={{ width: '100%', height: '130vh', position: 'relative', background: 'transparent' }}>
      <DomeGallery 
        images={galleryImages}
        fit={0.5}
        minRadius={1500}    
        maxRadius={800}
        dragSensitivity={20}
        imageBorderRadius="20px"
        openedImageBorderRadius="30px"
        grayscale={false}
        openedImageWidth="400px"
        openedImageHeight="500px"
        overlayBlurColor="transparent"
      />
    </div>
  );
};

export default Gallery;