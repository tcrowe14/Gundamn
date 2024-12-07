"use client";

import React, { useState } from 'react'
import app from './_utils/firebase.js'
import { getDatabase, ref, get } from "firebase/database";

function Read() {

  const [gundamArray, setGundamArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db);
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
        setGundamArray(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  }

  return (
    <div>
      <h1>READ</h1>
      <button onClick={fetchData}> Display Data </button>
      <ul>
        {gundamArray.map( (index) => (
          <li key={index}> 
            {index.ID}: {index.image} : {index.link} : {index.title} : {index.price} : {index.release_date} : {index.series}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Read
