import Spotify from "./spotify.js";

const config = {
    client_id: 'YOUR_API_KEY',
    callback_address: window.location.href
}

const spotify = new Spotify(config);

spotify.login('.btn');

spotify.me().then(resp => {
    console.log("me", resp)
});


spotify.search({
    query: 'Tarkan',
    type: 'track,artist',
}).then(resp => {
    console.log(resp);
})

