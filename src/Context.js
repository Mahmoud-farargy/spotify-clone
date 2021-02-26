import React, {PureComponent, Fragment} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import defaultImg from "./Assets/default-img.jpg";

const AppContext  = React.createContext();
let spotify = new SpotifyWebApi();
class AppProvider extends PureComponent{
    constructor(props){
        super(props);
        this.state={ //Data
            user: {},
            token: null,
            spotify: spotify,
            playlists: {},
            currentPlaylist: {},
            songPlaying: {},
            isSongPlaying: false,
            isBuffering: false,
            loadedHomepageData: {featured: {}, categories: {}, newReleases: {}, userPlaylists: {}},
            libraryData: {playlists: {}, topTracks: {} , recentlyPlayed:{}, albums:{}, artists: {}},
            updatedLibraryData: {playlists: [], topTracks: [] , recentlyPlayed:[], artists: []},
            newArtistData: {tracks: {}, relatedArtists:{}, albums: {}},
            currPlaybackState: {playbackData:{}},
            topTracks: {},
            playerCurrInfo: {progressPercent: 0, currTime: "0:00"},
            audioVolume:100,
            singleSong: {},
            songNumber:0,
            songDate: "-",
            searchCompData: {genres:{}, categories:{}},
            newCategory: [],
            newAlbum: {},
            newArtist: {},
            searchWord: "",
            searchResults: {tracks: {},artists: {}, albums: {}, playlists:{}},
            defaultImg: defaultImg,
            isItLoading: true
        }
        this.mainSong = React.createRef();
    }
    componentDidMount(){
        this.mainSong.current.addEventListener("timeupdate", e =>{
            const {currentTime, duration} = e.srcElement;
            this.setState({
                ...this.state,
                playerCurrInfo: {progressPercent: (currentTime / duration) * 100 , currTime: this.sToTime(currentTime)},
                isBuffering: this.state.playerCurrInfo.progressPercent >= 1 ? false : true

            })
            
        }); 
    }
    padZero(v){
        return (v <10) ? "0"+ v : v
    }
    sToTime(t){
        return "0:" + this.padZero(parseInt((t) % 60));
        // this.padZero(parseInt((t / (60 * 60)) % 24 )) +":" +
        //         this.padZero(parseInt((t /(60 )) % 60)) +":"+
                
    }
    componentWillUnmount(){
        this.mainSong.current.removeEventListener("timeupdate", function(){});
    }
    receiveDataFromServer({token, user, playlists }){
        
        this.setState({
            ...this.state,
            user: user,
            token: token,
            playlists: playlists

        })
    }
    // changeSongNumber(index){
    //     console.log(index)
    //     this.setState({
    //         songNumber: index
    //     });
    // }
    loadNewPlaylist(payload){
        const {id, type} = payload;
        switch(type){
            case "playlists":
                this.setState({
                    ...this.state,
                    isItLoading: true
                })

                spotify.getPlaylist(id).then(playlist =>{
                    this.setState({
                    ...this.state,
                        currentPlaylist: playlist,
                        isItLoading: false
                    })
                })
            break;

            case "topTracks":
                spotify.getTrack(id).then(song =>{
                    this.setState({
                    ...this.state,
                        singleSong: song
                    })
                })
            break;

            case "recentlyPlayed":
                spotify.getTrack(id).then(song =>{
                    this.setState({
                    ...this.state,
                        singleSong: song
                    })
                })
            break;
            default:
                    spotify.getPlaylist(id).then(playlist =>{
                        this.setState({
                        ...this.state,
                            currentPlaylist: playlist
                        })
                    })
            break;

        }
        
    }
    
