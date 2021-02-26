import React ,{useContext, useEffect, useState}from "react";
import {withRouter} from "react-router-dom";
import Auxiliray  from "../../Components/HOC/Auxiliary";
import "./UserProfile.css";
import {AppContext} from "../../Context";
import {Avatar} from "@material-ui/core";
import TruncateMarkup from "react-truncate";
import {SiSpotify} from "react-icons/si";
import Loading from "../../Components/Loading/Loading";
import {HiRefresh} from "react-icons/hi";
import Header2 from "../../Components/Player/Header/Header2";

const UserProfile=(props)=>{
    const [isItLoading, changeLoadingState] =  useState(true);

    const context = useContext(AppContext);
    const {user, playlists,loadCurrPlaybackState, spotify, currPlaybackState, playingSong, convertToTime,getPlaylist } = context;

    
    const receiveCurrentPlaybackState=()=>{
        spotify.getMyCurrentPlaybackState().then( currData=>{
            loadCurrPlaybackState({playbackData: currData});
            changeLoadingState(false);
        })
    }

    useEffect(()=>{
        changeLoadingState(true);
        receiveCurrentPlaybackState();
    },[]);
    
    return(
        <Auxiliray>
            {
                isItLoading ?
                <Loading />
                :
            <section id="user_profile_container" className="desktop_comp">
                <div className="face-front">
                    <Header2 context={context} />
                    <div className="user-info-section flex-column"> 
                        <div className="playlist_interface flex-row">
                                
                        <div className="avatar_container">
                            { user && user.images ? <Avatar src={user.images[0]?.url} alt="avatar" className="user_avatar"/> : null }
                        </div>
                        
                            <div className="playlist_info">
                                <strong >Profile</strong>
                                <h2><TruncateMarkup line={1} ellipsis="..">{user.display_name ? user.display_name : "User is not identified"}</TruncateMarkup></h2>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* categories section */}
                    
                    <div className="songs_section">
                        <div className="backlayer"></div>
                            <div className="songs_upper_deck_controls">
                                <div className="flex-column">
                                <div className="profile_middle-deck flex-row">
                                    <span className="flex-row spotify-link">
                                        <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer"><SiSpotify/></a>
                                    </span>
                                    <div onClick={()=> props.history.push("/library")} className="profile_playlists_count flex-column">
                                        <span>{playlists.total}</span>
                                        <h5 >Playlists</h5>
                                    </div>
                                    <div className="profile_followers_count flex-column">
                                        <span>{user.followers.total}</span>
                                        <h5 >Followers</h5>
                                    </div>
                                
                                </div>
                                
                            </div>
                            <small className="user_id_profile">ID: {user.id}</small>
                            <div className="profile_body">
                                <h4 className="site-titles">Public playlists</h4>
                                    <div className="profile-playlist-list flex-column">
                                        {
                                            playlists.items?.slice(0,5).map((playlist, i )=>{
                                                return(
                                                    <div key={i+ playlist.id} onClick={()=> getPlaylist(playlist.id, props.history )} className="playlist_profile_container flex-row">
                                                            <img src={playlist.images[0]?.url} alt={playlist?.name} />
                                                            <div className="flex-column">
                                                                <h6><TruncateMarkup line={1} ellipsis="...">{playlist?.name}</TruncateMarkup></h6>
                                                                <p><TruncateMarkup line={1} ellipsis="...">{playlist?.description  ? playlist?.description : "By"+ playlist?.owner?.display_name}</TruncateMarkup></p>
                                                            </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="curr-song-row flex-row mb-3">
                                        <h4>Currently playing song on Spotify</h4>
                                        <button className="refresh-btn" onClick={()=> receiveCurrentPlaybackState()} ><HiRefresh  /></button>
                                    </div>
                                    
                                    
                                    
                                    <p>Is Spotify connected: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData !== {} &&  currPlaybackState.playbackData?.device?.is_active ? "Yes":"No"}</span></p>
                                    {currPlaybackState.playbackData ? <p>Currently Playing Type: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.currently_playing_type}</span></p> : null}
                                    {currPlaybackState.playbackData ? <p>Device Connected: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.device?.name} {currPlaybackState.playbackData?.device?.type} </span></p> : null}
                                    {currPlaybackState.playbackData ? <p>Current Sound Volume Level: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.device?.volume_percent}%</span></p> : null}
                                    {currPlaybackState.playbackData ? <p>Song State: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.is_playing ? "Playing" : "Paused" }</span></p> : null}
                                    {currPlaybackState.playbackData ? <p>Repeat State: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.repeat_state? "Yes" : "No" }</span></p> : null}
                                    {currPlaybackState.playbackData ? <p>Shuffle State: <span style={{color:"var(--gray)"}}>{currPlaybackState.playbackData?.shuffle_state? "Yes" : "No" }</span></p> : null}
                                    {currPlaybackState.playbackData &&  currPlaybackState.playbackData?.currently_playing_type === "track" ?
                                    <div className="curr_song flex-row" onClick={()=> currPlaybackState.playbackData.item?.preview_url ? playingSong( currPlaybackState.playbackData.item?.preview_url ? currPlaybackState.playbackData.item?.preview_url : null,"button", currPlaybackState.playbackData.item?.id ) : null}>
                                        <img className="song-pt1" src={currPlaybackState.playbackData.item?.album?.images[0]?.url} alt={currPlaybackState.name}  />
                                        <div className="song-pt2 flex-column">
                                            <h6><TruncateMarkup line={1} ellipsis="..">{currPlaybackState.playbackData.item?.name}</TruncateMarkup></h6>
                                            <p><TruncateMarkup line={1} ellipsis="..">{currPlaybackState.playbackData.item?.artists[0]?.name}</TruncateMarkup></p>
                                        </div>
                                        <p className="song-pt3"><TruncateMarkup line={1} ellipsis="..">{currPlaybackState.playbackData?.item?.album?.name}</TruncateMarkup></p>
                                        <a className="song-pt4" rel="noopener noreferrer" href={currPlaybackState.playbackData?.item?.external_urls?.spotify} target="_blank"><SiSpotify/></a>
                                        <p className="song-pt5">{convertToTime(currPlaybackState.playbackData?.item?.duration_ms)}</p>

                                    </div>
                                    : null}
                                </div>
                            
                        </div>
                        
                    </div>
                </section>

            }
           
        </Auxiliray>
    )
}
export default withRouter(UserProfile);