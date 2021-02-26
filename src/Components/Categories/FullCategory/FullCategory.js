import React,{Fragment, useContext} from "react";
import {AppContext} from "../../../Context";
import "./FullCategory.css";
import CategoryItem from "../../../Pages/Library/LibraryItem/LibraryItem";
import {withRouter} from "react-router-dom";
import Header2 from "../../../Components/Player/Header/Header2";

const Category =(props)=>{
    const context = useContext(AppContext);
    const {newCategory} = context;
    const switchToPlaylist=(id)=>{
            context.getPlaylist(id, props.history);
    }
    return(
        <Fragment>
            <section id="main_full_category_container" className=" body">
                
            <div className="face-front">
                <Header2 context={context}/>
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
                            <h4 className="site-titles">All playlists</h4>
                        </div>
                        <div className="library_list_container">
                            {
                                newCategory[0]?.playlists?.items.map((category,i)=>{
                                    return(<div key={i+ category?.id} onClick={()=> switchToPlaylist(category?.id)}  >
                                        <CategoryItem owner={`${category?.description} By ${category?.owner?.display_name}`} name={category?.name} imageUrl={category?.images[0]?.url}/>
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