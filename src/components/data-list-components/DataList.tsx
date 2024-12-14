import { useFetchData } from '@/hooks/useFetchData';
import React from 'react';


type DataListProps<T> = {
   fetchData: () => Promise<T[]>; // Function to fetch an array of data
   renderItem: (item: T) => React.ReactNode; // Function to render each data item
   onIntersect?: boolean;
};

const DataList = <T,>({ fetchData, renderItem, onIntersect = true }: DataListProps<T>) => {
   const { data, loading, ref } = useFetchData({
      fetchData,
      onIntersect,
   });

   return (
      <div ref={ref}>
         {loading && <p>Loading...</p>}
         {data && data.length > 0 ? (
            <ul>
               {data.map((item, index) => (
                  <li key={index}>{renderItem(item)}</li>
               ))}
            </ul>
         ) : (
            !loading && <p>No data available.</p>
         )}
      </div>
   );
};

export default DataList;