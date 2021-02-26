export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https:%2F%2Fspotifyappclone.netlify.app";
// const redirectUri = "http:%2F%2Flocalhost:3000";

const clientID = "b06599482a6c426b8b1d37ba32a27ff3";

const scopes =[
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];
export const getTokenFromUrl = ()=>{ //pulls the user token from the returned url
    return window.location.hash.substring(1).split("&").reduce((accumulator, currValue)=>{
        const parts = currValue.split("=");
        accumulator[parts[0]] = decodeURIComponent(parts[1]);
        return accumulator;
    },{});
}

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`