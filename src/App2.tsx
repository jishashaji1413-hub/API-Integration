import { useEffect, useState } from "react";
import { user } from "./api/example";

type User = {
  firstName: string;
  age: number;
};

function App2() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    user().then((res: User[]) => {
      setData(res || []);
    });
  }, []);

  return (
    <>
      <h2>Customer List</h2>
      {data.map((item, index) => (
        <div key={index}>
          {item.firstName} - {item.age}
        </div>
      ))}
    </>
  );
}

export default App2;