import React ,{PureComponent, Fragment} from "react";
import "../../../Pages/Library/PlaylistsFolder/Playlist.css";
import TruncateMarkup from "react-truncate";
import {Avatar} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";

class Header extends PureComponent{   
    render(){
        const {user}= this.props.context;
        return(
            <Fragment>
                <div className="body_upper_row">
                        <div className="flex-row header_inner">
                            <div>
                                <button className="redirect-btn" onClick={()=> this.props.history.goBack()}><IoIosArrowBack/></button>
                                <button className="redirect-btn" onClick={()=> this.props.history.goForward()}><IoIosArrowForward/></button> 
                            </div>
                       
                            <Link to="/profile" className="flex-row user_info ml-2">
                                { user && user.images ? <Avatar src={user.images[0]?.url} alt="avatar" className="user_avatar"/> : null }
                                <strong className="user_name"><TruncateMarkup line={1} ellipsis="...">{user?.display_name}</TruncateMarkup></strong>
                            </Link>
                        </div>
                        
                </div>
            </Fragment>
        )
    }
    
}

export default withRouter(Header);