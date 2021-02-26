import React, {Fragment} from "react";
import {HiHome} from "react-icons/hi";
import {ImSearch} from "react-icons/im";
import {MdLibraryMusic} from "react-icons/md";
import {ImProfile} from "react-icons/im";
import {NavLink} from "react-router-dom";


const MobileBottomNav =(props)=>{
    return(
        <Fragment>
            <footer className="mobile_nav_container flex-row">
                <NavLink exact to="/" className="bottom-nav-1">
                    <span><HiHome /></span>
                    <h6>Home</h6>
                </NavLink>
                <NavLink exact to="/search" className="bottom-nav-2">
                    <span><ImSearch /></span>
                    <h6>search</h6>
                </NavLink>
                <NavLink exact to="/library" className="bottom-nav-3">
                    <span><MdLibraryMusic  /></span>
                    <h6>playlists</h6>
                </NavLink>
                <NavLink exact to="/profile" className="bottom-nav-4">
                    <span><ImProfile /></span>
                    <h6>profile</h6>
                </NavLink>

            </footer>
        </Fragment>
    )
}

export default MobileBottomNav;