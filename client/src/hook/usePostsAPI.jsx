import { useState, useContext, createContext } from "react";
import axios from "axios";

const PostContext = createContext();

function PostProvider({ children }) {
  const addMenu = async (data) => {
    try {
      await axios.post("http://localhost:4000/admin/addmenu", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  return (
    <PostContext.Provider value={{ addMenu }}>{children}</PostContext.Provider>
  );
}

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
