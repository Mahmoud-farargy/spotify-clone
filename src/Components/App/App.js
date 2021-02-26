import React,{useEffect, useState, useContext} from "react";
import Auxiliary from "../HOC/Auxiliary";
import Login from "../../Pages/Home/Login";
import { getTokenFromUrl } from "../../Config/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import {AppContext} from "../../Context";
import Home from "../../Pages/Home/MainInterface/MainInterface";

let spotify = new SpotifyWebApi();


const App  =(props)=>{
    const context = useContext(AppContext);
    const {receiveDataFromServer, } = context;
    const [token, setToken]  = useState(null);
    // Runs code based on a given condition
    useEffect(()=>{
        const hash = getTokenFromUrl();
        window.location.hash = "";
        // const _token = "BQCbJoorC_mwBzur1tU6gEOHtXtg7ZeFlO4jLz5TWDUWfHNrhDfDkT8azYGH7_ENkReejmwha_webKaHAuVGbX1YkdlSFucmXjInqrthQD6Aulamn3UqdUa-gjvU1m7pqu3WwAt3yOKTREnQ-6xw9MwNarRv9P9k3J3HgwdqCX4ahHKo";
        const _token = hash.access_token;
        if(_token){
            setToken(_token);
            spotify.setAccessToken(_token);
           
            spotify.getMe().then(user=>{
                spotify.getUserPlaylists().then(playlists =>{
                            receiveDataFromServer({token:_token, user, playlists});
                    })
                    console.log(user);
            })
            

            
            // spotify.createPlaylist("effiaomrk8byarqlnbybq7kob").then(item=>{
            //         console.log(item);
            // });

            // spotify.getShowEpisodes((err,res)=>{
            //     console.log(res, err);
            // })
            
            // // analysis for a track
            // spotify.getAudioAnalysisForTrack("7JAo7wy8BzmP9smtTJ3fuU").then(item=>{
            //     console.log(item)
            // })
            
           
            // spotify.getMySavedAlbums("effiaomrk8byarqlnbybq7kob").then(item=>{
            //     console.log("my saved albums",item);
            // })
            // spotify.getMyTopArtists().then(item=>{
            //     console.log("my top artists",item);
            // })
            
            // spotify.getRecommendations("track",function(err,res){
            //     console.log(res);
            // });
            // spotify.getMySavedTracks({limit:"50"},function(err,res){
            //     console.log(res);
            // })

                            
            // spotify.getFollowedArtists().then(res =>{
            //     console.log(res);
            // });
             
           
            // spotify.play( {"context_uri": "spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"},(err,res)=>{
            //     console.log(res);
            // });

            // spotify.getMySavedTracks().then(item=>{
            //     console.log("my top tracks",item);
            // })

            // spotify.getMyTopTracks(null, function(err,item){
            //     console.log(err,item);
            // })
           

                   
            // ---------Best ones----------------- 
            
           
            //gets shows
            // spotify.getShows(["5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ"], function(err,res){
            //     console.log(res);
            // })
            // current playing track
            // spotify.getMyCurrentPlayingTrack().then(item=>{
            //     console.log(item);
            // })
            
            
            // spotify.getGeneric("https://api.spotify.com/v1/browse/categories?offset=20&limit=20").then(res=>{
            //     console.log(res);
            // })
            

            
                        
            
            // spotify.getMyTopArtists().then(res=>{
            //     console.log("getMyTopArtists",res);
            // })

            // spotify.getMyDevices( (err,res) =>{
            //     console.log(res);
            // });

            // spotify.addTracksToPlaylist("1qKULhusftsKzBZqsam2qq").then((res)=>{
            //     console.log(res);
            // }); 

            // all genres
            // spotify.getAvailableGenreSeeds().then(res =>{
            //                     console.log(res);
            //  });
            // -------------Used---------------
            // gets current state and song playing real time
            //         spotify.getMyCurrentPlaybackState().then( res =>{
            //             console.log(res);
            // })
            // put any artist's uri here
            // spotify.getArtistRelatedArtists("43ZHCT0cAZBISjO8DG9PnE", (err,res)=>{
            //     console.log(res)
            // }) 
            // gets artists top tracks
            // spotify.getArtistTopTracks("43ZHCT0cAZBISjO8DG9PnE","SE", (err,res)=>{
            //     console.log(res)
            // })
            // artist top trakcs
            // spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(item=>{
            //     console.log(item)
            // })
            // spotify.getNewReleases().then(res=>{
            //     console.log("new releases",res);
            // })
            // featured playlists
            // spotify.getFeaturedPlaylists().then(item=>{
            //     console.log(item);
            // })
            // spotify.getAlbum("1qKULhusftsKzBZqsam2qq").then(res=>{
            //     console.log("131", res);
            // })
            // spotify.getPlaylist("2yCJKJI6j5QA1qYpFZicYs").then(item=>{
            //     console.log(item);
            // })

            // // gets categories
            // spotify.getCategories().then(item=>{
            //     console.log(item);
            // })
            // gets category
            // spotify.getCategory().then(item=>{
            //     console.log(item);
            // })

            // spotify.searchTracks("believe").then(res=>{
            //     console.log("search tracks", res);
            // })

            // spotify.search("love",["track","artist","album"], (err,res)=>{
            //     console.log(res)
            // })
            // spotify.getTrack("51wkApQ7le2JWcFGLz84mr",(err,res)=>{
            //     console.log(res);
            // })
            // (used)
            // spotify.getMyTopTracks(null, function(err,res){
            //  console.log(err,res);
            // })
            // recently played tracks (used)
                // spotify.getMyRecentlyPlayedTracks().then(res=>{
                //         console.log(res)
                // })
        };
    },[]);

    return(
        <Auxiliary>
            {
                token ?
                <Home />
                :
                <Login />
            }
        </Auxiliary>
    )
}

export default App;