    playingSong(previewUrl, elType , id){
        this.setState({
            ...this.state,
            isBuffering: true
        })
        
        const playSong=()=>{
            if(previewUrl && previewUrl !== "" && previewUrl !== null && previewUrl !== undefined){
                var song = this.mainSong.current;
                song.src = previewUrl ? previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3";
                song.play();
            }
            
                spotify.getTrack(id, (err, res)=>{
                if(res && !err){
                    let title =  res.name;
                    let artist = res.album?.artists[0].name;
                    let image = res.album.images[0]?.url;
                    let duration = res.duration_ms;
                    let dateAdded = this.state.songDate ? this.state.songDate :"" ;
                    let albumName = res.album.name;
                    let id = res.id;
                    var currentSongIndex = this.state.songNumber;

                    this.setState({
                        ...this.state,
                            songPlaying: {title,artist, duration, previewUrl,image, dateAdded, albumName, currentSongIndex, id},
                            isSongPlaying: true,
                            isBuffering: false

                    });  
                }
                
            })

            if(this.state.currentPlaylist.tracks){
                 //gets song index
                this.state.currentPlaylist.tracks.items.find( (item, i )=> {
                    this.setState({
                        ...this.state,
                        songNumber: i
                    })
                    return item.track.id === id
                });
                
            }
            
        }
        //checks the element type
        if(elType === "button"){
            if(!this.state.isSongPlaying){
                // spotify.play();
                playSong();
                
            }else {
                if(this.state.songPlaying.previewUrl && id){
                    // spotify.pause();
                    var song = this.mainSong.current;
                    song.src = this.state.songPlaying.previewUrl ? this.state.songPlaying.previewUrl : "https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3";
                    song.pause();
                }
            }
            this.setState({ //toggles the song state
                    ...this.state,
                    isSongPlaying: !this.state.isSongPlaying
            })    
        }else{
            // spotify.play();
            playSong();
        }
            
    }


    songMovement(direction){
        // var lastIndex = this.state.currentPlaylist?.tracks?.items.length-1;
        // let currentIndex = this.state.songNumber;
        // console.log(this.state.songNumber, lastIndex);
        // if(direction === "prev"){
        //     currentIndex >=1 && currentIndex <= lastIndex ?
        //         this.playingSong(this.state.currentPlaylist?.tracks?.items[currentIndex-1]?.track?.preview_url, "listItem", this.state.currentPlaylist?.tracks?.items[currentIndex-1]?.track?.id)
        //     :
        //         this.playingSong(this.state.currentPlaylist?.tracks?.items[lastIndex]?.track?.preview_url,"listItem", this.state.currentPlaylist?.tracks?.items[lastIndex]?.track?.id)
            
                        
        // }else if(direction === "next"){
        //     currentIndex < lastIndex ?
        //         this.playingSong(this.state.currentPlaylist?.tracks?.items[currentIndex+1]?.track?.preview_url, "listItem",this.state.currentPlaylist?.tracks?.items[currentIndex+1]?.track?.id)
        //     :
        //         this.playingSong(this.state.currentPlaylist?.tracks?.items[0]?.track?.preview_url, "listItem", this.state.currentPlaylist?.tracks?.items[0]?.track?.id)
            
        // }        
    }
    receiveSearchCompData(data){
        // const makeListFromGenres = data.genres;
        // spotify.search()
        this.setState({
            ...this.state,
            searchCompData: data
        })

    }
    getCategory(payload){
        this.setState({
            ...this.state,
            isItLoading: true
        })
        const {id, name, history}= payload;
        if(id){
            spotify.search(id,["playlist"]).then(category=>{
                    if(category){
                        this.setState({
                            ...this.state,
                            newCategory: [category, name],
                            isItLoading: false
                        }) 
                        history.push("/search/category");
                    }                
            });    
        }
           
    }
    getPlaylist(id, history){
        this.setState({
            ...this.state,
            isItLoading: true
        })
        if(id && id !== null){
           spotify.getPlaylist(id).then(playlist=>{
            if(playlist){
                    this.setState({
                        ...this.state,
                        currentPlaylist: playlist,
                        isItLoading: false
                    })
                    history.push("/library/playlist");
                }
                
            }) 
        }
         
    }
    getArtist(id, history){
        this.setState({
            ...this.state,
            isItLoading: true
        })
        if(id){
            spotify.getArtist(id).then(artist =>{
                if(artist){
                    this.setState({
                        ...this.state,
                        newArtist: artist,
                        isItLoading: false
                    })
                    history.push("/search/artist");
                }
               
            })
        }
    }
    getAlbum(id, history){
        this.setState({
            ...this.state,
            isItLoading: true
        })
        if(id){
           spotify.getAlbum(id).then( album=>{
            if(album){
                this.setState({
                        ...this.state,
                        newAlbum: album,
                        isItLoading: false
                }) 
                    history.push("/search/album"); 
                }
            
            })
            
        }
    }

