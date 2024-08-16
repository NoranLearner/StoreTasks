import React, { useRef } from 'react'

import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

import { db } from "../../firebase/config";

import { updateDoc } from "firebase/firestore";


import { deleteField } from "firebase/firestore";

const TitleSection = ({ user, stringId }) => {

    // --------------------------------------------------------------------- //

    const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

    // --------------------------------------------------------------------- //

    const inputElement = useRef(null);

    // --------------------------------------------------------------------- //

    if (value) {
        return (
            <section className="title center">
                <h1>
                    <input
                        style={{ textDecoration: value.data().completed? "line-through wavy #454545 2px" : "none" }}
                        defaultValue={value.data().title}
                        className="title-input center"
                        type="text"
                        ref={inputElement}
                        onChange={async (eo) => {
                            await updateDoc(doc(db, user.uid, stringId), {
                                title: eo.target.value,
                            });
                        }}
                        />
                    <i className="fa-regular fa-pen-to-square" onClick={() => {
                        inputElement.current.focus()
                    }}></i>
                </h1>
                <button className='delete' onClick={async () => {
                    await updateDoc(doc(db, user.uid, stringId), {
                        title: deleteField()
                    });
                }}>Delete Title</button>
            </section>
        )
    }
}

export default TitleSection;
