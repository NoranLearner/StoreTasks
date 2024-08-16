import React from 'react'
import { Helmet } from "react-helmet-async";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/config.js'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import "./Signin.css";

import Modal from '../../shared/Modal'

const Signin = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const [hasError, sethasError] = useState(false);
    const [firebaseError, setfirebaseError] = useState("");

    const [showSendEmail, setshowSendEmail] = useState(false);

    const [resetPass, setresetPass] = useState("");

    const [showModal, setshowModal] = useState(false);

    const closeModal = () => {
        setshowModal(false)
    };

    return (
        <>

            {/* --------------------------------------------------------------------- */}

            <Helmet>
                <title>Signin Page</title>
                <meta name="description" content="Signin Page Description" />
            </Helmet>

            {/* --------------------------------------------------------------------- */}

            <Header />

            {/* --------------------------------------------------------------------- */}

            <main>

                {/* --------------------------------------------------------------------- */}

                {showModal && (
                    <Modal closeModal={closeModal}>
                        <input required placeholder=" E-mail : " type="email" onChange={(eo) => { setresetPass(eo.target.value) }} />
                        <button onClick={(eo) => {
                                eo.preventDefault();
                                sendPasswordResetEmail(auth, resetPass)
                                    .then(() => {
                                        // Password reset email sent!
                                        console.log("send email")
                                        setshowSendEmail(true);
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorCode)
                                    });
                            }}>Reset email</button>

                            {showSendEmail && (
                                <p className="check-email">
                                    Please check your email to reset your password.
                                </p>
                            )}
                    </Modal>
                )}

                {/* --------------------------------------------------------------------- */}

                <form>

                    <input required placeholder=" E-mail : " type="email" onChange={(eo) => {
                        setemail(eo.target.value)
                    }} />

                    <input required placeholder=" Password : " type="password" onChange={(eo) => {
                        setpassword(eo.target.value)
                    }} />

                    <button onClick={(eo) => {
                        eo.preventDefault();
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                console.log(user);
                                navigate("/");
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorMessage);
                                sethasError(true)
                                switch (errorCode) {

                                    case "auth/invalid-email":
                                        setfirebaseError("Wrong Email")
                                        break;


                                    case "auth/user-not-found":
                                        setfirebaseError("Wrong Email")
                                        break;


                                    case "auth/wrong-password":
                                        setfirebaseError("Wrong Password")
                                        break;


                                    case "auth/too-many-requests":
                                        setfirebaseError("Too many requests, please try aganin later")
                                        break;


                                    default:
                                        setfirebaseError("Please check your email & password")
                                        break;

                                }
                            });
                    }}>Sign in</button>

                    <p className="account">
                        Don't have an account <Link to="/sign-up"> Sign-up</Link>
                    </p>

                    <p className="forgot-pass mt" onClick={() => { setshowModal(true) }}>Forgot password ?</p>

                    {hasError && <h2>{firebaseError}</h2>}

                </form>
            </main >

            {/* --------------------------------------------------------------------- */}

            < Footer />

            {/* --------------------------------------------------------------------- */}

        </>
    )
}

export default Signin;