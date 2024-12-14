import React from 'react';
import LazyLoadComponent from './LazyLoadComponent';

const LazyLoadComponentApp = () => {
   return (
      <div>
         <h1>Lazy Load Example</h1>
         <p>Scroll down to lazy-load the component:</p>
         {/* <div style={{ height: '100vh' }}></div> Spacer to demonstrate scrolling */}
         <LazyLoadComponent
            importComponent={() => import('./../blog-components/articles/PercentageSVG2')} // Dynamic import
            fallback={<p>Loading MyComponent...</p>} // Optional loading indicator
         />
         {/* <div style={{ height: '100vh' }}></div> Spacer */}
      </div>
   );
};

export default LazyLoadComponentApp;