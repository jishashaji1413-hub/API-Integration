

// // fetching using axios library
// import axios from "axios";

// export const fetch = () => {
//   const URL = "https://dummyjson.com/users";

//   return axios.get(URL)
//     .then(res => {
//       console.log("Fetched successfully with axios ", res.data);
//       return res.data;
//     })
//     .catch(error => {
//       console.log("Error in fetching", error);
//     });
// };
   // TYPES
export type NewUser = {
  firstName: string;
  age: number;
  gender: string;
};

// GET USERS
export const fetchUsers = () => {
  return fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched successfully", data);
      return data;
    })
    .catch(error => {
      console.log("Error in fetching", error);
    });
};

// POST USER
export const addUser = (newUser: NewUser) => {
  return fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(data => {
      console.log("User added:", data);
      return data;
    })
    .catch(error => {
      console.log("Error adding user", error);
    });
};

// UPDATE USER (PUT)
export const updateUser = (id: number, updatedUser: Partial<NewUser>) => {
  return fetch(`https://dummyjson.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedUser)
  })
    .then(res => res.json())
    .then(data => {
      console.log("User updated:", data);
      return data;
    })
    .catch(error => {
      console.log("Error updating user", error);
    });
};

// DELETE USER
export const deleteUser = (id: number) => {
  return fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      console.log("User deleted:", data);
      return data;
    })
    .catch(error => {
      console.log("Error deleting user", error);
    });
};
