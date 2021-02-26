import React from "react";
import Auxiliary from "../HOC/Auxiliary";
import loadingImg from "./loading4.gif";

const Loading = (props)=>{
    return(
        <Auxiliary>
            <div className="loading_container">
                    <img src={loadingImg} alt="loading..." />
            </div>
        </Auxiliary>
    )
}
export default Loading;