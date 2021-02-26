import React,{Fragment, Component} from "react";
import {AppContext} from "../../Context";
import "./Artist.css";
import TruncateMarkup from 'react-truncate';
import SpotifyWebApi from "spotify-web-api-js";


class Artist extends Component{
    state={
        showFullSongs: false
    }
    static contextType = AppContext;
    
    componentDidMount=()=>{
        const spotify = new SpotifyWebApi();
        const {loadArtistContent, newArtist} = this.context;
        const id = newArtist.id;
        spotify.getArtistAlbums(id, {limit:35}).then(albums=>{
            spotify.getArtistRelatedArtists(id).then(artists =>{
                spotify.getArtistTopTracks(id, "US").then(tracks =>{
                    loadArtistContent({tracks: tracks, relatedArtists: artists, albums: albums});
                })
            })
        });
    }
    toggleState(state){
        this.setState({
            ...this.state,
            [state]: !this.state[state]
        })
    }
    
    render(){
        const {newArtist, formatNums} = this.context;
    
    return(
        <Fragment>
            <section id="artist_main_container" className="desktop_comp main_library_container">
            <div className="face-front">
                 <div className="user-inner-container">                        
                    <div className="playlist_interface flex-row">
                        <img className="playlist_user_img" alt={newArtist.name} src={newArtist.images[0]?.url} />
                        <div className="playlist_info">
                            <h2><TruncateMarkup>{newArtist.name ? newArtist.name : "Discover weekly"}</TruncateMarkup></h2>
                        </div>
                    </div>
                </div>
                {
                    newArtist.followers?
                    <h4 className="artist_followers_count">{formatNums(newArtist.followers?.total)} followers</h4>
                    : null
                }
            </div>
                {/* categories section */}
                
                <div className="songs_section">
                    <div className="backlayer"></div>
                        <div className="songs_upper_deck_controls">
                        <div className="flex-row playlist-deck">
                            <h4 className="site-titles">Playlists</h4>
                            <h5 onClick={()=> this.toggleState("showFullSongs")}>{ this.state.showFullSongs ? "see less" :"see all"}</h5>
                        </div>
                    
                    <div className="library_list_container">
                            {/* {   
                                showFullPlaylists ?
                                    playlists.items?.map((playlist, index)=>{
                                        return(<div key={index + playlist.id} onClick={()=> this.handleNewPlaylist(playlist.id)}>
                                                    <Tiles  owner={`${playlist?.description} By ${playlist?.owner?.display_name}`} name={playlist?.name} imageUrl={playlist?.images[2]?.url ? playlist?.images[2]?.url : context.defaultImg}  />
                                                </div>
                                            )
                                    })
                                :
                                playlists.items?.slice(0,8).map((playlist, index)=>{
                                    return(<div key={index + playlist.id} onClick={()=> this.handleNewPlaylist(playlist.id)}>
                                                <Tiles  owner={`${playlist?.description} By ${playlist?.owner?.display_name}`} name={playlist?.name} imageUrl={playlist?.images[2]?.url ? playlist?.images[2]?.url : context.defaultImg}  />
                                            </div>
                                        )
                                })
                            } */}
                    </div>
                    </div>
                    
                </div>

            </section>
        </Fragment>
        )
    }
}

export default Artist;