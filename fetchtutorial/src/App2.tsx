import { useEffect } from "react";
import { user } from "./api/example";

function App2() {

  useEffect(() => {
    user();
  }, []);
 
  return <>
  App
  </>;
}

export default App2