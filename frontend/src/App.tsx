import React, { useEffect, useState } from 'react';
import initialState from "./initialState";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./css/doggrStyles.css";
import Header from "./components/Header";
import { MatchHistory } from "./components/MatchHistory";
import { Profile } from "./components/Profile";
import { CreateUser } from "./components/CreateUser";
import { CreateProfile } from "./components/CreateProfile";
import { MessageBox } from "./components/Message";
import { Login } from "./components/Login";
import {AuthProvider, getPayloadFromToken} from "./services/AuthService";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { getRandomProfile } from "./services/ProfileService";
import getInitialState from "./initialState";
import { Profile as ProfileType } from "./types/StateTypes";
import { NotFound } from "./components/NotFound";
import {Message} from "./services/MessageService";

function Page() {
  return (
    <div className="doggrcenter">
      <Header />
      <br />
      <Outlet />
    </div>
  );
}

export type FilterBarProps = {
  onApply: (filterString: string) => void,
}

function App() {

  let [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null);
  // let [likeHistory, setLikeHistory] = useState<Array<ProfileType>>([]);
  // let [passHistory, setPassHistory] = useState<Array<ProfileType>>([]);

  // empty deps, runs only on startup
  useEffect(() => {
    let init = async () => {
      try {
        let initialState = await getInitialState();
        setCurrentProfile(initialState.currentProfile);

      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [])

  //Runs every time App rerenders
  useEffect(() => {
    console.log("-- current profile --");
    console.log(currentProfile);
  });



  let onLikeButtonClick = async () => {

    getRandomProfile().then(
      async (newProfile) => {
        setCurrentProfile(newProfile);
      }
    );
  };

  let onPassButtonClick = () => {
    getRandomProfile().then(
      (newProfile) => {
        setCurrentProfile(newProfile);
      }
    );
  };



  let profile = <Profile {...currentProfile!}
    onLikeButtonClick={onLikeButtonClick}
    onPassButtonClick={onPassButtonClick} />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route path="/" element={profile} />
            <Route path="match-history" element={
              <ProtectedRoute>
                <MatchHistory />
              </ProtectedRoute>
            } />

            <Route path="create-profile" element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            } />

            <Route path="messages" element={
              <ProtectedRoute>
                <MessageBox />
              </ProtectedRoute>
            } />


            <Route path="create-user" element={<CreateUser />} />

            <Route path="login" element={
              <Login />
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
