import React, {useEffect, useState} from 'react';
import './MainScreen.css';
import { onAuthStateChanged, signOut} from "firebase/auth";
import {collection, doc, getDoc, getDocs, getFirestore, setDoc,updateDoc} from "firebase/firestore";
import {app, auth} from "../Connection/firebaseConnection";



function MainScreen(){

    function handleLogout(){
        signOut(auth);
    }

    const [user, setUser] = useState();
    const [couresYear1, setCouresYear1] = useState([]);
    const [couresYear2, setCouresYear2] = useState([]);
    const [gradesYear1, setGradesYear1] = useState([]);
    const [gradesYear2, setGradesYear2] = useState([]);

    const [total, setTotal] = useState(0);

    const [negativeError, setNegativeError] = useState(false);
    const [hundereError, setHundereError] = useState(false);

    const [error, setError] = useState(false);

    const db = getFirestore(app);
    const userColRef = collection(db, "Users");
    const univetrsityColRef = collection(db, "University");

    function checkForUser(userColRef, univetrsityColRef) {
        getDocs(userColRef).then((docs) => {
            let userFound = false;
            docs.forEach((indidoc) => {
                if (user != null && indidoc.id === user.uid) {
                    console.log("user already exists");
                    userFound = true;
                    return;
                }
            });

            if (!userFound && user != null) {
                setDoc(doc(userColRef, user.uid), {
                    savedGrades: {
                        // 1:{
                        //     gradesYear1:{"course1":40, "course2":50, "course3":60},
                        //     gradesYear2:{"course1":40, "course2":50, "course3":60},
                        //     total: 50,
                        //     dateadded: new Date().getTime(),
                        // },
                        // 2:{},
                    },
                    Email: user.email,
                    Name: user.displayName ? user.email : "User",
                })
                    .then(() => {
                        console.log("Document successfully written!");
                    });
            }
        });
    }

    function saveGrades() {
        let hasError = false;

        if (gradesYear1.length === 0 || gradesYear2.length === 0 || couresYear1.length === 0 || couresYear2.length === 0) {
            hasError = true;
        }

        for (let i = 0; i < gradesYear1.length; i++) {
            if (gradesYear1[i] < 0 || gradesYear1[i] > 100 || couresYear1[i] === '' || couresYear1[i] === null || couresYear1 === undefined) {
                hasError = true;
                break;
            }
        }

        for (let i = 0; i < gradesYear2.length; i++) {
            if (gradesYear2[i] < 0 || gradesYear2[i] > 100 || couresYear2[i] === '' || couresYear2[i] === null || couresYear2 === undefined) {
                hasError = true;
                break;
            }
        }

        if (hasError) {
            setError(true);
            alert('Please enter valid grades and course names');
            return;
        }

        if (user) {
            getDoc(doc(userColRef, user.uid)).then((indidoc) => {
                let savedGrades = indidoc.data()?.savedGrades || {};
                savedGrades[Object.keys(savedGrades).length + 1] = {
                    gradesYear1,
                    couresYear1,
                    gradesYear2,
                    couresYear2,
                    total,
                    dateadded: new Date().getTime(),
                };
                updateDoc(doc(userColRef, user.uid), {
                    savedGrades,
                })
                    .then(() => {
                        setError(false);
                        alert('Grades saved successfully');
                    })
                    .catch((error) => {
                        setError(true);
                        alert('Error saving grades');
                    });
            });
        } else {
            setError(true);
            alert('Please login to save grades');
        }
    }


    useEffect(() => {
        onAuthStateChanged(auth,  (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser(null);
            }
        });
    }
    , []);

    useEffect(() => {
        checkForUser(userColRef, univetrsityColRef);
    },[checkForUser, univetrsityColRef, user, userColRef]);

    function handelcouresYear1(index , value){
        setCouresYear1( indi => {
            indi[index] = value;
            return indi;
        }  );
    }
    function handelgradeYear1(index , value) {
        const numericValue = Number(value);
        const clampedValue = Math.max(0, Math.min(100, numericValue));

        setGradesYear1(grades => {
            const updatedGrades = [...grades];
            updatedGrades[index] = clampedValue;
            return updatedGrades;
        });
    }

    function handelcouresYear2(index , value){
        setCouresYear2( indi => {
            indi[index] = value;
            return indi;
        }  );
    }

    function handelgradeYear2(index, value) {
        const numericValue = Number(value);
        const clampedValue = Math.max(0, Math.min(100, numericValue));

        setGradesYear2(grades => {
            const updatedGrades = [...grades];
            updatedGrades[index] = clampedValue;
            return updatedGrades;
        });
    }


    function sortAscending(arr){
        return arr.sort((a, b) => a - b);
    }

    function addgradeYear1(){
            let grades = sortAscending([...gradesYear1]);
            grades[0] = grades[0]/2;

            let sum = 0;

            for(let i = 0; i < grades.length; i++){
                sum+= parseInt(grades[i]);
            }

        return sum / 3.5;
    }

    function addgradeYear2(){



        let grades2 = sortAscending([...gradesYear2]);
        grades2[0] = grades2[0]/2;

        let sum = 0;

        for(let i = 0; i < grades2.length; i++){
            sum+= parseInt(grades2[i]);
        }

        return sum / 3.5;
    }

    function calculate(){
        let year1 = addgradeYear1();
        let year2 = addgradeYear2();

        console.log(year1, year2);


        if(year1 < 0 || year2 < 0 || year1 > 100 || year2 > 100 || isNaN(year1) || isNaN(year2)){
            handleNegativeError();
            return;
        }

        let total = (year1 * 0.20) + (year2 * 0.80);

        if (total > 100 || total < 0){
            setError(true);
            return;
        }

        setTotal(total);
    }

    function handleNegativeError(){
        setNegativeError(true);
        document.getElementById("error").style.opacity = 1;
        setTimeout(() => {
            document.getElementById("error").style.opacity = 0;
            setNegativeError(false);
        }, 3000);
    }

    function handleHundereError(){
        setHundereError(true)
        document.getElementById("error").style.opacity = 1;
        setTimeout(() => {
            document.getElementById("error").style.opacity = 0;
            setHundereError(false)
        }, 3000);
    }


    useEffect(() => {

        for(let i = 0; i < gradesYear1.length; i++){
            if(gradesYear1[i] < 0){
                handleNegativeError();
            }
            if(gradesYear1[i] > 100){
                handleHundereError();
            }

        }

        for(let i = 0; i < gradesYear2.length; i++){
            if(gradesYear2[i] < 0){
                handleNegativeError();
            }
            if(gradesYear2[i] > 100){
                handleHundereError();
            }
        }

    }, [gradesYear1, gradesYear2]);

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
                <div className={"App-header-2 active"}>
                    CALCULATE
                </div>
                <div className={"App-header-3"} onClick={
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

            <main className={"flex flex-col"}>

                {/*error log*/}
                <div className="flex justify-center opacity-0 transition-all duration-500" id={"error"}>
                    <div className="text-red-500 bg-red-300 p-2 m-1 rounded-xl ">
                        {negativeError ? "Please enter a positive number" :
                            hundereError ? "Please enter a number between 0 and 100" :
                                ""
                        }
                    </div>
                </div>

                <div className="flex w-[80vw] h-auto bg-gray-300 gap-3 p-20">
                    <div className="flex w-1/2">

                        <div className="flex flex-col font-bold text-2xl w-full ">
                            Year 2


                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value = {couresYear1[0]}
                                       onChange={(e) => handelcouresYear1(0,e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value = {gradesYear1[0]}
                                       onChange={(e) => handelgradeYear1(0,e.target.value)}
                                       min={0}
                                        max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear1[1]}
                                       onChange={(e) => handelcouresYear1(1, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear1[1]}
                                       onChange={(e) => handelgradeYear1(1, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear1[2]}
                                       onChange={(e) => handelcouresYear1(2, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear1[2]}
                                       onChange={(e) => handelgradeYear1(2, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear1[3]}
                                       onChange={(e) => handelcouresYear1(3, e.target.value)}

                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear1[3]}
                                       onChange={(e) => handelgradeYear1(3, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                        </div>

                    </div>

                    <div className="flex w-1/2">

                        <div className="flex flex-col font-bold text-2xl w-full">
                            Year 3

                            {/* Reusable input section */}
                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear2[0]}
                                       onChange={(e) => handelcouresYear2(0, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear2[0]}
                                       onChange={(e) => handelgradeYear2(0, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear2[1]}
                                       onChange={(e) => handelcouresYear2(1, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear2[1]}
                                       onChange={(e) => handelgradeYear2(1, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear2[2]}
                                       onChange={(e) => handelcouresYear2(2, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear2[2]}
                                       onChange={(e) => handelgradeYear2(2, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            <div className="flex font-bold gap-2 text-md">
                                <input type="text"
                                       placeholder="Course Name"
                                       className="border w-1/2 text-black"
                                       value={couresYear2[3]}
                                       onChange={(e) => handelcouresYear2(3, e.target.value)}
                                ></input>
                                <input type="number"
                                       placeholder="Grade"
                                       className="border w-1/2 text-black"
                                       value={gradesYear2[3]}
                                       onChange={(e) => handelgradeYear2(3, e.target.value)}
                                       min={0}
                                       max={100}
                                ></input>
                            </div>

                            {/* Repeat input sections as needed */}
                        </div>

                    </div>
                </div>


            </main>
            <div className="flex  justify-center gap-2 align-middle mt-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
                        onClick={calculate}>
                    Calculate
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
                        onClick={()=>{saveGrades()}}>
                    Save
                </button>
                <div className="">
                    your grade is {Math.round(total)}
                </div>
            </div>
        </div>
    );

}

export default MainScreen;
