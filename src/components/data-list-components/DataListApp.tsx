import DataList from "./DataList";

const fetchUsers = async () => {
   return new Promise<{ name: string; email: string; bio: string }[]>((resolve) =>
      setTimeout(() => {
         resolve([
            { name: 'John Doe', email: 'john.doe@example.com', bio: 'Web developer' },
            { name: 'Jane Smith', email: 'jane.smith@example.com', bio: 'Designer' },
         ]);
      }, 3000)
   );
};

const DataListApp = () => {
   return (
      <DataList
         fetchData={fetchUsers}
         renderItem={(user) => (
            <>
               <h3>{user.name}</h3>
               <p>{user.email}</p>
               <p>{user.bio}</p>
            </>
         )}
      />
   );
};
export default DataListApp;