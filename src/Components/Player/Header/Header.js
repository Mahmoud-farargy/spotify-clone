import React ,{PureComponent, Fragment} from "react";
import "../../../Pages/Library/PlaylistsFolder/Playlist.css";
import {ImSearch} from "react-icons/im";
import TruncateMarkup from "react-truncate";
import {Avatar} from "@material-ui/core";
import {withRouter, Link} from "react-router-dom";
// import $ from "jquery";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";


class Header extends PureComponent{
    // componentDidMount(){
    //     $(document).ready(()=>{
    //         $(window).on("scroll",function(){
    //             if($(window).scrollTop()){
    //                 $(".header_inner").addClass("black-bcg");
    //             }else{
    //                 $(".header_inner").removeClass("black-bcg");
    //             }
                
    //         })
    //     });
    // }   
     handleSearchForm=(e)=>{
            e.preventDefault(); 
            const {searchWord, newSearch} = this.props.context;
            if(searchWord && searchWord !== ""){
               newSearch(searchWord);
               this.props.history.replace("/search/search-results"); 
            }
            
    }
    handleSearch=(e)=>{
        const newSearch = this.props.context.newSearch;
        const value = e.target.value.toLowerCase();
            newSearch(value);        
            this.props.history.replace("/search/search-results");
    }

   
    render(){
        const {user, searchWord, newSearch, searchResults}= this.props.context;
        
        return(
            <Fragment>
                <div className="body_upper_row ">
                    
                    
                    <div className="header_inner flex-row">
                     <div>
                       <button className="redirect-btn" onClick={()=> this.props.history.goBack()}><IoIosArrowBack/></button>
                       <button className="redirect-btn" onClick={()=> this.props.history.goForward()}><IoIosArrowForward/></button> 
                     </div>
                        <form onSubmit={(e)=> this.handleSearchForm(e)} className="search_form">
                                    <ImSearch  className="search_icon"/>
                                    <input autoFocus value={searchWord} onChange={(e)=> this.handleSearch(e)} className="search_input" type="text" placeholder="Search for Artists, Songs or Podcasts" />
                                {
                                    searchWord !== "" ?
                                        <span onClick={()=> newSearch("")} className="search_clear">&times;</span>
                                        : null
                                } 
                        </form> 
                        <Link to="/profile" className="flex-row user_info">
                            { user && user.images ? <Avatar src={user.images[0]?.url} alt="avatar" className="user_avatar"/> : null }
                            <strong className="user_name"><TruncateMarkup line={1} ellipsis="...">{user?.display_name}</TruncateMarkup></strong>
                        </Link>

                    </div>
                        
                </div>
            </Fragment>
        )
    }
    
}

export default withRouter(Header);