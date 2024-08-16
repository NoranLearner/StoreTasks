import React, { useState } from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
// import Loading from '../../components/Loading.jsx';
import ReactLoading from 'react-loading';
import Error404 from "../../pages/Error404.jsx";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {

    // --------------------------------------------------------------------- //

    /* const [value, loading, error] = useCollection(
        query(collection(db, user.uid), orderBy("title"))
    ); */

    /* const [value, loading, error] = useCollection(
        query(collection(db, user.uid), orderBy("id", "desc"))
    ); */

    /* const [value, loading, error] = useCollection(
        query(collection(db, user.uid), orderBy("id", "desc"), limit(2))
    ); */

    const [initialData, setInitialData] = useState(query(collection(db, user.uid), orderBy("id", "asc")));

    const [value, loading, error] = useCollection(initialData);

    const [isFullOpacity, setIsFullOpacity] = useState(false);

    const [selectValue, setSelectValue] = useState("");

    // --------------------------------------------------------------------- //

    if (loading) {
        // return <Loading />;
        return <ReactLoading type="spin" color="white" height={77} width={77} />;
    }

    // --------------------------------------------------------------------- //

    if (error) {
        return <Error404 />;
    }

    // --------------------------------------------------------------------- //

    if (value) {

        return (

            <>

                {/* OPTIONS (filtered data) */}

                <section className="parent-of-btns flex mt">

                    {(selectValue === "All Tasks" || selectValue === "") && (

                        <>

                            <button
                                style={{ opacity: isFullOpacity ? "1" : "0.3" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setInitialData(query(collection(db, user.uid), orderBy("id", "desc")));
                                    setIsFullOpacity(true);
                                }}
                            >Newest first</button>

                            <button
                                style={{ opacity: isFullOpacity ? "0.3" : "1" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setInitialData(query(collection(db, user.uid), orderBy("id", "asc")));
                                    setIsFullOpacity(false);
                                }}
                            >Oldest first</button>

                        </>

                    )}

                    <select
                        value={selectValue}
                        onChange={(eo) => {
                            if (eo.target.value === "All Tasks") {
                                setInitialData(query(collection(db, user.uid), orderBy("id", "asc")));
                                setSelectValue("All Tasks");
                                setIsFullOpacity(false);
                            } else if (eo.target.value === "Completed") {
                                setInitialData(query(collection(db, user.uid), where("completed", "==", true)));
                                setSelectValue("Completed");
                            } else if (eo.target.value === "Not Completed") {
                                setInitialData(query(collection(db, user.uid), where("completed", "==", false)));
                                setSelectValue("Not Completed");
                            }
                        }}
                    >
                        <option value="All Tasks"> All Tasks </option>

                        <option value="Completed"> Completed </option>

                        <option value="Not Completed"> Not Completed </option>

                    </select>

                </section>

                {/* SHOW all tasks */}

                <section className="all-tasks flex mt">

                    {value.docs.length === 0 && (
                        <h1>Congratulations! You have completed your tasks ♥</h1>
                    )}

                    {value.docs.map((item) => {
                        return (
                            <article dir="auto" className="one-task" key={item.data().id}>
                                <Link to={`/edit-task/${item.data().id}`} className='task-link'>
                                    <h2>{item.data().title}</h2>
                                    <ul>
                                        {item.data().subtasks.map((item, index) => {
                                            if (index < 2) {
                                                return (
                                                    <li key={item}>{item}</li>
                                                )
                                            } else {
                                                return false;
                                            }
                                        })}
                                    </ul>
                                    <p className="time">
                                        <Moment fromNow date={item.data().id} />
                                    </p>
                                </Link>
                            </article>
                        )
                    })}

                </section>

            </>

        )

    }

    // --------------------------------------------------------------------- //
}

export default AllTasksSection;
