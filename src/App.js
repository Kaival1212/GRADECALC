import './App.css';
import LoginPage from './Views/LoginPage';
import React from 'react';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./Connection/firebaseConnection";
//import react router
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import MainScreen from './Views/MainScreen';
import WelcomePage from "./Views/WelcomePage";
import StudentPage from "./Views/StudentPage";
import ProfilePage from "./Views/ProfilePage";
import RegisterPage from "./Views/RegisterPage";





function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/login" element={<LoginPage/>}>*/}
                    {/*</Route>*/}
                    <Route path="/main" element={user != null ? <MainScreen/> : <LoginPage/>}/>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="/StudentPage" element={<StudentPage/>}/>
                    <Route path="/ProfilePage" element={<ProfilePage/>}/>
                    <Route path="/RegisterPage" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
            {/*{user ? <MainScreen/> : <LoginPage />}*/}
        </div>
    );


}

export default App;
