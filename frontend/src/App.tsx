import React, {useEffect, useState} from 'react';
import initialState, {getRandomProfile} from "./initialState";
import {NotFound} from "./Components";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import "/public/css/doggrStyles.css";
import Header from "./components/Header";
import {MatchHistory} from "./components/MatchHistory";
import {Profile} from "./components/Profile";
import {CreateUser} from "./components/CreateUser";
import {CreateProfile} from "./components/CreateProfile";
import {MessageBox} from "./components/Message";
import {Login} from "./components/Login";
import {AuthProvider} from "./services/AuthService";
import {ProtectedRoute} from "./components/ProtectedRoute";

function Page() {
  return (
    <div className="doggrcenter">
      <Header/>
      <br/>
      <Outlet/>
    </div>
  );
}

export type FilterBarProps = {
  onApply: (filterString: string) => void,
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
                         onPassButtonClick={onPassButtonClick}/>;

  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Page/>}>
            <Route path="/" element={profile}/>
            <Route path="match-history" element={
              <ProtectedRoute>
                <MatchHistory likeHistory={likeHistory}
                              onUnmatchButtonClick={onUnmatchButtonClick}/>
              </ProtectedRoute>
            }/>
            <Route path="create-profile" element={
              <ProtectedRoute>
                <CreateProfile/>
              </ProtectedRoute>
            }/>
            <Route path="messages" element={
              <ProtectedRoute>
                <MessageBox/>
              </ProtectedRoute>
            }/>

            <Route path="create-user" element={<CreateUser/>}/>
            <Route path="login" element={<Login/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}


export default App;
