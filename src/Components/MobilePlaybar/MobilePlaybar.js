import React, {useContext} from "react";
import Auxiliary  from "../HOC/Auxiliary";
import "./MobilePlaybar.css";
import {BiPlayCircle, BiPauseCircle} from "react-icons/bi";
import {HiVolumeUp} from "react-icons/hi";
import TruncateMarkup from "react-truncate";
import {Slider, Grid} from "@material-ui/core";
import {AppContext} from "../../Context";
import {AiTwotoneHeart} from "react-icons/ai";

const MobilePlaybar =(props)=>{
    let context  = useContext(AppContext);
    let {songPlaying, playingSong, isSongPlaying , currentPlaylist, playerCurrInfo ,audioVolume, setVolume} = context;
    let {progressPercent} = playerCurrInfo;
    return(
        <Auxiliary>
        {/* title,artist, duration, previewUrl, songIndex, dateAdded, albumName, handleSongPlaying */}
            <section className="mobile_playbar flex-row">
                <div className="progress">
                    <div style={{width: `${progressPercent}%`}} className="progressBar"></div>
                </div>
                    <div className="playbar flex-row">
                        <div className="playbar_info flex-row">
                              <img className={ isSongPlaying && progressPercent >=1  ? "rounded-circle rotateImage song_img" : "rounded-circle song_img"} src={songPlaying?.image} alt={songPlaying.title} draggable="false"/>
                            <div className="song_info flex-column">
                                <h4 title={songPlaying.title}> <TruncateMarkup line={1} ellipsis="...">{songPlaying.title ? songPlaying.title : "No Song is playing" } </TruncateMarkup></h4>
                                <p><TruncateMarkup line={1} ellipsis="..." >{songPlaying.artist ?  songPlaying.artist : "..." } </TruncateMarkup></p>
                            </div>
                            
                        </div>
                        <div className="flex-row player-mobile">
                            
                            <div className="playbar_volume flex-row">
                                
                                <div className="flex-row playbar_volume_inner" >
                                <Grid>
                                    <AiTwotoneHeart className="like_btn" />
                                </Grid>
                                <Grid>
                                            <Slider defaultValue={audioVolume} onChange={(e, val)=> setVolume(e,val)} className="volume_slider" />
                                </Grid> 
                                    <Grid>
                                        
                                            <HiVolumeUp className="volume-down-icon mr-4"/>
                                    </Grid>
                                    {/* <Grid item xs>
                                        <Slider defaultValue={audioVolume} onChange={(e, val)=> setVolume(e,val)} className="volume_slider" />
                                    </Grid>  */}
                                </div>
                                 <div onClick={()=> songPlaying.previewUrl ? playingSong( songPlaying.previewUrl ? songPlaying.previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3","button", songPlaying.id) : null} >
                                        { !isSongPlaying ?
                                            <BiPlayCircle title="Play" className="playIcon play-middle"/>
                                            : 
                                            <BiPauseCircle className="playIcon play-middle"/>
                                        }
                                </div>
                                
                            </div>
                           
                        </div>
                        
                       
                    </div>
            </section>
        </Auxiliary>
    )
}

export default MobilePlaybar;