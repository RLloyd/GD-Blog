"use client";
import React, { useState } from 'react';
import MultiStepModal from './MultiStepModal';

const steps = [
   {
      title: 'Step 1: Create an SVG',
      subtitle: 'Using Figma or any vector-based tools',
      description: 'Select and right click, copy an illustration as SVG from Figma or another tool.',
      isCode: false,
      imageUrl: '/assets/Screenshot-CircularLoader-SaveSVG.png',
      altText: 'SVG creation screenshot',
   },
   {
      title: 'Step 2: Add Code',
      subtitle: 'On your IDE',
      description: 'Paste the copied SVG code into your component',
      isCode: true,
      code: `
      <svg width="3082" height="3082" viewBox="0 0 3082 3082" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2464.25 2774.81C2786.8 2533.45 3002.01 2175.37 3063.78 1777.28C3125.55 1379.18 3028.97 972.724 2794.72 644.968C2560.47 317.211 2207.19 94.2194 1810.54 23.7553C1413.89 -46.7088 1005.41 40.9585 672.611 267.979C339.808 495 109.14 843.322 30.0153 1238.33C-49.1098 1633.35 29.6001 2043.64 249.286 2381.33C468.971 2719.02 812.163 2957.25 1205.35 3045C1598.54 3132.75 2010.45 3063.03 2352.87 2850.79L2064.99 2386.35C1843.99 2523.33 1578.14 2568.33 1324.37 2511.69C1070.6 2455.06 849.106 2301.3 707.32 2083.35C565.533 1865.41 514.733 1600.6 565.801 1345.66C616.869 1090.71 765.743 865.905 980.536 719.385C1195.33 572.864 1458.96 516.283 1714.96 561.761C1970.96 607.239 2198.97 751.159 2350.16 962.695C2501.34 1174.23 2563.68 1436.56 2523.81 1693.49C2483.94 1950.43 2345.05 2181.53 2136.87 2337.31L2464.25 2774.81Z" fill="#3C493D"/>
         <path d="M106.965 1774.99C154.874 2068.61 291.756 2340.44 499.115 2553.76C706.475 2767.08 974.318 2911.61 1266.46 2967.83L1329.8 2638.64C1105.06 2595.4 899.008 2484.21 739.488 2320.11C579.968 2156 474.667 1946.88 437.811 1721.01L106.965 1774.99Z" fill="#BE2809"/>
         <path d="M2847.83 2267.11C2949.11 2084.83 3011.13 1883.38 3029.92 1675.7C3048.71 1468.02 3023.84 1258.71 2956.92 1061.21C2890 863.712 2782.5 682.4 2641.33 528.923C2500.16 375.446 2328.45 253.199 2137.22 170.036C1946 86.8727 1739.49 44.6341 1530.97 46.0337C1322.44 47.4333 1116.52 92.4402 926.428 178.163C736.335 263.885 566.278 388.426 427.184 543.785C288.089 699.143 183.034 881.882 118.768 1080.26L446.891 1186.56C496.33 1033.95 577.148 893.368 684.152 773.852C791.156 654.336 921.979 558.528 1068.22 492.582C1214.45 426.637 1372.87 392.013 1533.28 390.937C1693.69 389.86 1852.56 422.354 1999.67 486.33C2146.78 550.307 2278.87 644.351 2387.47 762.419C2496.07 880.488 2578.77 1019.97 2630.25 1171.9C2681.74 1323.83 2700.86 1484.86 2686.41 1644.62C2671.96 1804.39 2624.24 1959.36 2546.33 2099.59L2847.83 2267.11Z" fill="#FF8000"/>
         <path d="M2443.14 2607.8C2662.4 2422.36 2819.18 2173.82 2892.15 1896.03C2965.12 1618.23 2950.72 1324.69 2850.91 1055.38C2751.1 786.072 2570.74 554.081 2334.39 391.005C2098.03 227.93 1817.18 141.695 1530.07 144.047L1531.69 342.385C1778.04 340.367 2019.02 414.358 2221.81 554.28C2424.61 694.203 2579.37 893.256 2665 1124.33C2750.64 1355.4 2762.99 1607.27 2700.39 1845.62C2637.78 2083.97 2503.25 2297.23 2315.13 2456.34L2443.14 2607.8Z" fill="#0E9DBA"/>
         <circle cx="1541" cy="1523" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100"/>
         <path d="M301.123 899.502C186.139 1121.74 133.002 1370.8 147.272 1620.61C161.542 1870.43 242.695 2111.82 382.238 2319.52C521.781 2527.22 714.585 2693.59 940.471 2801.23C1166.36 2908.87 1417.02 2953.82 1666.24 2931.37L1643.64 2680.55C1439.39 2698.95 1233.94 2662.11 1048.8 2573.89C863.667 2485.67 705.645 2349.3 591.276 2179.07C476.906 2008.84 410.392 1811 398.697 1606.25C387.001 1401.5 430.552 1197.37 524.793 1015.23L301.123 899.502Z" fill="#88A751"/>
         <path d="M1935.7 142.637C1719.73 81.6756 1492.57 71.5699 1272.03 113.112C1051.49 154.654 843.578 246.715 664.584 382.076L786.248 542.958C940.394 426.387 1119.45 347.107 1309.37 311.331C1499.29 275.556 1694.92 284.259 1880.91 336.758L1935.7 142.637Z" fill="#F1D5AE"/>
         <path d="M546.095 482.051C407.032 612.703 295.065 769.467 216.586 943.392C138.107 1117.32 94.653 1305 88.7059 1495.71L423.764 1506.16C428.339 1359.44 461.767 1215.06 522.141 1081.27C582.514 947.467 668.649 826.87 775.629 726.36L546.095 482.051Z" fill="#D8FE93"/>
         <path d="M2123.2 2724.55C2351.06 2612.47 2541.72 2436.99 2672.28 2219.2C2802.85 2001.41 2867.77 1750.56 2859.26 1496.77L2625.11 1504.62C2632.12 1713.33 2578.73 1919.63 2471.35 2098.74C2363.97 2277.85 2207.18 2422.16 2019.79 2514.34L2123.2 2724.55Z" fill="#E45C04"/>
         <path d="M606.559 503.872C466.976 629.634 354.216 782.277 275.034 952.658C195.852 1123.04 151.877 1307.65 145.744 1495.43L359.248 1502.4C364.443 1343.36 401.688 1187 468.754 1042.69C535.82 898.378 631.325 769.092 749.548 662.574L606.559 503.872Z" fill="#184D5D"/>
         <path d="M2676.89 1286.74C2620.31 1033.96 2481.03 807.278 2281.09 642.579C2081.16 477.88 1832 384.577 1573.06 377.442L1570.04 487.216C1804.54 493.677 2030.2 578.178 2211.27 727.339C2392.34 876.5 2518.48 1081.8 2569.73 1310.73L2676.89 1286.74Z" fill="#32DCFE"/>
         <path d="M384.541 1408.72C366.746 1564.29 380.522 1721.85 425.044 1871.97C469.567 2022.09 543.92 2161.68 643.654 2282.39C743.388 2403.11 866.452 2502.46 1005.48 2574.5C1144.51 2646.54 1296.64 2689.78 1452.77 2701.65L1461.1 2592.15C1319.69 2581.4 1181.91 2542.24 1056 2476.99C930.091 2411.75 818.637 2321.77 728.312 2212.45C637.988 2103.12 570.649 1976.7 530.327 1840.74C490.005 1704.78 477.529 1562.09 493.645 1421.2L384.541 1408.72Z" fill="#D8FE93"/>
         <path d="M2218.76 2591.31C2013.72 2723.62 1774.44 2793.02 1530.43 2790.96L1531.37 2679.21C1753.57 2681.09 1971.46 2617.89 2158.16 2497.41L2218.76 2591.31Z" fill="#F7D3B9"/>
         <path d="M391.874 1923.14C460.675 2130.03 584.054 2314.51 748.989 2457.1L805.507 2391.73C652.342 2259.31 537.768 2088 473.877 1895.87L391.874 1923.14Z" fill="#0E9DBA"/>
      </svg>
    `,
      language: 'typescript',
   },
   {
      title: 'Step 3: Adding animation',
      subtitle: 'Using framer-motion',
      description: 'Add the motion component from Framer Motion as shown in the example below. Apply it to each path, assigning unique rotation and transition values to create a more dynamic and engaging effect. You can use the sample code from ImageLoaderSVG.tsx as a reference for this step.',
      isCode: true,
      code: `
      import { motion } from 'framer-motion';

      const CircularSVG2 = () => {
      return (
         <svg width="3082" height="3082" viewBox="0 0 3082 3082" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
               // starting setting
               initial={{ rotate: 0 }}
               // what to animate
               animate={{ rotate: 360 }}
               // animation settings
               transition={{ duration: 4, ease: "linear", repeat: Infinity }}
               // center of origin
               style={{ originX: "50%", originY: "50%" }}
               // SVG path: pasted from the previous example
               d="M2464.25 2774.81C2786.8 2533.45 3002.01 2175.37 3063.78 1777.28C3125.55 1379.18 3028.97 972.724 2794.72 644.968C2560.47 317.211 2207.19 94.2194 1810.54 23.7553C1413.89 -46.7088 1005.41 40.9585 672.611 267.979C339.808 495 109.14 843.322 30.0153 1238.33C-49.1098 1633.35 29.6001 2043.64 249.286 2381.33C468.971 2719.02 812.163 2957.25 1205.35 3045C1598.54 3132.75 2010.45 3063.03 2352.87 2850.79L2064.99 2386.35C1843.99 2523.33 1578.14 2568.33 1324.37 2511.69C1070.6 2455.06 849.106 2301.3 707.32 2083.35C565.533 1865.41 514.733 1600.6 565.801 1345.66C616.869 1090.71 765.743 865.905 980.536 719.385C1195.33 572.864 1458.96 516.283 1714.96 561.761C1970.96 607.239 2198.97 751.159 2350.16 962.695C2501.34 1174.23 2563.68 1436.56 2523.81 1693.49C2483.94 1950.43 2345.05 2181.53 2136.87 2337.31L2464.25 2774.81Z" fill="#3C493D"/>
            // the rest of the code...
         </svg>
      `,
      language: 'typescript',
   },
];