    receiveLibraryData(data){
        const adjustAndReassignData=(type = "playlists")=>{
            let result;
            switch(type){
                case "playlists":
                       result =  data[type].items.map(item=>{
                            return {
                                name: item.name,
                                images: item.images,
                                id: item.id ,
                                owner: item.owner.display_name,
                                type: "playlists",
                                route: "library/playlist"
                            };
                         })
                        break;
                case "topTracks":
                   result = data[type].items.map(item=>{
                      return {
                            name: item.name,
                            images : item.album.images,
                            releaseDate : item.album.release_date,
                            id : item.id,
                            previewUrl : item.preview_url,
                            externalUrls : item.external_urls,
                            explicit : item.explicit,
                            duration : item.duration_ms,
                            artistNames : item.artists?.map(el => el.name),
                            artistUrls : item.artists?.map(el => el.href),
                            albumName : item.album.name,
                            type: "topTracks",
                            route: "library/single-track"
                        };
                    })
                    break;
                case "recentlyPlayed":
                    result = data[type].items.map(item =>{
                        return{
                            playedAt: item.played_at,
                            name: item.track.name,
                            previewUrl : item.track.url,
                            id: item.track.id,
                            externalUrls : item.track.external_urls,
                            duration: item.track.duration_ms,
                            images: item.track.album.images,
                            releaseDate: item.track.album.release_date,
                            explicit: item.track.explicit,
                            artistNames: item.track.artists?.map(el => el.name),
                            artistUrls : item.track.artists?.map(el => el.href),
                            albumName: item.track.album.name,
                            type: "recentlyPlayed",
                            route: "library/single-track"
                        }
                    })
                    break;
                default :
               result = data[type].items.map(item=>{
                   return {name: item.name, images: item.images, id: item.id ,owner: item.owner.display_name};
                })
                    break;
            }
            return result ;
        }
        this.setState({
            ...this.state,
            updatedLibraryData: {playlists: adjustAndReassignData("playlists"),  topTracks:adjustAndReassignData("topTracks") , recentlyPlayed: adjustAndReassignData("recentlyPlayed"), artists: ""}
        })
        
    }

    songEnded(){
        this.songMovement("next");
        this.setState({
            ...this.state,
            isSongPlaying: false
        })
    }
    setProgress(e){
        // const width = this.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = this.mainSong.current.duration;
        this.mainSong.current.currentTime = (clickX / 350) * duration;
    }
    setVolume(e,volumeDegree){
        this.mainSong.current.volume = volumeDegree/ 100;
    }

