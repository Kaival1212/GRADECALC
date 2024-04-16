import React, {useEffect, useState , useCallback} from "react";
import { signOut} from "firebase/auth";
import {collection, getDocs, getFirestore, getDoc, doc, setDoc} from "firebase/firestore";
import {app,auth} from "../Connection/firebaseConnection";

function StudentPage() {

    const [userData, setUserdata] = useState(null);
    const user = auth.currentUser || null;
    const db = getFirestore(app);
    const studentColRef = collection(db,"Users");

    const getStudentData = useCallback(() => {
        getDocs(studentColRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id === user?.uid) {
                        setUserdata(doc.data());
                    }
                });
            })
            .catch((error) => {
                console.error("Error getting student data:", error);
            });
    }, [studentColRef, user?.uid]);

    function handleLogout(){
        signOut(auth);
        window.location.href = "/Main";
    }

    useEffect(() => {
        if (user) {
            getStudentData();
        } else {
            setUserdata(null);
        }
    }, [getStudentData, user]);

    async function deleteGrade(key) {
        try {
            const gradeDocRef = doc(db, "Users", user.uid);
            const gradeDoc = await getDoc(gradeDocRef);
            const gradeData = gradeDoc.data();
            delete gradeData.savedGrades[key];
            await setDoc(gradeDocRef, gradeData);
            getStudentData();
        } catch (error) {
            console.error("Error deleting grade:", error);
        }
    }


    if(user == null) {
        return(
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
                <div className={"App-header-3 active"} onClick={
                    () => {
                        window.location.href = "/StudentPage";
                    }
                }>
                    STUDENT
                </div>
                <div className={"App-header-4"}>
                    MY PROFILE
                </div>
                <div>
                    <button className={"App-header-logout-btn"} onClick={handleLogout}>Logout</button>
                </div>

            </header>
            <main>
                You are not logged in
            </main>
        </div>
        );
    }
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
                <div className={"App-header-3 active"} onClick={
                    () => {
                        window.location.href = "/StudentPage";
                    }
                }>
                    STUDENT
                </div>
                <div className={"App-header-4"} onClick={
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
                <div>
                    <div>
                        {
                            userData ? (
                                <div className="max-w-4xl mx-auto p-4 bg-[#282c34] text-white">
                                    <h2 className="text-xl font-semibold text-gray-300">{userData.Name}</h2>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {Object.keys(userData.savedGrades).map((key, i) => (
                                            <div key={i} className="mb-4 w-full md:w-auto p-4 bg-[#3C4049] shadow-lg rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 ease-in-out">
                                                <div className="border-b border-gray-600 pb-2 mb-3">
                                                    <h3 className="text-lg font-semibold">Year 1</h3>
                                                </div>
                                                {userData.savedGrades[key]["couresYear1"].map((course, j) => (
                                                    <div key={j} className="grid grid-cols-2 gap-2">
                                                        <h3 className="font-medium">{course}</h3>
                                                        <h3 className="text-right">{userData.savedGrades[key]["gradesYear1"][j]}</h3>
                                                    </div>
                                                ))}

                                                <div className="border-b border-gray-600 pb-2 mb-3 mt-4">
                                                    <h3 className="text-lg font-semibold">Year 2</h3>
                                                </div>
                                                {userData.savedGrades[key]["couresYear2"].map((course, j) => ( // Assuming Year 2 courses are the same; adjust if not.
                                                    <div key={j} className="grid grid-cols-2 gap-2">
                                                        <h3 className="font-medium">{course}</h3>
                                                        <h3 className="text-right">{userData.savedGrades[key]["gradesYear2"][j]}</h3>
                                                    </div>
                                                ))}

                                                <div className="border-b border-gray-600 pb-2 mb-3 mt-4">
                                                    Total:
                                                    {Math.round(userData.savedGrades[key]["total"])}
                                                </div>

                                                <div className="mt-4 text-sm text-gray-500">
                                                    Added on: {new Date(userData.savedGrades[key]["dateadded"]).toLocaleDateString()} at {new Date(userData.savedGrades[key]["dateadded"]).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                                </div>

                                                <button className={" bg-red-500 p-2 rounded hover:bg-red-600"}
                                                        onClick={() => deleteGrade(key)}
                                                >Delete</button>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-xl mx-auto p-4">
                                    <h2>Loading...</h2>
                                </div>
                            )
                        }
                    </div>

                </div>
            </main>

        </div>
    );
}

export default StudentPage;
