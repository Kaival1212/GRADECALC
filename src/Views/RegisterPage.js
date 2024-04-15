import React, {useState} from "react";
import {getAuth , createUserWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";


function RegisterPage() {

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
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password).then(() => {
                window.location.href = "/Main";
            });

        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <div className={"Header_login"}>
                <div className={"Header_login_title"}>GRADECALC</div>
            </div>

            <div className="flex justify-center items-center h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#384359] shadow-lg rounded-lg p-8 w-full max-w-md font-londrina text-white"
                >
                    <h2 className="text-2xl font-bold mb-4 ">Register</h2>
                    <div className="mb-4">
                        <label className='block font-bold mb-2'>Email:</label>                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default RegisterPage;
