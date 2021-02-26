import React,{Fragment,Component} from "react";
import "../Sidebar.css";
import {NavLink} from "react-router-dom";
class SidebarOption extends Component{
    render(){
        const {title, Icon, link} =this.props;
            return(
            <Fragment>
                <NavLink exact to={link} className="sidebar_menu_item flex-row" id="test">
                        {
                            Icon
                            ?
                            <Icon className="icon" />
                            : null
                        }
                        
                        <h5>{title}</h5>
                </NavLink>
            </Fragment>
        )
    }
    
}

export default SidebarOption;