const CircularLoaderModalApp: React.FC = () => {
   const [showModal, setShowModal] = useState(false);

   return (
      <div>
         <p className='mb-1'>How to create...</p>
         <button
            onClick={() => setShowModal(true)}
            className='py-2 px-4 bg-accent-500 text-white rounded hover:bg-accent-600'
            // style={{
            //    padding: '1rem 2rem',
            //    backgroundColor: '#0070f3',
            //    color: '#fff',
            //    border: 'none',
            //    borderRadius: '4px',
            //    cursor: 'pointer',
            // }}
         >
            Circular SVG Animation
         </button>
         {showModal && <MultiStepModal steps={steps} onClose={() => setShowModal(false)} />}
      </div>
   );
};

export default CircularLoaderModalApp;

// "use client";
// import React, { useState } from 'react';
// import LoaderModal, { LoaderDetails } from './LoaderModal';
// // import LoaderModal from './LoaderModal';

// const loaderDetails = [
//   {
//     title: 'Creating the circular SVG',
//     subtitle: 'Using Figma or other vector-based apps',
//     description: 'Select the illustration, right-click on it, Copy/Paste as, Copy as SVG',
//     isCode: false,
//     imageUrl: '/assets/Screenshot-CircularLoader-SaveSVG.png',
//     altText: 'Circular SVG creation screenshot',
//   },
//   {
//     title: 'Code Example',
//     subtitle: 'Spinner logic in TypeScript',
//     description: 'Here’s the code for your spinner component.',
//     isCode: true,
//     code: `// Example spinner code
// const Spinner = () => <div className="spinner" />;`,
//     language: 'typescript',
//   },
// ];

