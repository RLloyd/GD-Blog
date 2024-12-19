// src/components/portfolio-components/WebDevShowcase.tsx
export default function WebDevShowcase() {
   return (
      <div className="
         grid grid-cols-1
         md:grid-cols-2
         lg:grid-cols-2
         gap-8">
         <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Project 1</h3>
            <p className="text-gray-400">Description of project 1</p>
         </div>
         <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Project 2</h3>
            <p className="text-gray-400">Description of project 2</p>
         </div>
      </div>
   );
}