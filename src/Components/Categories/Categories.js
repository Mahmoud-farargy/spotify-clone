import React,{Fragment} from "react";
import "./Categories.css";
import {withRouter} from "react-router-dom";

const Categories =(props)=>{
    const {icon, name, id, getCategory} = props;
    const switchToCategory=()=>{
        getCategory({id: id ,name: name, history: props.history});
    }
    return(
        <Fragment>
            <div className="categories_item" onClick={()=> switchToCategory()}>
                <img className="categories_item_img" src={icon} alt={name} />
                <h4 className="categories_item_name">{name}</h4>
            </div>
        </Fragment>
    )
}

export default withRouter(Categories);