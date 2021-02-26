import React ,{useContext}from "react";
import Auxiliary from "../../Components/HOC/Auxiliary";
// import "./Playlist.css";
import {AiTwotoneHeart} from "react-icons/ai";
import {FaPlay,FaPause} from "react-icons/fa";
import {AppContext} from "../../Context";
import {BiTime} from "react-icons/bi";
import  Header from "../../Components/Player/Header/Header";
import Song from "../../Components/Song/Song";
import TruncateMarkup from 'react-truncate';
import "../Library/PlaylistsFolder/Playlist.css";
import  "./SingleTrack.css";

const SingleTrack = (props)=>{
    const context = useContext(AppContext);
    const {singleSong, songPlaying, isSongPlaying, playingSong, } = context;
    return(
        <Auxiliary>
           {
               singleSong !== {}?
           <section id="single_track_container" className="body ">
                <div className="face-front">
                {/* user info section */}
                <div className="user-info-section">

                    <Header context={context} />
                            
                        <div className="playlist_interface flex-row">
                            {singleSong && singleSong.album ? <img  src={singleSong.album.images[0]?.url} alt={singleSong.name} className="playlist_user_img" /> : null}
                            <div className="playlist_info">
                                <strong >Single</strong>
                                <h2><TruncateMarkup line={1} ellipsis="..">{singleSong.name ? singleSong.name : "Discover weekly"}</TruncateMarkup></h2>
                                { !singleSong ? 
                                <p>Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.
                                    Updates every Monday.</p>
                                : null
                                }
                                <h6>{singleSong.artists ? singleSong.artists[0].name: "Spotify"}</h6>{singleSong.track ? <span>1 song </span> : null}
                            </div>
                        </div>
                    </div>
                </div>
                {/* songs section */}
                
                <div className="songs_section">
                    <div className="backlayer"></div>
                    <div className="songs_upper_deck_controls flex-row">
                        <div className="flex-row">
                            <div className="play_btn flex-column" onClick={()=> songPlaying.previewUrl ? playingSong( songPlaying.previewUrl ? songPlaying.previewUrl : singleSong?.tracks?.items[0]?.track?.preview_url,"button", songPlaying.id ? songPlaying.id : singleSong?.tracks?.items[0]?.track?.id ) : null}>
                                {
                                    !isSongPlaying ?
                                        <FaPlay />
                                    :
                                    <FaPause />
                                } 
                            </div>
                            <AiTwotoneHeart className="like_btn" />
                            <h3 className="options_btn">...</h3>
                        </div>
                    </div>
                    <ul className="songs_list flex-column">
                        <div className="flex-row song-upper-row">
                            <span className="song-upper-row-1 flex-row">
                                <p className="mr-4">#</p>
                                <p> title</p>
                            </span>

                            <span className="song-upper-row-2"> 
                                <p> Album</p>
                            </span>

                            <span className="song-upper-row-3"> 
                                <p> Date Added</p>
                            </span>
                            <span className="song-upper-row-4"> 
                                <p><BiTime /></p>
                            </span>
                        </div>
                        <hr className="song-list-hr"/>
                        <div className="main-songs-container">
                            <Song image={singleSong.album?.images[0]?.url} id={singleSong.id} index="0" context={context} albumName={singleSong.album?.name} dateAdded={singleSong.album?.release_date} songIndex={1} title={singleSong.name}  artist={singleSong.artists? singleSong.artists[0].name:null} duration={singleSong.duration_ms} previewUrl={singleSong?.preview_url} />
                        </div>
                    </ul>
                    
                </div>

            </section>
            :
            <h4>Loading..</h4>
            } 

        </Auxiliary>
    )
}

export default SingleTrack;