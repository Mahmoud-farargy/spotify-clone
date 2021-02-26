import React, {Fragment} from "react";
import TruncateMarkup from "react-truncate";
import {FaPlay}  from "react-icons/fa";

const ArtistItem=(props)=>{
    const {artist} = props;
    return(
        <Fragment>
            <div  className="library_item flex-column">
                    <img className="library_item_img rounded-circle" src={artist?.images[2]?.url} alt={artist?.name} />
                    <h5><TruncateMarkup>{artist?.name}</TruncateMarkup></h5>
                    <small><TruncateMarkup>{artist.followers ? artist.followers?.total +  "followers" : null }</TruncateMarkup></small>
                    <div className="play_btn flex-column">
                            <FaPlay />
                    </div>
             </div>
        </Fragment>
    )
}

export default ArtistItem;