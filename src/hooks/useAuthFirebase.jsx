import { useContext } from "react";
import { AuthContextProvider } from "../context/AuthContext";

const useAuthFirebase = () => {
  return useContext(AuthContextProvider);
};

export default useAuthFirebase;
