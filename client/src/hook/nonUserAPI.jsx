import { useContext, createContext } from "react";
import axios from "axios";

const NonUserContext = createContext();

function NonUserProvider({ children }) {
  ////////////////// get menu by keyword //////////////////
  const getMenuByKeyword = async (keyword) => {
    try {
      const response = await axios.get("http://localhost:4000/search", {
        params: { keyword },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching menu by keyword:", error);
      throw error;
    }
  };
  return (
    <NonUserContext.Provider value={{ getMenuByKeyword }}>
      {children}
    </NonUserContext.Provider>
  );
}
const useNonUser = () => useContext(NonUserContext);
export { NonUserProvider, useNonUser };
