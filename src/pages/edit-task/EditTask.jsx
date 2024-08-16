import React from 'react'

import { Helmet } from "react-helmet-async";
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

import Loading from '../../components/Loading.jsx';

import './EditTask.css'

import TitleSection from './TitleSection'
import SubtasksSection from './SubtasksSection'
import BtnsSection from './BtnsSection';

import { useParams } from 'react-router-dom';

import { useState } from 'react';

import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import ReactLoading from 'react-loading';

const EditTask = () => {

    // --------------------------------------------------------------------- //

    const [user, loading, error] = useAuthState(auth);

    // --------------------------------------------------------------------- //

    // Get the id param from the URL.
    let { stringId } = useParams();
    // console.log(id);

    // --------------------------------------------------------------------- //

    const navigate = useNavigate();

    const [showData, setShowData] = useState(false);

    const deleteBtn = async () => {
        setShowData(true);
        await deleteDoc(doc(db, user.uid, stringId));
        navigate("/", { replace: true });
    }

    // --------------------------------------------------------------------- //

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (<h1>Error: {error.message} </h1>);
    }

    // --------------------------------------------------------------------- //

    if (user) {

        return (

            <div>

                {/* --------------------------------------------------------------------- */}

                <Helmet>
                    <title>Home Page</title>
                    <meta name="description" content="Edit Task Page Description" />
                </Helmet>

                {/* --------------------------------------------------------------------- */}

                <Header />

                {/* --------------------------------------------------------------------- */}

                {showData ?
                    (
                        <main>
                            <ReactLoading type="spin" color="white" height={77} width={77} className='center' />
                        </main>
                    )
                    :
                    (
                        <div className="edit-task">

                            {/* Title */}
                            <TitleSection user={user} stringId={stringId} />

                            {/* Sub-tasks section */}
                            <SubtasksSection user={user} stringId={stringId} />

                            {/* Delete BTN */}
                            <BtnsSection user={user} stringId={stringId} deleteBtn={deleteBtn} />

                        </div>
                    )
                }

                {/* --------------------------------------------------------------------- */}

                <Footer />

                {/* --------------------------------------------------------------------- */}

            </div>

        )

    }

    // --------------------------------------------------------------------- //

}

export default EditTask
