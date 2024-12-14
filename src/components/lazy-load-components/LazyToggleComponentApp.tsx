import React from 'react';
import LazyToggleComponent from './LazyToggleComponent';

const LazyToggleComponentApp = () => {
   return (
      <div>
         <h1>Lazy Loading with Visibility Reset</h1>
         <p>Scroll down to load and unmount the component:</p>
         {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> Spacer */}
         <LazyToggleComponent
            importComponent={() => import('./../blog-components/articles/PercentageSVG2')} // Dynamic import
            fallback={<p>Loading DynamicComponent...</p>}
         />
         {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> Spacer */}
      </div>
   );
};

export default LazyToggleComponentApp;