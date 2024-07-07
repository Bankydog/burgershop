import { useState, useContext, createContext } from "react";
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
      const response = await axios.get("http://localhost:4000/admin/", {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching menu by keyword:", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ addMenu, getMenu, getMenuByKeyword }}>
      {children}
    </PostContext.Provider>
  );
}

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
