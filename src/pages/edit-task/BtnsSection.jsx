import React from 'react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const BtnsSection = ({ user, stringId, deleteBtn }) => {

    const [value, loading, error] = useCollection(collection(db, user.uid));

    if(value){
        return (
            <section className="center mt">
                <button className="delete" onClick={()=>{
                    deleteBtn();
                }}>Delete task</button>
            </section>
        )
    }
}

export default BtnsSection
