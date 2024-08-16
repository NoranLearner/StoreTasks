import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet } from "react-helmet-async";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const Css = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    return (
        <>

            {/* --------------------------------------------------------------------- */}

            <Helmet>
                <title>CSS Page</title>
                <meta name="description" content="CSS Page Description" />
            </Helmet>

            {/* --------------------------------------------------------------------- */}

            <Header />

            {/* --------------------------------------------------------------------- */}

            <main>CSS Page</main>

            {/* --------------------------------------------------------------------- */}

            <Footer />

            {/* --------------------------------------------------------------------- */}

        </>
    )
}

export default Css;