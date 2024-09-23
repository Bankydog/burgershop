import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { usePost } from "../hook/usePostsAPI.jsx";
import AdminRiderCard from "../components/cards/AdminRiderCard.jsx";

export default function RiderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState("ordered,cooking");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { putCookingTime, putCookedTime, cancelOrder } = usePost();

  return (
    <div>
      <AdminNavbar />
      rider
    </div>
  );
}
