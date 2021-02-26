import React ,{Fragment, PureComponent} from "react";
import {MdMusicNote} from "react-icons/md";
import "./Song.css";
import "../../Pages/Library/PlaylistsFolder/Playlist.css";
import TruncateMarkup from "react-truncate";
import $ from "jquery";
import {AppContext} from "../../Context";

class Song extends PureComponent{ 
    static contextType = AppContext;
    
    componentDidMount=()=>{
        // const context =  this.context;
        
            $(document).ready(()=>{
               
                $(".song_item").on("click", function(){
                    $(".song_item").each((i, item)=>{
                        $(item).removeClass("active-clicked");
                    }) 
                    $(this).addClass("active-clicked");
                })
                // $(".song_item").each((i,item)=>{
                //     $(item).removeClass("active-clicked");
                //     console.log(item);
                //     if(title === context.songPlaying?.title){
                //         console.log("matched");
                //         $(item).addClass("active-clicked");
                //     }
                // })
            });
            
    };

    render(){
        const {convertToTime} = this.context;
        const {title,artist, duration, previewUrl, songIndex, dateAdded, context, albumName, id} = this.props;
        // console.log(spotifyLink);

        const playSong= ()=>{
            console.log(previewUrl);
            // context.changeSongNumber(songIndex);
            context.playingSong(previewUrl ?  previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3","listItem", id);
        }    
           
        
        return(
            <Fragment>
                <li className="song_row flex-row">
                        <MdMusicNote className="song_icon"/>
                        
                        <div onClick={()=> playSong()} className="song_item flex-row">
                            <span className="song-index">{songIndex} </span>
                            <div className="song-name song-upper-row-1">
                                    <h5 id="songName"><TruncateMarkup line={1} ellipsis="..">{title}</TruncateMarkup></h5>
                                    <p><TruncateMarkup line={1} ellipsis="..">{artist} - {title} </TruncateMarkup></p>
                            </div>
                            <span className="song-upper-row-2">
                                {albumName}
                            </span>
                            <span className="song-upper-row-3">
                                {dateAdded}
                            </span>
                            <span className="song_duration song-upper-row-4">
                                {convertToTime(duration)}
                            </span>
                        </div>
                        
                </li>
            </Fragment>
        )
    }
    
}

export default Song;