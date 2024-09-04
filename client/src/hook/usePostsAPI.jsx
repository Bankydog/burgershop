import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const PostContext = createContext();

function PostProvider({ children }) {
  const [state, setState] = useState({
    dataProfile: [],
  });

  ////////////////// add menu //////////////////
  const addMenu = async (data) => {
    try {
      await axios.post("http://localhost:4000/admin/addmenu", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error adding menu:", error);
      throw error;
    }
  };

  ////////////////// get all menu //////////////////

  const getMenu = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/");
      console.log(response.data.data);
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

  ////////////////// get profile //////////////////
  const getProfile = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/profile/${id}`
      );
      // console.log("Profile fetched successfully:", response.data);
      setState((prevState) => ({
        ...prevState,
        dataProfile: response.data || [],
      }));
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      setState((prevState) => ({ ...prevState, dataProfile: [] }));
    }
  };

  ////////////////// user get data from carts&cart_items by ID //////////////////
  const getPurchaseOrder = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/carts/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Purchase Order:", error);
      return { error: "Failed to fetch purchase order data" };
    }
  };

  ////////////////// post profile //////////////////
  const postProfile = async (data, id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/profile/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Profile created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  };

  ////////////////// put profile //////////////////
  const putProfile = async (data, id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/posts/profile/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Profile updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating profile:", error);
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

  ////////////////// post cart items //////////////////
  const postCartItems = async (id, cartData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/carts/${id}`,
        cartData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting cart items:", error);
      throw error;
    }
  };

  ////////////////// admin get ordered //////////////////
  const getOrdered = async (page, states) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/cooking?page=${page}&states=${states}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching ordered data:", error.message);
      throw error;
    }
  };

  ////////////////// has data profile? //////////////////
  const hasDataProfile = state.dataProfile.length !== 0;
  // console.log("yes", hasDataProfile);

  return (
    <PostContext.Provider
      value={{
        addMenu,
        getMenu,
        getMenuByKeyword,
        getProfile,
        postProfile,
        putProfile,
        deleteMenu,
        postCartItems,
        getPurchaseOrder,
        hasDataProfile,
        getOrdered,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

const usePost = () => useContext(PostContext);

export { PostProvider, usePost };
