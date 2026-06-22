import React from 'react';
import DomeGallery from '../DomeGallery/DomeGallery.jsx';

// 1. Array containing all the specific filenames from your assets directory
const imageFilenames = [
    'c4.JPG', 'c5.JPG',
  'd1.JPG',
  'e1.JPG', 'e2.JPG', 'e4.JPG', 'e5.JPG', 'e6.JPG', 'e7.JPG', 'e8.JPG', 'e9.JPG',  
  'f.JPG', 'f1.JPG', 'f2.JPG', 'f3.JPG', 'f5.JPG', 'f6.JPG', 'f7.JPG', 'f8.JPG', 'f9.JPG',
  'g.JPG', 'g1.JPG', 'g2.JPG', 'g3.JPG', 'g4.JPG', 'g5.JPG',
  'h.JPG',
  'j.JPG',
  'k.JPG',
  'l.JPG',
  'o.JPG',
  'p.JPG',
  'portr.JPG',
  't.JPG',
  'u.JPG',
  'wew.JPG',
  'x.JPG'
];

// 2. Convert filenames into the required gallery format with dynamic imports
const galleryImages = imageFilenames.map((filename, index) => {
  return {
    // Relative path pointing to your assets/resources folder
    src: new URL(`../../assets/resources/${filename}`, import.meta.url).href,
    alt: `Beautiful memory ${index + 1}`
  };
});

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