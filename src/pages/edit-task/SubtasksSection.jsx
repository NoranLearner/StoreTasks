import React from 'react'

import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

import { db } from "../../firebase/config";

import Moment from "react-moment";

import { updateDoc } from "firebase/firestore";

import { arrayRemove } from "firebase/firestore";

import { useState } from 'react';

import { arrayUnion } from "firebase/firestore";

const SubtasksSection = ({ user, stringId }) => {

    // --------------------------------------------------------------------- //

    const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

    // --------------------------------------------------------------------- //

    const [showAddNewTask, setShowAddNewTask] = useState(false);

    const [newSubTask, setNewSubTask] = useState("");

    // --------------------------------------------------------------------- //

    if (value) {
        return (

            <section className="sub-task mtt">

                <div className="parent-time">
                    <p className="time">Created: <Moment fromNow date={value.data().id} /></p>
                    <div>
                        <input id="checkbox" type="checkbox" checked={value.data().completed} onChange={async (eo) => {
                            await updateDoc(doc(db, user.uid, stringId), {
                                completed: eo.target.checked,
                            });
                        }} />
                        <label htmlFor="checkbox">Completed</label>
                    </div>
                </div>

                <ul>
                    {value.data().subtasks.map((item) => {
                        return (
                            <li className="card-task flex" key={item}>
                                <p> {item} </p>
                                <i className="fa-solid fa-trash" onClick={async () => {
                                    await updateDoc(doc(db, user.uid, stringId), {
                                        subtasks: arrayRemove(item),
                                    });
                                }}></i>
                            </li>
                        )
                    })}
                </ul>

                {
                    showAddNewTask
                    &&
                    <form className='add-new-task' style={{ flexDirection:"row" }}>
                        <input type='text' className='add-task' value={newSubTask} onChange={(eo) => { setNewSubTask(eo.target.value) }}/>
                        <button className='add' onClick={ async (eo) => {
                            eo.preventDefault();
                            await updateDoc(doc(db, user.uid, stringId), {
                                subtasks: arrayUnion(newSubTask),
                            });
                            setNewSubTask("");
                        }}>Add</button>
                        <button className='cancel' onClick={(eo) => {
                            eo.preventDefault();
                            setShowAddNewTask(false);
                        }} >Cancel</button>
                    </form>
                }

                <div className="center mtt">
                    <button className="add-more-btn" onClick={(eo) => {
                        eo.preventDefault();
                        setShowAddNewTask(true);
                    }}>
                        Add more <i className="fa-solid fa-plus"></i>
                    </button>
                </div>

            </section>

        )

    }

}

export default SubtasksSection
