import React from 'react'

import { Helmet } from "react-helmet-async";

import Header from '../components/Header'
import Footer from '../components/Footer'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Moment from "react-moment";

import { deleteUser } from "firebase/auth";

import Loading from '../components/Loading.jsx';

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/");
        }
        if (user) {
            if (!user.emailVerified) {
                navigate("/");
            }
        }
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (user) {

        return (

            <>

                {/* --------------------------------------------------------------------- */}

                <Helmet>
                    <title>Profile</title>
                    <meta name="description" content="Profile Page Description" />
                    <style type="text/css">{` 
                        main{
                        flex-direction: column;
                        align-items: flex-start;
                        width: fit-content;
                        margin: auto;
                        }
                    `}</style>
                </Helmet>

                {/* --------------------------------------------------------------------- */}

                <Header />

                {/* --------------------------------------------------------------------- */}

                <main>

                    <h6>UserName: {user.displayName}</h6>

                    <h6>Email: {user.email}</h6>

                    <h6> Last Sign-in : <Moment fromNow date={user.metadata.lastSignInTime} /> </h6>

                    <h6> Account Created : <Moment fromNow date={user.metadata.creationTime} /> </h6>

                    <button className="delete" onClick={() => {
                        deleteUser(user).then(() => {
                            // User deleted.
                            console.log("User deleted.")
                        }).catch((error) => {
                            // An error ocurred
                            console.log(error.message)
                        });
                    }}>Delete account</button>

                </main>

                {/* --------------------------------------------------------------------- */}

                <Footer />

                {/* --------------------------------------------------------------------- */}

            </>

        )

    }

}

export default Profile;