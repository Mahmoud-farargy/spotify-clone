import React,{Fragment} from "react";
import TruncateMarkup from "react-truncate";

const ItemMobile =(props)=>{
    const {imageUrl, name, owner} = props;
    return(
        <Fragment>
            <div  className="mobile-item flex-row mobile-only">
                <img className="mobile_item_img" src={imageUrl} alt={name} />
                <div className="flex-column mobile-item-column">
                    <h5><TruncateMarkup line={1} ellipsis="..">{name}</TruncateMarkup></h5>
                    <small><TruncateMarkup line={1} ellipsis="..">{owner}</TruncateMarkup></small>
                </div>
               
            </div>
        </Fragment>
    )
}
export default ItemMobile;