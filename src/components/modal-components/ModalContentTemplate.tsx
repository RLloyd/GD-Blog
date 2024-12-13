import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  subtitle?: string; // Optional prop
  imageUrl: string;
  altText: string;
}

const ModalContentTemplate: React.FC<Props> = ({ title, subtitle, imageUrl, altText }) => {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'left' }}>

      <h1>{title}</h1>
      {subtitle && <h4 style={{ color: '#666' }}>{subtitle}</h4>}
      {altText && <p style={{ color: '#666' }}>{altText}</p>}

      <Image
         src={imageUrl}
         alt={altText}
         width={600}
         height={200}
         style={{ borderRadius: '8px' }}
         />
    </div>
  );
};

export default ModalContentTemplate;