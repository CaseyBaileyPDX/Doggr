import React, { useEffect, useState } from 'react';
import initialState, { getRandomProfile } from "./initialState";
import {NotFound} from "./Components";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import "/public/css/doggrStyles.css";
import Header from "./components/Header";
import {MatchHistory} from "./components/MatchHistory";
import {Profile} from "./components/Profile";
import {CreateUser} from "./components/CreateUser";
import {CreateProfile} from "./components/CreateProfile";
import {MessageBox} from "./components/Message";

function Page() {
  return (
    <div className="doggrcenter">
      <Header/>
      <br/>
      <Outlet/>
    </div>
  )
}

function App() {
  let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);
  let [likeHistory, setLikeHistory] = useState(initialState.likeHistory);
  let [passHistory, setPassHistory] = useState(initialState.passHistory);

  useEffect(() => {
    console.log("-- App rerenders --");
  });

  let onLikeButtonClick = () => {
    let newLikeHistory = [...likeHistory, currentProfile];
    let newProfile = getRandomProfile();
    setCurrentProfile(newProfile);
    setLikeHistory(newLikeHistory);
  };

  let onPassButtonClick = () => {
    let newPassHistory = [...passHistory, currentProfile];
    let newCurrentProfile = getRandomProfile();
    setPassHistory(newPassHistory);
    setCurrentProfile(newCurrentProfile);
  };

  let onUnmatchButtonClick = (id: number) => {
    let newLikeHistory = likeHistory.filter((i) => i.id !== id);
    setLikeHistory(newLikeHistory);
  };


  let profile = <Profile {...currentProfile}
    onLikeButtonClick={onLikeButtonClick}
    onPassButtonClick={onPassButtonClick} />

  let matchHistory = <MatchHistory likeHistory={likeHistory}
    onUnmatchButtonClick={onUnmatchButtonClick}  />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route path="/" element={profile} />
            <Route path="match-history" element={matchHistory} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-profile" element={<CreateProfile />} />
            <Route path="messages" element={<MessageBox />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}



export default App;
