// src/components/portfolio-components/UIDesignGallery.tsx
export default function UIDesignGallery() {
   return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <div className="bg-gray-800 p-6 rounded-lg">
         <h3 className="text-xl font-bold mb-4">UI Project 1</h3>
         <p className="text-gray-400">Description of UI project 1</p>
       </div>
       <div className="bg-gray-800 p-6 rounded-lg">
         <h3 className="text-xl font-bold mb-4">UI Project 2</h3>
         <p className="text-gray-400">Description of UI project 2</p>
       </div>
       <div className="bg-gray-800 p-6 rounded-lg">
         <h3 className="text-xl font-bold mb-4">UI Project 3</h3>
         <p className="text-gray-400">Description of UI project 3</p>
       </div>
     </div>
   );
 }