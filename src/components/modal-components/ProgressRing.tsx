import React from 'react'
import Image from 'next/image'
import ModalContentTemplate from "./ModalContentTemplate"

const ProgressRing = () => {
  return (
   <ModalContentTemplate
      title="Creating the circular SVG"
      subtitle="Using Figma or other vector based apps"
      imageUrl="/assets/Screenshot-CircularLoader-SaveSVG.png" //re-save as webp
      altText="Select the illustration, right click on it, Copy/Paste as, Copy as SVG"
   />

  )
}

export default ProgressRing