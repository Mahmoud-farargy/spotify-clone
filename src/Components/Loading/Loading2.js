import React from "react";
import Auxiliary from "../HOC/Auxiliary";
import loadingImg from "./loading.gif";

const Loading2 = (props)=>{
    return(
        <Auxiliary>
            <div className="loading_container2 flex-column">
                    <img src={loadingImg} alt="loading..." />
            </div>
        </Auxiliary>
    )
}
export default Loading2;