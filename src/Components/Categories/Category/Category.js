import React,{Fragment, useContext} from "react";
import {AppContext} from "../../../Context";
import "./Category.css";
import CategoryItem from "../../../Pages/Library/LibraryItem/LibraryItem";
import {withRouter} from "react-router-dom";
import Header2 from "../../../Components/Player/Header/Header2";

const Category =(props)=>{
    const context = useContext(AppContext);
    const {newCategory, defaultImg} = context;
    const switchToPlaylist=(id)=>{
        context.getPlaylist(id, props.history);
    }
    return(
        <Fragment>
            <section id="main_category_container" className=" body">
               
            <div className="face-front">
                <Header2 context={context} />
                 <div className="user-info-section">                        
                    <div className="playlist_interface flex-row">
                        <div className="playlist_info">
                            <h2>{newCategory[1] ? newCategory[1] : "Discover weekly"}</h2>
                        </div>
                    </div>
                </div>
            </div>
                {/* categories section */}
                
                <div className="songs_section">
                    <div className="backlayer"></div>
                        <div className="songs_upper_deck_controls">
                        <div className="flex-row playlist-deck">
                            <h4 className="site-titles">Popular playlists</h4>
                            <h5 onClick={()=> props.history.push("/search/fullcategory")}>See all</h5>
                        </div>
                        <div className="library_list_container">
                            {
                                newCategory[0]?.playlists?.items.slice(0,5).map((category,i)=>{
                                    return(<div key={i+ category?.id} onClick={()=> switchToPlaylist(category?.id)}  >
                                            <CategoryItem owner={`${category?.description} By ${category?.owner?.display_name}`} name={category?.name} imageUrl={category?.images[0]?.url ? category?.images[0]?.url : defaultImg}/>
                                        </div>)
                                })
                            }
                            
                        </div>
                    </div>
                    
                </div>

            </section>
        </Fragment>
    )
}
export default withRouter(Category);