import Spotify from "./spotify.js";

const config = {
    client_id: 'bc06e423b40c4e75b806c762bdf0203a',
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

