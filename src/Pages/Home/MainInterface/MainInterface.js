import React,{Component} from "react";
import Auxiliary from "../../../Components/HOC/Auxiliary";
import Sidebar from "../../../Components/Player/Sidebar/Sidebar";
import Playlist from "../../Library/PlaylistsFolder/Playlist";
import Footer from "../../../Components/Player/Footer/Footer";
import "./MainInterface.css";
import  MainHome from "../MainHome/MainHome";
import {Route,Switch} from "react-router-dom";
import Library from "../../Library/Library";
import SingleTrack from "../../SingleTrack/SingleTrack";
import Search from "../../Search/Search";
import Category from "../../../Components/Categories/Category/Category";
import FullCategory from "../../../Components/Categories/FullCategory/FullCategory";
import SearchResults from "../../SearchResults/SearchResults";
import Album from "../../Album/Album";
import Profile from "../../UserProfile/UserProfile";
import MobileBottomNav from "../../../Components/MobileBottomNav/MobileBottomNav";
import MobilePlaybar from "../../../Components/MobilePlaybar/MobilePlaybar";
import Artist from "../../Artist/Artist";
import About from "../../About/About";


class MainInterface extends Component{

    render(){
        return(
            <Auxiliary>
              <main className="player">
                <div className="player__body flex-row">
                    <Sidebar />
                        <Switch>
                            <Route exact path="/" component={MainHome} />
                            <Route exact path="/library" component={Library} />
                            <Route exact path="/library/playlist" component={Playlist}/>
                            <Route exact path="/library/single-track" component={SingleTrack}/>
                            <Route exact path="/search" component={Search} />
                            <Route exact path="/search/category" component={Category} />
                            <Route exact path="/search/fullcategory" component={FullCategory} />
                            <Route exact path="/search/search-results" component={SearchResults} />
                            <Route exact path="/search/album" component={Album} />
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/search/artist" component={Artist} />
                            <Route exact path="/about" component={About} />

                        </Switch>
                    {/* <Playlist /> */}
                </div>

                    <Footer />
                    <MobilePlaybar/>
                    <MobileBottomNav />
            </main>
            </Auxiliary>
        )
    }
}

export default MainInterface;