// const CircularLoaderModalApp: React.FC = () => {
//   const [modalDetail, setModalDetail] = useState<LoaderDetails | null>(null);

//   return (
//     <div>
//       <h1>Loader Details</h1>
//       {loaderDetails.map((detail, index) => (
//         <button
//           key={index}
//           onClick={() => setModalDetail(detail)}
//           style={{
//             margin: '0.5rem',
//             padding: '1rem',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           {detail.title}
//         </button>
//       ))}
//       {modalDetail && <LoaderModal loaderDetail={modalDetail} onClose={() => setModalDetail(null)} />}
//     </div>
//   );
// };

// export default CircularLoaderModalApp;

// // import { useState } from 'react';
// // import LoaderModal, { LoaderDetails } from './LoaderModal';
// // import Spinner from './Spinner';
// // import ProgressRing from './ProgressRing';

// // const CircularLoaderModalApp = () => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const loaderDetails: LoaderDetails[] = [
// //     {
// //       title: "Creating the circular SVG",
// //       subtitle: "Using Figma or other vector based apps",
// //       description: "Select the illustration, right click on it, Copy/Paste as, Copy as SVG",
// //       isCode: false,
// //       code: `// Your spinner code`,
// //       language: "typescript",
// //       // preview: ,
// //       imageUrl: "/assets/Screenshot-CircularLoader-SaveSVG.png", //re-save as webp
// //       altText: "string"
// //     },
// //     {
// //       title: "Creating the circular SVG",
// //       subtitle: "Continuation of creating the circular SVG",
// //       description: "In your IDE, paste the SVG code into your component.",
// //       isCode: true,
// //       code: `// Your progress ring code`,
// //       language: "typescript",
// //       // preview: <ProgressRing />,
// //       // imageUrl: "/assets/Screenshot-CircularLoader-SaveSVG.png", //re-save as webp
// //       altText: "string"
// //     }
// //   ];

// //   return (
// //     <>
// //       <button
// //         onClick={() => setIsModalOpen(true)}
// //         className="px-4 py-2 bg-accent-600 text-accent-50 rounded"
// //       >
// //         How the circles are made
// //       </button>

// //       <LoaderModal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         loaderDetails={loaderDetails}
// //       />
// //     </>
// //   );
// // };

// // export default CircularLoaderModalApp;