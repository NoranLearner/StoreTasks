import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet } from "react-helmet-async";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

import Loading from '../components/Loading.jsx';

const Html = () => {

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

    const [array, setArray] = useState(["html", "css", "react"]);

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    // --------------------------------------------------------------------- //

    if (user) {

        if (user.emailVerified) {

            return (
                <>

                    {/* --------------------------------------------------------------------- */}

                    <Helmet>
                        <title>HTML Page</title>
                        <meta name="description" content="HTML Page Description" />
                    </Helmet>

                    {/* --------------------------------------------------------------------- */}

                    <Header />

                    {/* --------------------------------------------------------------------- */}

                    <main>

                        {array.map((item) => {
                            return (
                                <div key="Math.random">
                                    <h3> {item} </h3>
                                </div>
                            );
                        })}

                    </main>

                    {/* --------------------------------------------------------------------- */}

                    <Footer />

                    {/* --------------------------------------------------------------------- */}

                </>
            )

        }

    }

}

export default Html;