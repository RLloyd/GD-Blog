/*-= src/app/portfolio/web-development/page.tsx =-*/
 import Image from 'next/image';
 import Link from 'next/link';

 const projects = [
   {
     title: 'Project 1',
     description: 'Modern web application built with Next.js and TypeScript',
     image: '/assets/projects/web1.webp',
     link: '#'
   },
   // Add more projects
 ];
 export default function WebDevelopmentPage() {
   return (
     <main className="min-h-screen bg-black text-white">
       <div className="relative h-[50vh] mb-16">
         <Image
           src="/assets/images/first.webp"
           alt="Web Development"
           fill
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
           <h1 className="text-6xl font-garamond mb-4">Web Development</h1>
           <p className="text-xl max-w-2xl text-center font-nunitosans">
             Creating modern, responsive web applications with cutting-edge technologies.
           </p>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {projects.map((project, index) => (
             <Link href={project.link} key={index} className="group">
               <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                 <Image
                   src={project.image}
                   alt={project.title}
                   fill
                   className="object-cover transition-transform duration-300 group-hover:scale-105"
                 />
               </div>
               <h3 className="text-xl font-garamond mb-2">{project.title}</h3>
               <p className="text-gray-400 font-nunitosans">{project.description}</p>
             </Link>
           ))}
         </div>
       </div>
     </main>
   )
 }