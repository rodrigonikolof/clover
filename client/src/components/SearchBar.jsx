import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({setSearchInput}){

    const handleSearchInput = (e)=>{
        setSearchInput(e.target.value.toLowerCase())
    }

    return(
    <>

        <TextField
        id="filled-search"
        label="Search"
        type="search"
        variant="filled"
        fullWidth
        onChange={handleSearchInput}
        color="success"
        />  
        

    </>
    )
}