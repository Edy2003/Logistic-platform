import React from "react";

function Consignor(status){

    return(
        <>{
            status? <h1>Consignor work</h1> : <></>
        }</>
    )
}

export default Consignor