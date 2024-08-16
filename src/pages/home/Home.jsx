import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Helmet } from "react-helmet-async";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";

import { Link } from "react-router-dom";

import { sendEmailVerification } from "firebase/auth";

import Loading from '../../components/Loading.jsx';

import Error404 from "../../pages/Error404.jsx";

import './Home.css'

import Modal from '../../shared/Modal'

import { useState } from 'react';

import { doc, setDoc } from "firebase/firestore";

import ReactLoading from 'react-loading';

import AllTasksSection from './AllTasksSection';

const Home = () => {

    const [user, loading, error] = useAuthState(auth);
    console.log(user);

    // --------------------------------------------------------------------- //

    const [taskTitle, setTaskTitle] = useState("");
    const [subTask, setSubTask] = useState("");
    const [array, setArray] = useState([]);
    const addBtn = () => {
        if (!array.includes(subTask)) {
            array.push(subTask);
        }
        // console.log(array);
        // setTaskTitle("");
        setSubTask("");
    }
    const [showLoading, setShowLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // --------------------------------------------------------------------- //

    const [showModal, setshowModal] = useState(false);

    const closeModal = () => {
        setshowModal(false);
        setTaskTitle("");
        setArray([]);
    };

    // --------------------------------------------------------------------- //

    if (!user) {

        return (
            <>

                {/* --------------------------------------------------------------------- */}

                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="Home Page Description" />
                    {/* <style type="text/css">{`
                        body {
                            background-color: yellow;
                        }
    
                        main {
                            font-size: 60px;
                        }
                    `}
                    </style> */}
                </Helmet>

                {/* --------------------------------------------------------------------- */}

                <Header />

                <main>
                    <p className='pls'>
                        Please{" "}
                        <Link style={{ fontSize: "30px" }} to="/sign-in">
                            sign in
                        </Link>{" "}
                        to continue... <span>🧡</span>
                    </p>
                </main>

                {/* --------------------------------------------------------------------- */}

                <Footer />

                {/* --------------------------------------------------------------------- */}

            </>
        )

    }

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error404 />;
    }

    // --------------------------------------------------------------------- //

    if (!user.emailVerified) {
        return (
            <>
                <Helmet>
                    <title>HOME Page</title>
                    <meta name="description" content="HOMEEEEEEEEEEEE" />
                </Helmet>

                <Header />

                <main style={{ flexDirection: "column" }}>
                    <p>
                        {" "}
                        Welcome: {user.displayName} <span>🧡</span>
                    </p>

                    <p>Please verify your email to continue ✋ </p>
                    <button className="delete" onClick={() => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                console.log("Email verification sent!")
                                // ...
                            });
                    }}>Send email</button>
                </main>

                <Footer />
            </>
        );
    }

    // --------------------------------------------------------------------- //

    if (user) {
        if (user.emailVerified) {

            return (
                <>
                    <Helmet>
                        <title>HOME Page</title>
                    </Helmet>

                    <Header />

                    <main className="home">

                        {/* OPTIONS (filtered data) */}
                        {/* SHOW all tasks */}
                        <AllTasksSection user={user}/>

                        {/* Add new task BTN */}
                        <section className="mt">
                            <button className="add-task-btn" onClick={() => { setshowModal(true) }}>
                                Add new task <i className="fa-solid fa-plus"></i>
                            </button>
                        </section>

                        {
                            showModal &&

                            <Modal closeModal={closeModal} >

                                <div className='model-content'>

                                    <input onChange={(eo) => { setTaskTitle(eo.target.value) }} required placeholder=" Add title : " type="text" value={taskTitle} />

                                    <div>
                                        <input onChange={(eo) => { setSubTask(eo.target.value) }} placeholder=" details " type="email" value={subTask} />
                                        <button onClick={(eo) => { eo.preventDefault(); addBtn(); }}> Add </button>
                                    </div>

                                    <ul>
                                        {array.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>

                                    <button onClick={async (eo) => {
                                        eo.preventDefault();
                                        console.log("Waiting..........");
                                        setShowLoading(true);
                                        const taskId = new Date().getTime();
                                        await setDoc(doc(db, user.uid, `${taskId}`), {
                                            title: taskTitle,
                                            subtasks: array,
                                            id: taskId,
                                            completed: false,
                                        });
                                        console.log("Done..........");
                                        setShowLoading(false);
                                        setTaskTitle("");
                                        setArray([]);<Loading />
                                        setshowModal(false);
                                        setShowMessage(true);
                                        setTimeout(() => { setShowMessage(false) }, 4000)
                                    }}>
                                        {
                                            showLoading ? <ReactLoading type="spin" color="white" height={20} width={20} /> : "Submit"
                                        }
                                    </button>

                                </div>

                            </Modal>
                        }

                        <p className='show-message' style={{
                            right: showMessage ? "20px" : "-100vw",
                        }}>
                            Task Added Successfully
                            <i className='fa-regular fa-circle-check'></i>
                        </p>

                    </main>

                    <Footer />
                </>
            );
        }

    }

}

export default Home;