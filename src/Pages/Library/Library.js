import React, { Fragment, Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {AppContext} from "../../Context";
import LibraryItem from "./LibraryItem/LibraryItem";
import Loading from "../../Components/Loading/Loading";
import ItemMobile from "../../Components/ItemMobile/ItemMobile";

// import {Playlists} from "../"
// import Playlistss from "./PlaylistsFolder/Playlists/Playlists";
import LibraryNav from "./LibraryNav";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

class Playlists extends Component{
    static contextType = AppContext;
   
    state={
        listSelected: "playlists",
        isItLoading: true
    }
    handleListSelection(listName){
        this.setState({
            ...this.state,
            listSelected: listName
        })
    };
    componentDidMount(){
        var context  = this.context;
        spotify.getMyTopArtists().then(artists=>{        
            spotify.getMyRecentlyPlayedTracks().then(recent =>{
                spotify.getMyTopTracks().then(topTracks =>{
                    spotify.getUserPlaylists().then(playlists =>{
                        context.receiveLibraryData({playlists: playlists, recentlyPlayed: recent, topTracks: topTracks, artists: artists});
                        this.setState({
                            ...this.state,
                            isItLoading: false
                        })
                    });
                });
            });
        })
        
    }
    render(){
        const {user,updatedLibraryData, loadNewPlaylist, defaultImg} = this.context;
        
        return(
            <Fragment>
                {
                    this.state.isItLoading ?
                    <Loading/>
                    :
                    <div id="library"  className="main_library_container desktop_comp">
                        <h2 className="mobile-only music-title site-titles">Music</h2>
                            <LibraryNav user={user} changeListSelection={(list)=> this.handleListSelection(list)} />
                            <h1>{this.state.listSelected === "topTracks" ? "Top tracks" : this.state.listSelected === "recentlyPlayed" ? "Recently played" : this.state.listSelected}</h1>
                        <div className="library_list_container">
                            
                            {   
                                updatedLibraryData[this.state.listSelected] ? updatedLibraryData[this.state.listSelected].map((item,i) =>{
                                    return(<Link to={item.route} key={i+ item.id} onClick={()=> loadNewPlaylist({id:item.id ,type:item.type, history: this.props.history, route: "/library" })} >
                                            <LibraryItem imageUrl={item.images[0]?.url ? item.images[0]?.url : defaultImg} name={item.name} owner={item.owner? `By ${item.owner}` : item.artistNames[0] } />
                                            <ItemMobile imageUrl={item.images[0]?.url ? item.images[0]?.url : defaultImg} name={item.name} owner={item.owner? `By ${item.owner}` : item.artistNames[0] } />
                                        </Link>)
                                }): <div className="w-100">
                                        <h4 style={{textAlign:"center",marginTop:"30px"}}>No content to show</h4>  
                                    </div>
                            }
                        </div>
                    
                </div>
                }
                
            </Fragment>
        )
    }
    
}
export default withRouter(Playlists);