"use client";

import React, { useState, useEffect } from "react";
import app from "../_utils/firebase.js";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
  const [gundamArray, setGundamArray] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [searchedGundams, setSearchedGundams] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setGundamArray(Object.values(snapshot.val()));
        setDataLoaded(true);
      } else {
        alert("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const formatID = (id) => {
    return id.padStart(3, "0");
  };

  const addToSearchResults = () => {
    const formattedID = formatID(searchID);
    const result = gundamArray.find((gundam) => gundam.ID === formattedID);
    if (result) {
      if (!searchedGundams.some((gundam) => gundam.ID === formattedID)) {
        setSearchedGundams([...searchedGundams, result]);
      } else {
        alert(`Entry with ID ${formattedID} is already in the search results.`);
      }
    } else {
      alert(`No entry found with ID: ${formattedID}`);
    }
    setSearchID("");
  };

  const goToWiki = (link) => {
    window.open(link, "_blank");
  };

  const clearSearchResults = () => {
    setSearchedGundams([]);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center">
    <h1 className="text-center text-3xl font-bold py-5 text-slate-700">Gundamn! Database</h1>
    <p className="text-center text-sm text-slate-700">Search for your favorite MG Gundam models!</p>
    <p className="text-center text-sm text-slate-700">Add a model to the search results by entering the Release# below.</p>
    <p className="text-center text-sm text-slate-700">Or click on Display All to show all models! click Hide All to hide those models after.</p>
    <p className="text-center text-sm text-slate-700">Click on a model to view more details on the Gundam Wikia.</p>
    <div className="p-3 m-3 flex flex-col items-center">
        <input
        className="w-48 pl-2 border border-black m-0 align-middle h-10 active:border-indigo-500 focus:border-indigo-500 focus:outline-none"
        type="text"
        placeholder="Enter ID#"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
        />
        <button
        className="w-48 m-3 bg-indigo-500 hover:bg-indigo-700 hover:scale-110 text-white font-bold py-2 px-4 rounded hover:shadow-xl transition-transform duration-300"
        onClick={addToSearchResults}
        >
        Add to Search
        </button>
        <button
        className="w-48 mb-3 mx-3 bg-indigo-500 hover:bg-indigo-700 hover:scale-110 o text-white font-bold py-2 px-4 rounded hover:shadow-xl transition-transform duration-300"
        onClick={clearSearchResults}
        >
        Clear Search
        </button>
        <button
        className="w-48 mx-3 h-10 bg-indigo-500 hover:bg-indigo-700 hover:scale-110 text-white font-bold py-2 px-4 rounded hover:shadow-xl transition-transform duration-300"
        onClick={toggleShowAll}
        >
        {showAll ? "Hide All" : "Display All"}
        </button>
        {!dataLoaded && <p className="py-3 text-center text-xl font-semibold">Loading...</p>}
    </div>

      {searchedGundams.length > 0 && (
        <div className="w-auto">
          <h2 className="text-center text-2xl font-bold">Searched Results</h2>
          <ul className="flex flex-row m-10 flex-wrap gap-5 justify-center">
            {searchedGundams.map((gundam) => (
              <li
                className="w-64 h-auto bg-slate-600 text-white flex flex-col items-center justify-between rounded shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300 "
                key={gundam.ID}
                onClick={() => goToWiki(gundam.link)}
              >
                <p className="text-lg font-bold text-center pt-3">{gundam.title}</p>
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(
                    gundam.image
                  )}`}
                  alt={gundam.title}
                  className="w-auto px-3 h-60  rounded"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=Image+Not+Found";
                  }}
                />
                <div className="text-center text-sm mt-2">
                  <p className="font-medium">#{gundam.ID}</p>
                  <p>Price: {gundam.price}</p>
                  <p>Release Date: {gundam.release_date}</p>
                  <p className="pb-3">Series: {gundam.series}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAll && (
        <div className="w-auto">
          <h2 className="text-center text-2xl font-bold">All Gundam Models</h2>
          <ul className="flex flex-row m-10 flex-wrap gap-5 justify-center">
            {gundamArray.map((gundam, index) => (
              <li
                className="w-64 h-auto bg-slate-600 text-white p-4 flex flex-col items-center justify-between rounded shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                key={index}
                onClick={() => goToWiki(gundam.link)}
              >
                <p className="text-lg font-bold text-center">{gundam.title}</p>
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(
                    gundam.image
                  )}`}
                  alt={gundam.title}
                  className="w-auto h-56 object-contain mt-2"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=Image+Not+Found";
                  }}
                />
                <div className="text-center text-sm mt-2">
                  <p className="font-medium">#{gundam.ID}</p>
                  <p>Price: {gundam.price}</p>
                  <p>Release Date: {gundam.release_date}</p>
                  <p>Series: {gundam.series}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    

    </div>
  );
}

export default Read;
