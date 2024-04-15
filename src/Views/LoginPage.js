import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "./LoginPage.css";
import {FaGoogle} from "react-icons/fa";
import registerPage from "./RegisterPage";

function LoginPage() {

    const provider = new GoogleAuthProvider();

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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    const SignInWithEmailAndPassword = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                document.getElementById("loginError").style.opacity = 1;
                setTimeout(() => {
                    document.getElementById("loginError").style.opacity = 0;
                } , 3000);
            });
    }

    function register(){
        window.location.href = "/RegisterPage";
    }

    return (
    <div>
      <div className={"Header_login"}>
          <div className={"Header_login_title"}>GRADECALC</div>
      </div>

        <div className={"login_main"}>
            <div className={"login_title"}>Login</div>
            <div className={"Login_error"} id={"loginError"}>{"Invalid Email or Password"}</div>
            <input type="email" name="email" onChange={handleEmailChange} placeholder={"Email"}/>
            <input type="password" name="password" onChange={handlePasswordChange} placeholder={"Password"}/>
            <button onClick={() => SignInWithEmailAndPassword(auth, email, password)}
                    className="bg-blue-500 w-80 h-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
            </button>
            <button onClick={loginWithGoogle}
                    className="bg-white w-80  h-12 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center">
                <FaGoogle className="mr-2"/>
                Sign in with Google
            </button>
            <button onClick={() => register()}
                    className="bg-green-500 w-80 h-12 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Register
            </button>
        </div>
    </div>
    );
}

export default LoginPage;
