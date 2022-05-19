import React, {useEffect, useState} from 'react';
import initialState from "./initialState";
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
import {getRandomProfile} from "./services/ProfileService";
import getInitialState from "./initialState";
import {Profile as ProfileType} from "./types/StateTypes";
import {NotFound} from "./components/NotFound";

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
 
  let [currentProfile, setCurrentProfile] = useState<ProfileType | null>(null);
  let [likeHistory, setLikeHistory] = useState<Array<ProfileType>>([]);
  let [passHistory, setPassHistory] = useState<Array<ProfileType>>([]);

  // empty deps, runs only on startup
  useEffect(() => {
    let init = async () => {
      let initialState = await getInitialState();
      setCurrentProfile(initialState.currentProfile);
      setLikeHistory(initialState.likeHistory);
      setPassHistory(initialState.passHistory);
    }
    init();
  }, [])

  //Runs every time App rerenders
  useEffect(() => {
    console.log("-- current profile --");
    console.log(currentProfile); 
  });

  let onLikeButtonClick = async() => {
    let newLikeHistory = [...likeHistory, currentProfile!];    
    
    getRandomProfile().then(
      (newProfile) => {
        setCurrentProfile(newProfile);
        setLikeHistory(newLikeHistory);
      }
    );
  };

  let onPassButtonClick = () => {
    let newPassHistory = [...passHistory, currentProfile!];
    getRandomProfile().then(
      (newProfile) => {
        setPassHistory(newPassHistory);
        setCurrentProfile(newProfile);
      }
    );
  };

  let onUnmatchButtonClick = (id: number) => {
    let newLikeHistory = likeHistory.filter((i) => i.id !== id);
    setLikeHistory(newLikeHistory);
  };


  let profile = <Profile {...currentProfile!}
                         onLikeButtonClick={onLikeButtonClick}
                         onPassButtonClick={onPassButtonClick}/>;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Page />}>
          
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

            <Route path="login" element={              
              <Login />
            } />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