    newSearch(word){
        let currWord  = this.state.searchResults;
        this.setState({
            ...this.state,
            searchWord: word,
            isItLoading: word !== "" ?  true : false
        });
        if(word && word !== "" && word !== currWord){
             spotify.search(word,["track","artist","album","playlist"], (err, results)=>{
                 
                 let {tracks, artists, albums, playlists} = results;
                //  console.log(tracks, artists, albums, playlists);
            if(results){
                    this.setState({
                        ...this.state,
                        searchResults: {tracks: tracks, artists:artists , albums: albums, playlists:playlists},
                        isItLoading: false
                    
                    })
            }else if(err){
                this.setState({
                    ...this.state,
                    isItLoading: false
                })
            }
            
            });
        }
       
    }
    loadHomepage(data){
        this.setState({
            ...this.state,
            loadedHomepageData: data
        })
    }
    loadArtistContent(payload){
        let {tracks, relatedArtists, albums} = payload;
        

        this.setState({
            ...this.state,
             newArtistData: {tracks: tracks, relatedArtists: relatedArtists, albums: albums}
        })
    }
    formatNums(regularNum){
        return (regularNum).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    loadCurrPlaybackState(payload){
        const {playbackData} = payload;

        this.setState({
            currPlaybackState: {playbackData: playbackData}
        })
    }
    // getGenericSearchCategories(url){
    //     spotify.getGeneric(url).then(newData  =>{
    //         this.setState({
    //             ...this.state,
    //             searchCompData : {genres:{}, categories:{newData}}
    //         })
    //     })
    // }
    convertToTime(t){
         //converts milliseconds to minutes and seconds
         var minutes = Math.floor(t / 60000);
         var seconds = ((t % 60000) / 1000).toFixed(0);
         return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    render(){
        return(
            <Fragment>
            <div>
                <audio onEnded={()=> this.songEnded()} src="https://p.scdn.co/mp3-preview/245803979ae62b305dc697395bc6ba77e293ff4e?cid=b06599482a6c426b8b1d37ba32a27ff3" ref={this.mainSong} id="Song" ></audio>

                <AppContext.Provider value={{
                        ...this.state,      //state
                        user: this.state.user,
                        token: this.state.token,
                        playlists: this.state.playlists,
                        audioVolume: this.state.audioVolume,
                        singleSong: this.state.singleSong,
                        newCategory: this.state.newCategory,
                        searchWord: this.state.searchWord,
                        searchResults: this.state.searchResults,
                        defaultImg: this.state.defaultImg,
                        libraryData: this.state.libraryData,
                        loadedHomepageData: this.state.loadedHomepageData,
                        newArtistData: this.state.newArtistData,
                        isItLoading: this.state.isItLoading,
                        playerCurrInfo: this.state.playerCurrInfo,
                        isBuffering: this.state.isBuffering,
                        spotify: this.state.spotify,
                        songNumber: this.state.songNumber, //functions
                        // changeSongNumber: this.changeSongNumber.bind(this),
                        receiveDataFromServer: this.receiveDataFromServer.bind(this),
                        loadNewPlaylist: this.loadNewPlaylist.bind(this),
                        playingSong: this.playingSong.bind(this),
                        songMovement: this.songMovement.bind(this),
                        receiveLibraryData: this.receiveLibraryData.bind(this),
                        setProgress: this.setProgress.bind(this),
                        setVolume: this.setVolume.bind(this),
                        receiveSearchCompData: this.receiveSearchCompData.bind(this),
                        getCategory:this.getCategory.bind(this),
                        getPlaylist: this.getPlaylist.bind(this),
                        newSearch: this.newSearch.bind(this),
                        getAlbum: this.getAlbum.bind(this),
                        loadHomepage: this.loadHomepage.bind(this),
                        formatNums: this.formatNums.bind(this),
                        getArtist: this.getArtist.bind(this),
                        loadArtistContent: this.loadArtistContent.bind(this),
                        loadCurrPlaybackState: this.loadCurrPlaybackState.bind(this),
                        convertToTime: this.convertToTime.bind(this)
                        // getGenericSearchCategories: this.getGenericSearchCategories.bind(this)
                        
                    }}
                    >
                        {this.props.children}
                </AppContext.Provider>
            </div>
            </Fragment>
        )
    }
}
    const AppConsumer = AppContext.Consumer;

export {
    AppProvider,
    AppContext,
    AppConsumer
}