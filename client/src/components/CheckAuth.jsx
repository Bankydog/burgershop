import axios from "axios";
import { useEffect, useState } from "react";
import Admin from "../adminPages/Admin";
import User from "../pages/User";

export default function CheckAuth() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkRole = async () => {
    try {
      const result = await axios.get("http://localhost:4000/posts/check");
      setRole(result.data.role);
    } catch (error) {
      console.error("Failed to check role:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkRole();
  }, []); // Ensure the dependency array is empty to run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === "admin") {
    return <Admin />;
  }

  if (role === "user") {
    return <User />;
  }

  return <div>Unauthorized</div>;
}
