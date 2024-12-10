"use client";

import React, { useState, useEffect } from "react";
import app from "./_utils/firebase.js";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
  const [gundamArray, setGundamArray] = useState([]); // Stores data from Firebase
  const [searchID, setSearchID] = useState(""); // User-specified ID
  const [searchedGundams, setSearchedGundams] = useState([]); // Stores multiple search results
  const [showAll, setShowAll] = useState(false); // Whether to show all data
  const [dataLoaded, setDataLoaded] = useState(false); // Tracks if data has been loaded from Firebase

  // Fetch data from Firebase on page load
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setGundamArray(Object.values(snapshot.val()));
        setDataLoaded(true); // Mark data as loaded
      } else {
        alert("Error fetching data");
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Format the ID to be 3 digits (e.g., 1 -> 001, 10 -> 010)
  const formatID = (id) => {
    return id.padStart(3, "0");
  };

  // Filter and add a specific Gundam based on the user-specified ID
  const addToSearchResults = () => {
    const formattedID = formatID(searchID);
    const result = gundamArray.find((gundam) => gundam.ID === formattedID);
    if (result) {
      // Add to the search results only if it's not already in the list
      if (!searchedGundams.some((gundam) => gundam.ID === formattedID)) {
        setSearchedGundams([...searchedGundams, result]);
      } else {
        alert(`Entry with ID ${formattedID} is already in the search results.`);
      }
    } else {
      alert(`No entry found with ID: ${formattedID}`);
    }
    setSearchID(""); // Clear the input field
  };


  // Remove an individual searched Gundam from the list
  const removeSearchedItem = (idToRemove) => {
    setSearchedGundams(searchedGundams.filter((gundam) => gundam.ID !== idToRemove));
  };

  // Clear the search results
  const clearSearchResults = () => {
    setSearchedGundams([]);
  };

  // Toggle the "Display All" list
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Gundam Database</h1>

      <div className="p-3 m-3 flex flex-row ">
        <div className=" flex flex-col">
            <input  
            className="border border-gray m-0 p-0 align-middle h-10"
            type="text"
            placeholder="Enter ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            />
            <button className ="m-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={addToSearchResults}>Add to Search</button>
            <button className ="m-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={clearSearchResults}>Clear Search</button> 
        </div>

        <button className ="m-3 h-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={toggleShowAll}>
          {showAll ? "Hide All" : "Display All"}
        </button>
      </div>

      {/* Display multiple search results */}
      {searchedGundams.length > 0 && (
        <div>
          <h2>Searched Results</h2>
          <ul>
            {searchedGundams.map((gundam) => (
              <li key={gundam.ID}>
                <p>ID: {gundam.ID}</p>
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(
                    gundam.image
                  )}`}
                  alt={gundam.title}
                  style={{ width: "200px", height: "auto" }}
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=Image+Not+Found"; // Fallback image
                  }}
                />
                <p>Title: {gundam.title}</p>
                <p>Price: {gundam.price}</p>
                <p>Release Date: {gundam.release_date}</p>
                <p>Series: {gundam.series}</p>
                <button onClick={() => removeSearchedItem(gundam.ID)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}



      {showAll && (
        <ul>
          <h2>All Gundam Models</h2>
          {gundamArray.map((gundam, index) => (
            <li key={index}>
              <p>ID: {gundam.ID}</p>
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(
                  gundam.image
                )}`}
                alt={gundam.title}
                style={{ width: "200px", height: "auto" }}
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.src =
                    "https://via.placeholder.com/200x200?text=Image+Not+Found"; // Fallback image
                }}
              />
              <p>Title: {gundam.title}</p>
              <p>Price: {gundam.price}</p>
              <p>Release Date: {gundam.release_date}</p>
              <p>Series: {gundam.series}</p>
            </li>
          ))}
        </ul>
      )}

      {!dataLoaded && <p>Loading data, please wait...</p>}
    </div>
  );
}

export default Read;
