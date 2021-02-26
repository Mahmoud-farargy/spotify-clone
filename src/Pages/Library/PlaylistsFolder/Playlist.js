import React,{Fragment, useContext,useEffect, useState} from "react";
import "./Playlist.css";
import {AiTwotoneHeart} from "react-icons/ai";
import {FaPlay,FaPause} from "react-icons/fa";
import {AppContext} from "../../../Context";
import {BiTime} from "react-icons/bi";
import  Header from "../../../Components/Player/Header/Header";
import Song from "../../../Components/Song/Song";
import TruncateMarkup from "react-truncate";
// import Loading from "../../../Components/Loading/Loading";

const Body =(props)=>{
    const context = useContext(AppContext);
    let [currentClr, setCurrentClr]  = useState("rgb(113, 202, 86)");
    useEffect(()=>{
        setCurrentClr(`rgb(${randomNum()},${randomNum()}, ${randomNum()})`);
    },[]);
    const {currentPlaylist, songPlaying, isSongPlaying, playingSong, formatNums} = context;

    
    const randomNum=()=>{
        return Math.floor((Math.random() * 190) +1);
    }
    console.log(currentPlaylist.followers?.total);

    return(
        <Fragment>
            
                <section className="body">
                    <div className="face-front" style={{backgroundColor:`${currentClr}`}}>
                        {/* user info section */}
                        

                            <Header context={context} />
                        <div className="user-inner-container">
                            <div className="playlist_interface flex-row">
                                {currentPlaylist && currentPlaylist.images ? <img src={isSongPlaying ? songPlaying?.image  : currentPlaylist.images[0]?.url} alt={currentPlaylist.name+ "song"} className="playlist_user_img"/>: null}
                                <div className="playlist_info">
                                    <strong>Playlist</strong>
                                    <h2><TruncateMarkup>{currentPlaylist.name ? currentPlaylist.name : "Discover weekly"}</TruncateMarkup></h2>
                                    { !currentPlaylist ? 
                                    <p>Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.
                                        Updates every Monday.</p>
                                    : null
                                    }
                                    <h6>{currentPlaylist.owner ? currentPlaylist.owner?.display_name : "Spotify"}</h6>{currentPlaylist.tracks ? <span>{currentPlaylist.tracks?.total} songs</span> : null}
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    {/* songs section */}
                    
                    <div className="songs_section">
                        <div className="backlayer" style={{
                            background:`linear-gradient(${currentClr},rgba(17,17,17,0.9) 100% )`
                        }}></div>
                        <div className="songs_upper_deck_controls flex-row">
                            <div className="flex-row">
                                <div className="play_btn flex-column" onClick={()=> songPlaying.previewUrl ? playingSong( songPlaying.previewUrl ? songPlaying.previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3","button", songPlaying?.id) : null }>
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


                            <span className="flex-column followers_count">
                                <h6>Followers</h6>
                                <p>{formatNums(Number(currentPlaylist.followers?.total))}</p>
                            </span>
                        </div>
                        <ul className="songs_list flex-column">
                            <div className="flex-row song-upper-row">
                                <span className="song-upper-row-1 flex-row">
                                    <p className="mr-4">#</p>
                                    <p> title</p>
                                </span>
                                <span className="song-upper-row-2"> 
                                    <p> album</p>
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
                                { 
                                    currentPlaylist.tracks?.items.map((item, i)=>{
                                        return(<Song key={i+ item?.track.id} spotifyLink={"item.."}  id={item?.track.id} index={i} context={context} image={item.track?.album?.images[0]?.url} albumName={item.track?.album?.name} dateAdded={item?.added_at} songIndex={i+1} title={item.track.name}  artist={item.track?.album?.artists[0]?.name} duration={item.track?.duration_ms} previewUrl={item?.track?.preview_url} />)
                                    })
                                }
                            </div>
                        </ul>
                        
                    </div>

                </section>
        </Fragment>
    )
}
export default Body;