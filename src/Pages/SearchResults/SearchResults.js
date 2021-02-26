import React , {Fragment , PureComponent} from "react";
import Header from "../../Components/Player/Header/Header";
import {AppContext} from "../../Context";
import "./SearchResults.css";
import Tiles from "../Library/LibraryItem/LibraryItem";
import {withRouter} from "react-router-dom";
import TruncateMarkup from "react-truncate";
import {FaPlay}  from "react-icons/fa";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";
import {SiSpotify} from "react-icons/si";
import $ from "jquery";
import Loading from  "../../Components/Loading/Loading";

class SearchResults extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            showFullPlaylists: false,
            showFullArtists: false,
            showFullAlbums: false,
        }
    }
    componentDidMount=()=>{
        $(document).ready(()=>{
            $(".curr_song").on("click", function(){
            $(".curr_song").each((i, song)=>{
                    $(song).removeClass("active-song");
                })
                $(this).addClass("active-song");
            })
        })
        
    }
    static contextType = AppContext;
    toggleState(state){
        this.setState({
            [state]:  !this.state[state]
        })
    }
    handleNewPlaylist(id){
        let {getPlaylist} = this.context;
        getPlaylist(id, this.props.history);
    }
    handleNewAlbum(id){
        let {getAlbum} = this.context;
        getAlbum(id, this.props.history);
    }
    handleNewArtist(id){
        let {getArtist} = this.context;
        getArtist(id, this.props.history);
    }
    render(){
        const context = this.context;
        let {formatNums,convertToTime, playingSong, isItLoading} = context;
        let {playlists, artists, tracks,albums}= context.searchResults;
        const {showFullPlaylists, showFullAlbums, showFullArtists}  = this.state;
        return(
            <Fragment>
                <section id="main_search_results_container" className=" main_library_container desktop_comp">
                        
                <Header context={context} />
                {
                    isItLoading ?
                    <Loading />
                        :
                    <div>
                        {/* Songs */}
                            {}<div className="search_tracks_container">
                                <div>
                                    <h4 className="site-titles">Top Result</h4>

                                        <div  className="top_result library_item flex-column" onClick={()=> tracks?.items[0]?.preview_url ? playingSong( tracks?.items[0]?.preview_url ? tracks?.items[0]?.preview_url : null,"button", tracks?.items[0]?.id ) : null}>
                                            <img className="library_item_img" src={tracks?.items[0]?.album?.images[0]?.url} alt={tracks?.items[0]?.name} />
                                            <h5><TruncateMarkup line={1} ellipsis="..">{tracks?.items[0]?.name}</TruncateMarkup></h5>
                                            <small><TruncateMarkup line={1} ellipsis="..">By {tracks?.items[0]?.artists[0]?.name}</TruncateMarkup></small>
                                            <div className="play_btn flex-column">
                                                    <FaPlay />
                                            </div>
                                        </div>

                                </div>
                                <div>
                                    <h4 className="site-titles">Songs</h4>
                                        {
                                            tracks?.items?.slice(1,5).map( track =>{
                                                // console.log(track);
                                            return(
                                                <div className="curr_song flex-row" key={track?.id} onClick={()=> track.preview_url ? playingSong( track.preview_url ? track?.preview_url : null,"button", track?.id ) : null}>
                                                        <img className="song-pt1" src={track?.album?.images[0].url} alt={track?.name}  />
                                                        <div className="song-pt2 flex-column">
                                                            <h6><TruncateMarkup line={1} ellipsis="..">{track?.name}</TruncateMarkup></h6>
                                                            <p><TruncateMarkup line={1} ellipsis="..">{track?.artists[0].name} - {track?.name}</TruncateMarkup></p>
                                                        </div>
                                                        <p className="song-pt3"><TruncateMarkup line={1} ellipsis="..">{track?.album?.name}</TruncateMarkup></p>
                                                        <a className="song-pt4" href={track?.external_urls?.spotify} target="_blank"><SiSpotify/></a>
                                                        <p className="song-pt5">{convertToTime(track?.duration_ms)}</p>
                                                </div>
                                                )
                                            })
                                        }
                                    
                                            

                                </div>
                            </div>
                        {/* Artists */}
                        {
                                    artists.items?
                                <div>
                                                <div className="flex-row result-header-row">
                                                    <h4 className="site-titles">Artists</h4>
                                                    <h5 onClick={()=> this.toggleState("showFullArtists")}>{showFullArtists ? "see less" :"see all"}</h5>
                                                </div>
                                                <div className="library_list_container">
                                                    {
                                                        showFullArtists ?
                                                            artists.items?.map((artist, index)=>{
                                                                return(<div key={index + artist.id} onClick={()=> this.handleNewArtist(artist.id)}>
                                                                        <ArtistItem artist={artist} />

                                                                        </div>
                                                                    )
                                                            })
                                                        :
                                                        artists.items?.slice(0,8).map((artist, index)=>{
                                                            return(<div key={index + artist.id} onClick={()=> this.handleNewArtist(artist.id)}>
                                                                    <div  className="library_item flex-column">
                                                                            <img className="library_item_img rounded-circle" src={artist?.images[2]?.url} alt={artist?.name} />
                                                                            <h5><TruncateMarkup>{artist?.name}</TruncateMarkup></h5>
                                                                            <small><TruncateMarkup>{artist.followers ? formatNums(artist.followers?.total) +  "  Followers" : null }</TruncateMarkup></small>
                                                                            <div className="play_btn flex-column">
                                                                                    <FaPlay />
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                        })
                                                    }
                                                </div>

                                </div>

                        
                            : null
                        }
                        
                        {/* Playlists */}
                        <div className="flex-row result-header-row">
                            <h4 className="site-titles">Playlists</h4>
                            <h5 onClick={()=> this.toggleState("showFullPlaylists")}>{showFullPlaylists ? "see less" :"see all"}</h5>
                        </div>
                        
                        <div className="library_list_container">
                            {   
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
                            }
                        </div>
                        {/* Albums */}
                        <div className="flex-row result-header-row">
                            <h4 className="site-titles">Albums</h4>
                            <h5 onClick={()=> this.toggleState("showFullAlbums")}>{showFullAlbums ? "see less" :"see all"}</h5>
                        </div>
                        <div className="library_list_container">
                            {
                                showFullAlbums ?
                                    albums.items?.map((album, index)=>{
                                        return(<div key={index + album.id} onClick={()=> this.handleNewAlbum(album.id)}>
                                                    <Tiles  owner={album?.artists[0]?.name} name={album?.name} imageUrl={album?.images[2]?.url ? album?.images[2]?.url : context.defaultImg}  />
                                                </div>
                                            )
                                    })
                                :
                                    albums.items?.slice(0,8).map((album, index)=>{
                                        return(<div key={index + album.id} onClick={()=> this.handleNewAlbum(album.id)}>
                                                    <Tiles  owner={album?.artists[0]?.name} name={album?.name} imageUrl={album?.images[2]?.url ? album?.images[0]?.url : context.defaultImg}  />
                                                </div>
                                            )
                                    })
                            }
                        </div>
                    </div>
                    
                }
                </section>
            </Fragment>
        )
    }
}
export default withRouter(SearchResults);