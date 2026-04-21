import { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./api/fetching";

type User = {
  id: number;
  firstName: string;
  gender: string;
  age: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);

  // GET users
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data.users);
    });
  }, []);

  // ADD USER
  const handleAddUser = () => {
    const newUser = {
      firstName: name,
      age: Number(age),
      gender: gender
    };
//<----since it is a fake api,can't able to add more than 1 user------->
    addUser(newUser).then((data) => {
      setUsers(prev => [...prev, data]);

      setName("");
      setAge("");
      setGender("");
    });
  };
//   addUser(newUser).then((data) => {
//   const uniqueUser = {
//     ...data,
//     id: Date.now() // ensures unique id
//   };

//   setUsers(prev => [...prev, uniqueUser]);
// });

  // EDIT CLICK
  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    setName(user.firstName);
    setAge(String(user.age));
    setGender(user.gender);
  };

  // UPDATE USER
  const handleUpdateUser = () => {
    if (!editUserId) return;

    const updatedData = {
      firstName: name,
      age: Number(age),
      gender: gender
    };

    updateUser(editUserId, updatedData).then((data) => {
      setUsers(prev =>
        prev.map(user =>
          user.id === editUserId ? { ...user, ...data } : user
        )
      );

      setEditUserId(null);
      setName("");
      setAge("");
      setGender("");
    });
  };

  // DELETE USER
  const handleDelete = (id: number) => {
    deleteUser(id).then(() => {
      setUsers(prev => prev.filter(user => user.id !== id));
    });
  };

  return (
    <>
      <h1>User Details</h1>

      {/* FORM */}
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <button onClick={editUserId ? handleUpdateUser : handleAddUser}>
          {editUserId ? "Update User" : "Add User"}
        </button>
      </div>

      <hr />

      {/* USERS LIST */}
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.firstName} - {user.gender} - {user.age}
          </p>

          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;