import Spotify from "./spotify.js";

const config = {
    client_id: 'YOUR_CLIENT_ID',
    callback_address: window.location.href
}

const spotify = new Spotify(config);

spotify.login('.btn');

spotify.me().then(resp => {
    //
});


spotify.search({
    query: 'Tarkan',
    type: 'track,artist',
}).then(resp => {
    // console.log(resp);
});

spotify.album({
    id: '4fJzakARJP2UfOjSj5Q9s1',
    market: 'TR'
}).then(resp => {
    //console.log(resp)
});

spotify.albums({
    ids: '4fJzakARJP2UfOjSj5Q9s1,06EBiLh3V0q2dOUdXnic7e',
    market: 'TR'
}).then(resp => {
    //console.log(resp);
});

spotify.tracks({
    id: '4fJzakARJP2UfOjSj5Q9s1',
    market: 'TR',
    limit: 10,
    offset: 1
}).then(resp => {
    //console.log(resp);
})

spotify
    .artist('2yMN0IP20GOaN6q0p0zL5k')
    .then(resp => {
        console.log(resp);
    })
