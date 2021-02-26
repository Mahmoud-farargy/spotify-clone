import  React ,{useContext, Fragment, useEffect, useState} from "react";
import "../Library/PlaylistsFolder/Playlist.css";
import {AiTwotoneHeart} from "react-icons/ai";
import {FaPlay,FaPause} from "react-icons/fa";
import {AppContext} from "../../Context";
import {BiTime} from "react-icons/bi";
import  Header from "../../Components/Player/Header/Header";
import Song from "../../Components/Song/Song";
import {SiSpotify} from "react-icons/si";

import TruncateMarkup from "react-truncate";

const Album =(props)=>{
        const context = useContext(AppContext);
        const {newAlbum, songPlaying, isSongPlaying, playingSong} = context;
        const [duration, durationOutput] = useState(0);

        useEffect(()=>{
            //converts milliseconds to minutes and seconds
            let minutes = Math.floor(newAlbum?.duration_ms / 60000);
            let seconds = ((newAlbum?.duration_ms % 60000) / 1000).toFixed(0);
            durationOutput(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
        },[]);
        return(
            <Fragment>
            <section className="body">
                <div className="face-front">
                    {/* user info section */}
                    <div className="user-info-section">

                        <Header context={context} />
                            
                        <div className="playlist_interface flex-row">
                            {newAlbum && newAlbum.images ? <img src={isSongPlaying ? songPlaying?.image  : newAlbum.images[0].url} alt={newAlbum.name+ "song"} className="playlist_user_img"/>: null}
                            <div className="playlist_info">
                                <strong style={{textTransform: "capitalize"}}>{newAlbum.album_type}</strong>
                                <h2 title={newAlbum.name}><TruncateMarkup>{newAlbum.name ? newAlbum.name : "Discover weekly"}</TruncateMarkup></h2>
                                { !newAlbum ? 
                                <p>Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you.
                                    Updates every Monday.</p>
                                : null
                                }
                                <h6>{newAlbum.artists ? newAlbum.artists[0]?.name : "Spotify"}</h6>{newAlbum.total_tracks ? <span>{newAlbum.total_tracks} songs</span> : null}
                            </div>
                        </div>
                    </div>
                </div>
                {/* songs section */}
                
                <div className="songs_section">
                    <div className="backlayer"></div>
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

                        <span className="flex-row spotify-link">
                                <a rel="noopener noreferrer" href={newAlbum.external_urls.spotify} target="_blank"><SiSpotify/></a>
                        </span>

                        {
                            newAlbum.duration_ms?
                            <span className="flex-row followers_count">
                                <p>{duration}</p>
                                <h6>Total Time</h6>
                            </span>
                            : null
                        }
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
                                newAlbum.tracks?.items?.map((item, i)=>{
                                    return(<Song key={i+ item?.id}  id={item?.id} index={i} context={context} image={newAlbum.images[0].url} albumName={newAlbum?.name} dateAdded={newAlbum?.release_date} songIndex={i+1} title={item.name}  artist={item.artists[0]?.name} duration={item?.duration_ms} previewUrl={item?.preview_url} />)
                                })
                            }
                        </div>
                    </ul>
                    
                </div>

            </section>
            
        </Fragment>
        )
}

export default Album;