import { useEffect, useState } from "react";
import { user } from "./api/example";

type Customer = {
  customerName: string;
  age: number;
};

function App2() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Fetch data
  useEffect(() => {
    user()
      .then((res) => setData(res || []))
      .catch(() => setError("Failed to fetch customers"))
      .finally(() => setLoading(false));
  }, []);

  // Add new customer
  const handleAdd = () => {
    if (!name || !age) return;

    const newCustomer: Customer = {
      customerName: name,
      age: Number(age),
    };

    setData((prev) => [...prev, newCustomer]);
    setName("");
    setAge("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">CUSTOMER MANAGEMENT</h1>

        {/* Add Customer */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 rounded w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded w-24"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Customer List */}
        {!loading && data.length === 0 && (
          <p>No customers found</p>
        )}

        <div className="space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-3 border rounded flex justify-between"
            >
              <span>{item.customerName}</span>
              <span>{item.age}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App2;