import React, {Fragment, useEffect} from "react";
import {Avatar} from "@material-ui/core";
import {Link} from "react-router-dom";
import TruncateMarkup from "react-truncate";
import $ from "jquery";


const PlaylistsNav =(props)=>{
    useEffect(()=>{
        $(document).ready(()=>{
                $("#libraryNav li").on("click", function(){
                    
                    $("#libraryNav li").each((i, item)=>{
                        $(item).removeClass("active-library-link");
                    })
                    $(this).addClass("active-library-link");
                }); 
                $("#libraryMobile li").on("click", function(){
                    
                    $("#libraryMobile li").each((i, item)=>{
                        $(item).removeClass("active-library-link");
                    })
                    $(this).addClass("active-library-link");
                });   
            })
    },[])
    
    
    const {user} = props; 
    return(
        <Fragment>
            <div className="playlist_nav flex-row w-100">
                <ul  id="libraryNav">
                    <li className="active-library-link" onClick={()=> props.changeListSelection("playlists")}>Playlists</li>
                    <li onClick={()=> props.changeListSelection("topTracks")}>My Top Tracks</li>
                    <li onClick={()=> props.changeListSelection("recentlyPlayed")}>Recently Played</li>
                    <li onClick={()=> props.changeListSelection("artists")} >My Top Artists</li>
                </ul>
                <ul  id="libraryMobile" className="mobile-only">
                    <li className="active-library-link" onClick={()=> props.changeListSelection("playlists")}>Playlists</li>
                    <li onClick={()=> props.changeListSelection("topTracks")}>Tracks</li>
                    <li onClick={()=> props.changeListSelection("recentlyPlayed")}>Recent</li>
                </ul>
                <Link to="/profile" className="flex-row user_info">
                        { user && user.images ? <Avatar src={user.images[0]?.url} alt="avatar" className="user_avatar"/> : null }
                        <strong className="user_name"><TruncateMarkup line={1} ellipsis="...">{user?.display_name}</TruncateMarkup></strong>
                </Link>
            </div>
        </Fragment>
    )
}

export default PlaylistsNav;