import React, { Fragment, Component} from "react";
import {withRouter} from "react-router-dom";
import Header2 from "../../../Components/Player/Header/Header2";
import {AppContext} from "../../../Context";
import SpotifyWebApi from "spotify-web-api-js";
import Tiles from "../../Library/LibraryItem/LibraryItem";
import "./MainHome.css";
import Categories from "../../../Components/Categories/Categories";
import Loading from "../../../Components/Loading/Loading";

class MainHome extends Component{
    state={
        period: "evening",
        isItLoading: true
    }
    static contextType = AppContext;

    componentDidMount=()=>{
        let currentHour = new Date().getHours();
        this.setState({
            ...this.state,
            period: currentHour > 12 ? "evening" : "morning"
        })
        const context = this.context;
       const spotify = new SpotifyWebApi();
        spotify.getFeaturedPlaylists().then((feat)=>{
            spotify.getCategories().then(categories=>{
                spotify.getNewReleases().then(newReleases=>{
                    spotify.getUserPlaylists().then(userPlaylists=>{
                        context.loadHomepage({featured: feat, categories: categories, newReleases: newReleases, userPlaylists: userPlaylists});
                        this.setState({
                            ...this.state,
                            isItLoading: false
                        })
                    })
                })
            });
        });
    }
    handleNewAlbum(id){
        let {getAlbum} = this.context;
        getAlbum(id, this.props.history);
    }

    render(){
        const context = this.context;
        const {defaultImg, getPlaylist} = context;
        const {featured, categories,  newReleases, userPlaylists} = context.loadedHomepageData;
    return(
        <Fragment>
            {
                this.state.isItLoading ?
                <Loading />
                :
                    <section id="home_container" className=" main_library_container  desktop_comp">
                        <Header2 context={context} />
                        
                        <div className="home_container_inner">
                            {/* ----------------------- */}

                            {/* albums */}
                            <h4 className="site-titles">New Releases</h4>
                            <div className="home_albums_container flex-row"> 
                            {
                                newReleases.albums?.items?.map((album, index)=>{
                                        return(<div key={index + album.id} onClick={()=> this.handleNewAlbum(album.id)}>
                                            <Tiles  owner={album?.artists[0]?.name} name={album?.name} imageUrl={album?.images[0]?.url ? album?.images[0]?.url : context.defaultImg}  />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                                
                                    {/* categories */}

                                <h4 className="site-titles">Popular Categories</h4>
                                <div className="flex-row home_categories">
                                        {
                                            categories.categories?.items?.map( (category, i)=>{
                                                return(<div key={i+ category.id}><Categories getCategory={context.getCategory} id={category.id} icon={category.icons[0].url} name={category.name} />
                                                </div>
                                                )
                                            })
                                        }
                                </div>
                        </div>

                        {/* good morning / good evening */}
                        <h4 className="site-titles">Good {this.state.period}</h4>
                            <div className="flex-row home_albums_container ">
                            
                            {   
                                userPlaylists.items?.map((item,i) =>{
                                    return(<div key={i+ item.id} onClick={()=> getPlaylist(item.id, this.props.history )}>
                                            <Tiles imageUrl={item.images ? item.images[0]?.url : defaultImg} name={item.name} owner={`By ${item.owner?.display_name}` } />
                                        </div>
                                        )
                                }) 
                            }
                        </div>

                        {/* featured */}
                        
                            <h4 className="site-titles">Editor's picks</h4>
                            <div className="flex-row home_albums_container ">
                                    {   

                                        featured.playlists?.items?.map((item,i) =>{
                                            return(
                                                <div key={item.id} onClick={()=> getPlaylist(item.id, this.props.history )}>
                                                    
                                                    <Tiles imageUrl={item.images[0]?.url ? item.images[0]?.url : defaultImg} name={item.name} owner={`By ${item.owner?.display_name}` } />
                                                </div>
                                                )
                                        })
                                    }
                        </div>
                    </section>
            }
            
            </Fragment>
        )
    }
}
export default withRouter(MainHome);