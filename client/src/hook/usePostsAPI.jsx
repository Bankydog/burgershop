import { useContext, createContext } from "react";
import axios from "axios";

const PostContext = createContext();

function PostProvider({ children }) {
  ////////////////// add menu //////////////////
  const addMenu = async (data) => {
    try {
      await axios.post("http://localhost:4000/admin/addmenu", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  ////////////////// get all menu //////////////////

  const getMenu = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/");
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  };

  ////////////////// get menu by keyword //////////////////
  const getMenuByKeyword = async (keyword) => {
    try {
      const response = await axios.get("http://localhost:4000/admin/search", {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching menu by keyword:", error);
      throw error;
    }
  };

  ////////////////// delete menu //////////////////
  const deleteMenu = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting menu item:", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{ addMenu, getMenu, getMenuByKeyword, deleteMenu }}
    >
      {children}
    </PostContext.Provider>
  );
}

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
