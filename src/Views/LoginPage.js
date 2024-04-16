import React, {useState} from 'react';
import { signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import "./LoginPage.css";
import {auth} from "../Connection/firebaseConnection";
import {FaGoogle} from "react-icons/fa";
function LoginPage() {

    const provider = new GoogleAuthProvider();


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
                const user = userCredential.user;
            })
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
