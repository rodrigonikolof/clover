import React, {useState} from "react";
import { useParams } from "react-router-dom";

export default function SingleClient({client}){
    const params = useParams()
   console.log(params)

    return(
        <>
            <h2>Single Client Page </h2>
        </>
    )
}