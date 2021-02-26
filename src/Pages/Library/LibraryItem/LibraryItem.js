import React,{Fragment} from "react";
import TruncateMarkup from "react-truncate";
import {FaPlay} from "react-icons/fa";

const LibraryItem =(props)=>{
    const {imageUrl, name, owner} = props;
    return(
        <Fragment>
            <div  className="library_item flex-column">
                <img className="library_item_img" src={imageUrl} alt={name} />
                <h5><TruncateMarkup line={1} ellipsis="..">{name}</TruncateMarkup></h5>
                <small><TruncateMarkup line={1} ellipsis="..">{owner}</TruncateMarkup></small>
                <div className="play_btn flex-column">
                        <FaPlay />
                </div>
            </div>
        </Fragment>
    )
}
export default LibraryItem;