import React from "react";

function Company(status){

    return(
        <>{
            status? <h1>Company work</h1> : <></>
        }</>
    )
}

export default Company