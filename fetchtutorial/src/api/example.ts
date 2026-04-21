
export const user = () => {
  return fetch("http://192.168.1.154:8080/customers")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched successfully", data);
      return data;
    })
    .catch(error => {
      console.log("Error in fetching", error);
    });
};
