"use client";

import React, { useState, useEffect } from "react";
import app from "./_utils/firebase.js";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
  const [gundamArray, setGundamArray] = useState([]);
  const [searchID, setSearchID] = useState(""); // State for the user-specified ID
  const [filteredGundam, setFilteredGundam] = useState(null); // State for filtered data

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setGundamArray(Object.values(snapshot.val()));
      } else {
        alert("Error fetching data");
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Filter data based on the user-specified ID
  const filterByID = () => {
    const result = gundamArray.find((gundam) => gundam.ID === searchID);
    if (result) {
      setFilteredGundam(result);
    } else {
      alert(`No entry found with ID: ${searchID}`);
      setFilteredGundam(null);
    }
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
        <button onClick={filterByID}> Search by ID </button>
      </div>

      {/* Display filtered data if an ID is specified */}
      {filteredGundam ? (
        <div>
          <h2>Result for ID: {searchID}</h2>
          <div>
            <p>ID: {filteredGundam.ID}</p>
            {/* Debugging - Log the image URL */}
            <p>Image URL: {filteredGundam.image}</p>
            <img
              src={`https://images.weserv.nl/?url=${encodeURIComponent(filteredGundam.image)}`}
              alt={filteredGundam.title}
              style={{ width: "200px", height: "auto" }}
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.src =
                  "https://via.placeholder.com/200x200?text=Image+Not+Found"; // Fallback image
              }}
            />
            <p>Title: {filteredGundam.title}</p>
            <p>Price: {filteredGundam.price}</p>
            <p>Release Date: {filteredGundam.release_date}</p>
            <p>Series: {filteredGundam.series}</p>
          </div>
        </div>
      ) : null}

      {/* Display all data if no filter is applied */}
      <ul>
        {gundamArray.map((gundam, index) => (
          <li key={index}>
            <p>ID: {gundam.ID}</p>
            {/* Debugging - Log the image URL */}
            <p>Image URL: {gundam.image}</p>
            <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(gundam.image)}`}
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
  );
}

export default Read;
