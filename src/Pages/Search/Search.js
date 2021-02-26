import React,{PureComponent} from "react";
import Auxiliary from "../../Components/HOC/Auxiliary";
import Header from "../../Components/Player/Header/Header";
import SpotifyWebApi from "spotify-web-api-js";
import {AppContext} from "../../Context.js";
import "./Search.css";
import Categories from "../../Components/Categories/Categories";
import Loading from "../../Components/Loading/Loading";

const spotify = new SpotifyWebApi();
class Search extends PureComponent{
    state={
        isItLoading: true
    }
    static contextType = AppContext;

    componentDidMount(){
        var context = this.context;
         spotify.getCategories().then(categories=>{
            spotify.getAvailableGenreSeeds().then(genres =>{
                context.receiveSearchCompData({genres: genres, categories: categories});
                this.setState({
                    ...this.state,
                    isItLoading: false
                })
            });
        })
        
    }
    render(){
        const {searchCompData, getGenericSearchCategories } = this.context;
        const context  = this.context;
        const prevPage = searchCompData.categories?.categories?.prev;
        const nextPage = searchCompData.categories?.categories?.next;
        return(
            <Auxiliary>
                {
                    this.state.isItLoading?
                    <Loading />
                    :
                    <section className="main_search_section main_library_container desktop_comp">
                            <Header context={context} />
                            <h4 className="site-titles">Browse all</h4>
                            <div className="categories_list">
                            {
                                searchCompData.categories?.categories?.items.map( (category, i)=>{
                                    return(<Categories getCategory={context.getCategory} key={i+ category.id} id={category.id} icon={category.icons[0].url} name={category.name}/>)
                                })
                            }
                            {/* <div>
                                <button onClick={()=> getGenericSearchCategories(prevPage)}>Previous</button>
                                <button onClick={()=> getGenericSearchCategories(nextPage)}>Next</button>
                            </div> */}
                            </div>
                    
                     </section>
                }
                
            </Auxiliary>
        )
    }
}

export default Search;