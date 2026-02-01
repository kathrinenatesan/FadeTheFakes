import { useState } from 'react'
import React from "react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const[followers, setFollowers] = React.useState([])
  const[following, setFollowing] = React.useState([])
  const[fakes, setFakes] = React.useState([])

  function handleFileUpload(e, type) {
    const file = e.target.files[0];
    // nothing if no file uploaded
    if (!file) 
      return;

    // how to read and savethe json file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // saves the data read in the JSON file as a JSON object
        const data = JSON.parse(reader.result)
        const text = reader.result
        console.log(text)
        console.log(data)

        if (type === "followers") {
          const followerUsernames = extractUsernamesFollowers(data)
          setFollowers(followerUsernames)
          // debugging
          console.log(followerUsernames)
        }
        else if (type === "following") {
          const followingUsernames = extractUsernamesFollowing(data)
          setFollowing(followingUsernames)
          // debugging
          console.log(followingUsernames)
        }
      } 
      // if not a json file or other error
      catch (err) {
        console.error("Invalid JSON file", err.message);
      }
    };

    // starts the reading process with the file uploaded
    reader.readAsText(file);
  }

  function extractUsernamesFollowers(data) { 
    return data.flatMap(user => user.string_list_data.map(item => item.value) ); 
  } 
  
  function extractUsernamesFollowing(data) { 
    const following = data.relationships_following 
    return following.map(user => user.title); 
  }



  function findFakes() {
  console.log("Followers count:", followers.length);
  console.log("Following count:", following.length);

  console.log("Sample follower:", followers[0]);
  console.log("Sample following:", following[0]);

  const fakesList = following.filter(user =>
    !followers.includes(user)
  );

  console.log("Fakes count:", fakesList.length);
  setFakes(fakesList);
}


  return (
    <div id="big-container">
    <div id="heading">
      <h1>FADE THE FAKES!</h1>
      <ul id="directions">
          <li>1. Login on the Instagram app with your account.</li>
          <li>2. Go to Profile, the 3 bars on the top right, search "download your information," and click that.</li>
          <li>3. Press the blue "create export button" and "export to device."</li>
          <li>4. IMPORTANT!! Press "customize information" and press the "clear all" buttons under everything except "connections" (which should have followers and following under it) and press save.</li>
          <li>5. Change the date range to the ALL TIME</li>
          <li> 6. Under format, change from "HTML" to "JSON" and press save.</li>
          <li>7. Wait ~10 minutes for the notification that your file is ready, and download the file.</li>
          <li>8. Upload the "following.json" and "followers.json" files by clicking the respective buttons and press the "who's fake" button to see the list of people who don't follow you back!</li>
      </ul>
    </div>
    <div id="file-upload">
      <label htmlFor="followers-upload" id="followers-label">Upload followers.json</label>
      <input
        id="followers-upload"
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e, "followers")}
      />
      <label htmlFor="following-upload" id ="following-label">Upload following.json</label>
      <input 
        id="following-upload"
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e, "following")}
      />
    </div>
    <div>
      <button id="fake-btn" onClick={findFakes}>Who's fake..</button>
    </div>
    <div id="fake-section">
      <h2 id="fake-section-heading">Fakes:</h2>
      <ul id="fake-list">
        {fakes.map(user => (<li key={user}>{user}</li>))}
      </ul>
    </div>
    </div>
  )
}