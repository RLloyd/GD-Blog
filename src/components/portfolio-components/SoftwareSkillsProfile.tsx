import SoftwareSkills from "./SoftwareSkils";

// src/components/portfolio-components/VideoShowcase.tsx
export default function SoftwareSkillsProfile({ category }: { category?: string }) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 text-center">
         <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
               {category === 'sound' ? 'Profile' :
                  category === 'motion' ? 'Motion Graphics 1' :
                     'Video Project 1'}
            </h3>
            <p className="text-gray-400">
               {category === 'sound' ? 'Description of sound project 1' :
                  category === 'motion' ? 'Description of motion graphics project 1' :
                     'Description of video project 1'}
            </p>
         </div>
         {/* Add more project cards following the same pattern */}
         <div className="bg-gray-800 p-6 rounded-lg">
            {/* <h3 className="text-xl font-bold mb-4">
               {category === 'sound' ? 'Software Skills' :
                  category === 'motion' ? 'Motion Graphics 1' :
                     'Video Project 1'}
            </h3>
            <p className="text-gray-400">
               {category === 'sound' ? 'Description of sound project 1' :
                  category === 'motion' ? 'Description of motion graphics project 1' :
                     'Description of video project 1'}
            </p> */}
            <SoftwareSkills />
         </div>
      </div>
   );
}