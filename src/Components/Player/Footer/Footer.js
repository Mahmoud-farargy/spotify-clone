import React, {useContext, useState} from "react";
import Auxiliary  from "../../HOC/Auxiliary";
import "./Footer.css";
import {CgPlayTrackPrev, CgPlayTrackNext, CgPlayList} from "react-icons/cg";
import {BiPlayCircle, BiShuffle, BiPauseCircle} from "react-icons/bi";
import {HiVolumeOff} from "react-icons/hi";
import {ImVolumeMedium, ImVolumeHigh} from "react-icons/im";
import {FiRepeat} from "react-icons/fi";
import TruncateMarkup from "react-truncate";
import {Slider, Grid} from "@material-ui/core";
import {AppContext} from "../../../Context";
import bufferingImg from "../../../Components/Loading/loading5.gif";


const Footer =(props)=>{
    const [currVol, setCurrVol] = useState(100);
    let context  = useContext(AppContext);
    let {songPlaying, playingSong, isSongPlaying , songMovement, currentPlaylist, playerCurrInfo ,audioVolume, isBuffering, setProgress, setVolume} = context;
    let {progressPercent, currTime}= playerCurrInfo;
    return(
        <Auxiliary>
        {/* title,artist, duration, previewUrl, songIndex, dateAdded, albumName, handleSongPlaying */}
            <section className="footer flex-row">
                    <div className="playbar flex-row">
                        <div className="playbar_info flex-row">
                              <img className={ isSongPlaying && progressPercent >=1  ? "rounded-circle rotateImage song_img" : "rounded-circle song_img"} src={songPlaying?.image} alt={songPlaying.title} draggable="false"/>
                            <div className="song_info flex-column">
                                <h4 title={songPlaying.title}> <TruncateMarkup line={1} ellipsis="...">{songPlaying.title ? songPlaying.title : "No Song is playing" } </TruncateMarkup></h4>
                                <p><TruncateMarkup line={1} ellipsis="..." >{songPlaying.artist ?  songPlaying.artist : "..." } </TruncateMarkup></p>
                            </div>
                            
                        </div>
                        <div className="playbar_controls flex-column">
                            <div className="flex-row playbar_controls_inner">
                                <BiShuffle className="play-shuffle-icon playIcon" />
                                <CgPlayTrackPrev title="Previous" className="playIcon" onClick={()=> songMovement("prev")} />
                                <div onClick={()=> songPlaying.previewUrl ? playingSong( songPlaying.previewUrl ? songPlaying.previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3","button", songPlaying.id) : null} >
                                    { !isSongPlaying ?
                                    <div className="display-play-btn">
                                            <BiPlayCircle title="Play" className="playIcon play-middle"/>
                                            {isBuffering && progressPercent < 1  ? <img src={bufferingImg} className="buffer"  alt="buffering.." /> : null }
                                    </div>
                                       
                                        : 
                                        <BiPauseCircle className="playIcon play-middle"/>
                                    }
                                </div>
                                
                                <CgPlayTrackNext title="Next" onClick={()=> songMovement("next")} className="playIcon"/>
                                <FiRepeat className="play-repeat-icon playIcon" />
                            </div>
                            <div className="flex-row progress_container" onClick={(e)=> setProgress(e)}>
                                <p>{currTime}</p>
                                <div className="progress">
                                    <div style={{width: `${progressPercent}%`}} className="progressBar"></div>
                                </div>
                                <p>0:30</p>
                            </div>

                                
                        </div>
                        <div className="playbar_volume flex-row">
                            <div className="flex-row playbar_volume_inner">
                               <Grid item>
                                <CgPlayList className="playlist-play-icon" />
                                </Grid>
                                <Grid item>
                                    {
                                        currVol < 1 ?
                                        <HiVolumeOff className="volume-down-icon mr-4"/>
                                        : currVol >= 1 && currVol <70 ?
                                        <ImVolumeMedium className="volume-down-icon mr-4"/>
                                        :
                                        <ImVolumeHigh className="volume-down-icon mr-4"/>
                                    }
                                        
                                </Grid>
                                <Grid item xs>
                                    <Slider defaultValue={audioVolume} onChange={(e, val)=> {setVolume(e,val); setCurrVol(val)}} className="volume_slider" />
                                </Grid> 
                            </div>
                            
                            
                        </div>
                    </div>
            </section>
        </Auxiliary>
    )
}

export default Footer;