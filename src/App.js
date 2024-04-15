import './App.css';
import LoginPage from './Views/LoginPage';
import React from 'react';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
//import react router
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import MainScreen from './Views/MainScreen';
import WelcomePage from "./Views/WelcomePage";
import StudentPage from "./Views/StudentPage";
import ProfilePage from "./Views/ProfilePage";
import RegisterPage from "./Views/RegisterPage";


const firebaseConfig = {
    apiKey: "AIzaSyAYlfRlaYlYjkAf6Vwp_kTGjivZfJhCSyE",
    authDomain: "grade-calculator-62d91.firebaseapp.com",
    projectId: "grade-calculator-62d91",
    storageBucket: "grade-calculator-62d91.appspot.com",
    messagingSenderId: "275217404781",
    appId: "1:275217404781:web:320b2cf41186166c984064",
    measurementId: "G-5P5QLFM1SE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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
