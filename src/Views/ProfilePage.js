import React, {useState} from "react";
import { signOut, sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth";
import {auth} from "../Connection/firebaseConnection";

function ProfilePage() {

    const [user, setUser] = useState(null);

    function handleLogout() {
        signOut(auth);
        window.location.href = "/Main";
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }
    );


  return (
      <div className="App flex flex-col">
          <header className="App-header">

              <div className={"App-header-1"} onClick={
                  () => {
                      window.location.href = "/Main";
                  }
              }>
                  GRADECALC
              </div>
              <div className={"App-header-2"} onClick={
                  () => {
                      window.location.href = "/Main";
                  }
              }>
                  CALCULATE
              </div>
              <div className={"App-header-3"} onClick={
                  () => {
                      window.location.href = "/StudentPage";
                  }
              }>
                  STUDENT
              </div>
              <div className={"App-header-4 active"} onClick={
                  () => {
                      window.location.href = "/ProfilePage";
                  }
              }>
                  MY PROFILE
              </div>
              <div>
                  <button className={"App-header-logout-btn"} onClick={handleLogout}>Logout</button>
              </div>

          </header>

          <main>

              {!user ? <div>You are not logged in</div> :
                  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-3">
                      <h2 className="text-2xl font-bold mb-4 text-blue-500">Profile Page</h2>
                      <div className="mb-4 flex justify-evenly items-center">
                          <img src={user.photoURL} alt="profile" className="w-20 h-20 rounded-full mr-4"/>
                          <div>
                              <div className="text-gray-700 font-bold">{user.displayName}</div>
                              <div className="text-gray-500 text-sm">{user.email}</div>
                                <div className="text-gray-500 text-sm">{user.emailVerified ? "Email Verified" : "Email Not Verified"}</div>
                                <label className="text-gray-500 text-sm">Phone Number</label>
                              <div className="text-gray-500 text-sm">{user.phoneNumber || "N/A"}</div>
                          </div>
                      </div>
                      <div className="flex justify-end">
                          <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => sendPasswordResetEmail(auth, user.email).then(() => alert("Password reset email sent!")).catch((e) => alert(e))}
                          >
                              Reset Password
                          </button>
                      </div>
                  </div>
              }

          </main>

      </div>
  );
}

export default ProfilePage;
