import React, { useEffect, useState } from "react";
import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { usePost } from "../hook/usePostsAPI.jsx";

export default function StatisticsPage() {
  const [data, setData] = useState({});
  const { getStatistics } = usePost();
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: "",
  });
  const { year, month, day } = date;
  const [canSearch, setCanSearch] = useState(false);

  const fetchData = async () => {
    if (!year) {
      return;
    }
    try {
      const result = await getStatistics(year, month, day);
      setData(result);
    } catch (error) {
      console.error("Error fetching statistics:", error.message);
    }
  };

  useEffect(() => {
    if (year.length === 4) {
      setCanSearch(true);
    } else {
      setCanSearch(false);
    }
  }, [year]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center">
        <div
          className="w-[800px] flex flex-col md:h-[800px] h-[617px] md:justify-center items-center md:gap-16
          bg-blue-300 md:mt-10 border-solid md:rounded-xl md:border-8 md:border-sky-700 justify-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex gap-4">
              <div className="flex flex-col items-center ">
                <label htmlFor="year" className="">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="text-center border rounded"
                  placeholder="YYYY"
                  value={year}
                  onChange={handleDateChange}
                />
              </div>

              <div className="flex flex-col items-center">
                <label htmlFor="month" className="">
                  Month
                </label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  className="text-center border rounded"
                  placeholder="MM"
                  value={month}
                  onChange={handleDateChange}
                  min="1"
                  max="12"
                  disabled={!year}
                />
              </div>

              <div className="flex flex-col text-center">
                <label htmlFor="day" className="">
                  Day
                </label>
                <input
                  type="number"
                  id="day"
                  name="day"
                  className="text-center border rounded"
                  placeholder="DD"
                  value={day}
                  onChange={handleDateChange}
                  min="1"
                  max="31"
                  disabled={!year}
                />
              </div>
            </div>

            <button
              className={`mt-4 w-[100px] h-[50px] mb-3 bg-blue-500 text-white rounded ${
                !canSearch ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSearch}
              disabled={!canSearch}
            >
              Search
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-5xl">Total sales</h1>
            <div className="w-[300px] h-[80px] md:w-[600px] md:h-[80px] bg-white rounded-xl border-solid border-8 border-black">
              {data.newTotalSales}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-5 md:flex md:flex-row">
            <div className="flex flex-col items-center">
              <p className="text-5xl">Finishes</p>
              <div className="w-[300px] h-[80px] bg-white rounded-xl border-solid border-8 border-green-400">
                {data.finishesOrder}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-5xl">Cancels</p>
              <div className="w-[300px] h-[80px] bg-white rounded-xl border-solid border-8 border-rose-400">
                {data.cancelOrders}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
