import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function usePosts() {
  const usePost = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
  };

  //////////////////////// check user || admin ////////////////////////

  const getRole = async (postId) => {
    try {
      const result = await axios.get(`http://localhost:4000/posts/${postId}`);
      const role = result.data.role;
      const isAdmin = Boolean(role);
      return isAdmin;
    } catch (error) {
      console.error("Error fetching role:", error);
      return false;
    }
  };

  //   const getPosts = async (input) => {
  //     const { status, keywords, page } = input;
  //     try {
  //       const params = new URLSearchParams();
  //       params.append("status", status);
  //       params.append("keywords", keywords);
  //       params.append("page", page);
  //       const results = await axios.get(
  //         `http://localhost:4000/posts?${params.toString()}`
  //       );
  //       setPosts(results.data.data);
  //       setTotalPages(results.data.total_pages);
  //     } catch (error) {
  //       error;
  //     }
  //   };

  return { getRole };
}
export default usePosts;
