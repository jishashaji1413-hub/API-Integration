import { useEffect, useState } from "react";
import { user } from "./api/example";

type User = {
  customerName: string;
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
    <br />
    <h1> SECOND API FOR PRACTICE</h1>
      <h2>Customer List</h2>
      {data.map((item, index) => (
        <div key={index}>
          {item.customerName} - {item.age}
        </div>
      ))}
    </>
  );
}

export default App2;