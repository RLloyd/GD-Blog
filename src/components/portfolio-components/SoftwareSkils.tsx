/*-= src/components/portfolio-components/SoftwareSkils.tsx =-*/
/*--------------------------------------------------------------------------=|

|=----------------------------------------------------------------------------*/
import Image from "next/image";
import Link from "next/link";

const softwareLogos = [
//   { logo: "/assets/images/softwares/react.png",       label: "React", url: "https://reactjs.org" },
//   { logo: "/assets/images/softwares/Angular.png",     label: "Angular", url: "https://angular.io" },
//   { logo: "/assets/images/softwares/Wavemaker.png",   label: "Wavemaker", url: "https://www.wavemaker.com/" },
//   { logo: "/assets/images/softwares/HTML.png",        label: "HTML", url: "https://www.w3.org/TR/2011/WD-html5-20110405/" },
//   { logo: "/assets/images/softwares/CSS.png",         label: "CSS", url: "https://www.w3.org/Style/CSS/Overview.en.html" },
//   { logo: "/assets/images/softwares/Less.png",        label: "Less", url: "https://lesscss.org/" },
//   { logo: "/assets/images/softwares/Sassl.png",       label: "Sass", url: "https://sass-lang.com/" },
//   { logo: "/assets/images/softwares/Chakra.png",      label: "Chakra UI", url: "https://chakra-ui.com/" },
//   { logo: "/assets/images/softwares/Tailwind.png",    label: "Tailwind", url: "https://tailwindcss.com/" },
//   { logo: "/assets/images/softwares/Bootstrap.png",   label: "Bootstrap", url: "https://getbootstrap.com/" },
//   { logo: "/assets/images/softwares/TypeScript.png",  label: "TypeScript", url: "https://www.typescriptlang.org/" },
//   { logo: "/assets/images/softwares/JavaScript.png",  label: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
//   { logo: "/assets/images/softwares/JSON.png",        label: "JSON", url: "https://www.json.org/json-en.html" },
//   { logo: "/assets/images/softwares/NodeJS.png",      label: "NodeJS", url: "https://nodejs.org/en" },
//   { logo: "/assets/images/softwares/Figma.png",       label: "Figma", url: "https://www.figma.com/" },
//   { logo: "/assets/images/softwares/Firebase.png",    label: "Firebase", url: "https://firebase.google.com/" },
//   { logo: "/assets/images/softwares/VSCode.png",      label: "VSCode", url: "https://code.visualstudio.com/" },
//   { logo: "/assets/images/softwares/GIT.png",         label: "GIT", url: "https://github.com/" },

  { logo: "/assets/images/softwares/react.png",          label: "React", url:"https://react.com" },
  { logo: "/assets/images/softwares/Angular.png",        label: "Angular", url:"https://angular.io" },
  { logo: "/assets/images/softwares/Wavemaker.png",      label: "Wavemaker", url:"https://www.wavemaker.com/" },
  { logo: "/assets/images/softwares/HTML.png",           label: "HTML", url:"https://www.w3.org/TR/2011/WD-html5-20110405/" },
  { logo: "/assets/images/softwares/CSS.png",            label: "CSS", url:"https://www.w3.org/Style/CSS/Overview.en.html" },
  { logo: "/assets/images/softwares/LESS.png",           label: "Less", url:"https://lesscss.org/" },
  { logo: "/assets/images/softwares/SCSS.png",           label: "Sass", url:"https://sass-lang.com/" },
  { logo: "/assets/images/softwares/Chakra.png",         label: "Chakra UI", url:"https://v2.chakra-ui.com/" },
  { logo: "/assets/images/softwares/Tailwind.png",       label: "Tailwind", url:"https://tailwindcss.com/" },
  { logo: "/assets/images/softwares/Bootstrap.png",      label: "Bootstrap", url:"https://getbootstrap.com/" },
  { logo: "/assets/images/softwares/TypeScript.png",     label: "TypeScript", url:"https://www.typescriptlang.org/" },
  { logo: "/assets/images/softwares/JavaScript.png",     label: "JavaScript", url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { logo: "/assets/images/softwares/JSON.png",           label: "JSON", url:"https://www.json.org/json-en.html" },
  { logo: "/assets/images/softwares/NodeJS.png",         label: "NodeJS", url:"https://nodejs.org/en" },
  { logo: "/assets/images/softwares/Figma.png",          label: "Figma", url:"https://www.figma.com/" },
  { logo: "/assets/images/softwares/Firebase.png",       label: "Firebase", url:"https://firebase.google.com/" },
  { logo: "/assets/images/softwares/VSCode.png",         label: "VSCode", url:"https://code.visualstudio.com/" },
  { logo: "/assets/images/softwares/GIT.png",            label: "GIT", url:"https://github.com/" },
  { logo: "/assets/images/softwares/Photoshop.png",      label: "Photoshop", url:"https://www.adobe.com/products/photoshop.html" },
  { logo: "/assets/images/softwares/Illustrator.png",    label: "Illustrator", url:"https://www.adobe.com/products/illustrator.html" },
  { logo: "/assets/images/softwares/Affinity-Designer.png",       label: "Designer", url:"https://affinity.serif.com/en-us/designer/" },
  { logo: "/assets/images/softwares/Affinity-Photo.png",          label: "Photo", url:"https://affinity.serif.com/en-us/photo/" },
  { logo: "/assets/images/softwares/GSAP.png",           label: "GSAP", url:"https://gsap.com/" },
  { logo: "/assets/images/softwares/framer-motion.png",   label: "Motion", url:"https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjwnei0BhB-EiwAA2xuBtDeC0PypIBbjN6lz46xIoG2KgNcr5a65dk8L58TdAADVEYxbmcAGRoCOwcQAvD_BwE" },
  { logo: "/assets/images/softwares/Cinema-4D.png",       label: "Cinema4D", url:"https://www.maxon.net/en/cinema-4d" },
  { logo: "/assets/images/softwares/Blender.png",        label: "Blender", url:"https://www.blender.org/" },
  { logo: "/assets/images/softwares/DaVinci.png",        label: "DaVinci", url:"https://www.blackmagicdesign.com/products/davinciresolve" },
  { logo: "/assets/images/softwares/Jira.png",           label: "Jira", url:"https://www.atlassian.com/" },
  { logo: "/assets/images/softwares/MSOffice.png",       label: "MSOffice", url:"https://www.office.com/" },


  { logo: "/assets/images/softwares/GIT.png",         label: "Claude", url: "https://github.com/" },
  { logo: "/assets/images/softwares/GIT.png",         label: "ChatGPT", url: "https://github.com/" },
  { logo: "/assets/images/softwares/GIT.png",         label: "Gemini", url: "https://github.com/" },
  { logo: "/assets/images/softwares/Ellipses.png",    label: "and more...", url:"/" },
];

const SoftwareSkills = () => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Software Skills
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {softwareLogos.map((logo, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={logo.url} target="_blank">
              <div className="w-16 h-16 relative">
                <Image
                  src={logo.logo}
                  alt={logo.label}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{logo.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftwareSkills;