"use client";

import React, { useState, useEffect } from "react";
import app from "../_utils/firebase.js";
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

  // Filter and add a specific Gundam based on the user-specified ID
  const addToSearchResults = () => {
    const result = gundamArray.find((gundam) => gundam.ID === searchID);
    if (result) {
      // Add to the search results only if it's not already in the list
      if (!searchedGundams.some((gundam) => gundam.ID === searchID)) {
        setSearchedGundams([...searchedGundams, result]);
      } else {
        alert(`Entry with ID ${searchID} is already in the search results.`);
      }
    } else {
      alert(`No entry found with ID: ${searchID}`);
    }
    setSearchID(""); // Clear the input field
  };

  // Clear the search results
  const clearSearchResults = () => {
    setSearchedGundams([]);
  };

  return (
    <div>
      <h1>Gundam Database</h1>

      {/* Input to specify ID */}
      <div>
        <input
          type="text"
          placeholder="Enter ID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />
        <button onClick={addToSearchResults}>Add to Search</button>
        <button onClick={clearSearchResults}>Clear Search</button>
      </div>
      <div>
        <button onClick={() => setShowAll(true)}>Display All</button>
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
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button to show all data */}


      {/* Display all data if "Display All" button is clicked */}
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

      {/* Loading message if data is not yet fetched */}
      {!dataLoaded && <p>Loading data, please wait...</p>}
    </div>
  );
}

export default Read;
