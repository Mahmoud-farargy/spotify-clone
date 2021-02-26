import React, { PureComponent} from "react";
import Auxiliary from "../../HOC/Auxiliary";
import "./Sidebar.css";
import logo from "../../../Assets/spotify2019-830x350.jpg";
import {HiHome,HiInformationCircle} from "react-icons/hi";
import {ImSearch} from "react-icons/im";
import {MdLibraryMusic} from "react-icons/md";
import SidebarOption from "./SidebarOption/SidebarOption";
import {AppContext} from "../../../Context";
import $ from "jquery";
import {Link} from "react-router-dom";
import Loading2 from "../../Loading/Loading2";

// import {NavLink} from "react-router-dom";
   

class Sidebar extends PureComponent{
        static contextType = AppContext;
       
    componentDidMount(){
        $(document).ready(()=>{
            $(".sidebar_menu a").click(function(){
                $(".sidebar_menu a").each((i, item)=>{
                    $(item).removeClass("sidebar-active-link");
                    });
                 $(this).addClass("sidebar-active-link");
            });
               
        })
    }
        render(){
            const {playlists, loadNewPlaylist} = this.context;
        return(
            <Auxiliary>
                <section className="sidebar ">
                    <div className="sidebar_inner flex-column">
                        <Link to="/"><img className="sidebar_logo" src={logo} alt="logo" /></Link>
                        <div className="sidebar_menu flex-column">
                            <SidebarOption title="home" link="/" Icon={HiHome} />
                            <SidebarOption title="search"  link="/search"  Icon={ImSearch} />
                            <SidebarOption title="Your library" link="/library"  Icon={MdLibraryMusic} />
                            <SidebarOption title="About" link="/about" Icon={HiInformationCircle} />

                        </div>
                        <h5 className="sidebar_header">Playlists</h5>
                        {/* <span onClick={()=>} className="subMenu_list">Create playlist</span> */}
                        <hr className="sidebar_hr" />
                        <ul className="sidebar_unordered_list">
                            { playlists.items && playlists?
                                playlists.items.map((item,i)=>{
                                    return(<li onClick={()=> loadNewPlaylist({id: item.id, type: item.type})} key={item.snapshot_id+ i}><SidebarOption title={item.name} link="/library/playlist" /></li>)
                                })
                                : <Loading2 />
                            }
                        </ul>
                    </div>
                </section>
            </Auxiliary>
        )

    }
        
}
export default Sidebar;